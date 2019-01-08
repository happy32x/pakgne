//////////////////////////////////////////////////video image 













//////////////////////////////////////////////////comment image
export function youtubeImageResizer (url, newSize) {
  return /^(https:\/\/yt3\.ggpht\.com\/[a-z0-9._-]+\/AAAAAAAAAAI\/AAAAAAAAAAA\/[a-z0-9._-]+\/s)(\d+)(-c-k-no-mo-rj-c0xffffff\/photo.jpg)$/i.test(url) ? RegExp.$1+newSize+RegExp.$3 : url
}
