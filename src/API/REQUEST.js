import DATA from './DATA'

const apiKey = DATA.KEY
const channelId = DATA.CHANNEL_ID
const results = DATA.REQUEST_NUMBER

//Récupérer une liste de videos
export function getVideoListFromApi (pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=relevance&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer les infos d'une video
export function getVideoInfoFromApi (videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=id,statistics,contentDetails&id=${videoId}&key=${apiKey}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de commentaires
export function getCommentListFromApi (videoId, order, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&videoId=${videoId}&order=${order}&part=snippet&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de sous-comentaires (commentId : UgyfGyvTA8OzJ3ilUOd4AaABAg , UgwLj19LmkKZddNcdJh4AaABAg, UgzTt0YulIuUMp5DslN4AaABAg)
export function getCommentListReplyFromApi (commentId, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/comments?key=${apiKey}&parentId=${commentId}&part=snippet&maxResults=15${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}