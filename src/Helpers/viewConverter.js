function viewConverter(number) {
  if (number > 1000) return Math.floor(number/1000) + ' k'
  else if (number > 1000000) return Math.floor(number/1000000) + ' M' 
  else return number
}

export default viewConverter