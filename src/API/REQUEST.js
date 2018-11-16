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