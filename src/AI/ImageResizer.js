//////////////////////////////////////////////////video image 













//////////////////////////////////////////////////comment image
export function imageResizer (url, newSize) {
  //https://yt3.ggpht.com/a-/AAuE7mATsCoxYmtiyCHr-T8O8UfWr-ZyxZd50OItFA=s88-c-k-c0x00ffffff-no-rj-mo
  //https://yt3.ggpht.com/a/AGF-l7-b9Do3b7SYttg20oP19_PqT6aevon48wtK9Q=s48-c-k-c0xffffffff-no-rj-mo
  //https://lh6.googleusercontent.com/-ajpWAjjwsbw/AAAAAAAAAAI/AAAAAAAAACc/HqLcEGVoj3Y/s96-c/photo.jpg
  return /^(https:\/\/yt3\.ggpht\.com\/[a-z0-9._-]+\/[a-z0-9._-]+=s)(\d+)([a-z0-9._-]+)$/i.test(url)  
    ? RegExp.$1+newSize+RegExp.$3
    : /^(https:\/\/lh6\.googleusercontent\.com\/[a-z0-9._-]+\/AAAAAAAAAAI\/AAAAAAAAACc\/[a-z0-9._-]+\/s)(\d+)(-c\/photo.jpg)$/i.test(url)
      ? RegExp.$1+newSize+RegExp.$3
      : url
}
