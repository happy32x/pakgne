import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

function convertTimeToSeconds(time) {
  let a = time.match(/\d+H|\d+M|\d+S/g),
      result = 0;

  let d = { 'H': 3600, 'M': 60, 'S': 1 },
      num,
      type;

  for (let i = 0; i < a.length; i++) {
      num = a[i].slice(0, a[i].length - 1);
      type = a[i].slice(a[i].length - 1, a[i].length);

      result += parseInt(num) * d[type];
  }

  return result;
}

function timeConverter(time) {
  return moment.duration(convertTimeToSeconds(time), "seconds").format();
}

export default timeConverter