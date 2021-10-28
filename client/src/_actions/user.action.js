import { LOGIN_USER, KAKAO_USER, GOOGLE_USER } from './types'
import instance from '../api'

export async function loginUser(dataToSubmit) {
  const request = await instance
    .post('/signin', dataToSubmit, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => {
      const {
        id,
        email,
        nickname,
        userPhone,
        homeground,
        createdAt,
        favoriteSports
      } = response.data.userData
      return {
        accessToken: response.data.accessToken,
        id,
        email,
        nickname,
        userPhone,
        homeground,
        createdAt,
        favoriteSports
      }
    })
    .catch((err) => {
      console.log(err)
    })

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function kakaoUser(authorizationCode) {
  const request = await instance
    .get(`/signin/kakao?code=${authorizationCode}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)

  return {
    type: KAKAO_USER,
    payload: request
  }
}

export async function googleUser(authorizationCode) {
  const request = await instance
    .get(`/signin/google?code=${authorizationCode}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)

  return {
    type: GOOGLE_USER,
    payload: request
  }
}