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