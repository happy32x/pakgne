import { AsyncStorage } from 'react-native'

//SET===========================================================================

export async function setAccessToken (accessToken) {
  try {
    await AsyncStorage.setItem('accessToken', accessToken)
  } catch (error) {
    console.log('storeData :: setAccessToken :: ERROR SETTING ACCESSTOKEN')
  }  
}

export async function setRefreshToken (refreshToken) {
  try {
    await AsyncStorage.setItem('refreshToken', refreshToken)
  } catch (error) {
    console.log('storeData :: setRefreshToken :: ERROR SETTING REFRESHTOKEN')
  }
}

export async function setAccessTokenTimeOut (accessTokenTimeOut) {
  try {
    await AsyncStorage.setItem('accessTokenTimeOut', accessTokenTimeOut.toString())
  } catch (error) {
    console.log('storeData :: setAccessTokenTimeOut :: ERROR SETTING ACCESSTOKENTIMEOUT')
  }
}

export async function setVideoListOrder (videoListOrder) {
  try {
    await AsyncStorage.setItem('videoListOrder', videoListOrder)
  } catch (error) {
    console.log('storeData :: setVideoListOrder :: ERROR SETTING VIDEOLISTORDER')
  }
}

export async function setVideoListRandom (videoListRandom) {
  try {
    await AsyncStorage.setItem('videoListRandom', videoListRandom)
  } catch (error) {
    console.log('storeData :: setVideoListRandom :: ERROR SETTING VIDEOLISTRANDOM')
  }
}

export async function addTextInSearchListHistory (newSearchListHistory) {
  try {          
    await AsyncStorage.setItem('searchListHistory', JSON.stringify(newSearchListHistory))    
  } catch (error) {
    console.log('storeData :: addTextInSearchListHistory :: ERROR SETTING SEARCHLISTHISTORY')
  }
}

//GET===========================================================================

export async function getAccessToken () {
  try {
    const value = await AsyncStorage.getItem('accessToken')
    if(value !== null)
      return value
    else
      console.log('storeData :: getAccessToken :: SORCERY !!!')
  } catch (error) {
    console.log('storeData :: getAccessToken :: ERROR GETTING ACCESSTOKEN')
  }  
}

export async function getRefreshToken () {
  try {
    const value = await AsyncStorage.getItem('refreshToken')
    if(value !== null) 
      return value
    else 
      console.log('storeData :: getRefreshToken :: SORCERY !!!')
  } catch (error) {
    console.log('storeData :: getRefreshToken :: ERROR GETTING REFRESHTOKEN')
  }  
}

export async function getAccessTokenTimeOut () {
  try {
    const value = await AsyncStorage.getItem('accessTokenTimeOut')
    if(value !== null) 
      return value
    else 
      console.log('storeData :: getAccessTokenTimeOut :: SORCERY !!!')
  } catch (error) {
    console.log('storeData :: getAccessTokenTimeOut :: ERROR GETTING ACCESSTOKENTIMEOUT')
  }  
}

export async function getVideoListOrder () {
  try {
    const value = await AsyncStorage.getItem('videoListOrder')
    if(value !== null) 
      return value
    else 
      return 'date'
  } catch (error) {
    console.log('storeData :: getVideoListOrder :: ERROR GETTING VIDEOLISTORDER')
  }  
}

export async function getVideoListRandom () {
  try {
    const value = await AsyncStorage.getItem('videoListRandom')
    if(value !== null) 
      return value
    else 
      return false
  } catch (error) {
    console.log('storeData :: getVideoListRandom :: ERROR GETTING VIDEOLISTRANDOM')
  }
}

export async function getSearchListHistory () {
  try {
    const myArray = await AsyncStorage.getItem('searchListHistory')
    if(myArray !== null)
      return JSON.parse(myArray)
    else {      
      return false
    }      
  } catch (error) {
    console.log('storeData :: getSearchListHistory :: ERROR GETTING SEARCHLISTHISTORY')
  }
}