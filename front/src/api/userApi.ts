import axios, { AxiosResponse } from 'axios';
import { Base64 } from 'js-base64';
import { memberInterface, modifyProfileInterface } from '../interfaces/UserInterface';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SERVER_ERROR = 'SERVER_ERROR';

export function postLoginAsync(user: { email: string, passwd: string }): Promise<memberInterface> | Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/login',
    params: {
      email: user.email,
      passwd: user.passwd,
    },
  }).then((result) => {
    const { nickname, profile_img: profileImg, latitude, longitude, role, articlelist, wishlist, mymarketlist, socialtype } = result.headers;

    const loginUser: memberInterface = {
      email: user.email,
      nickname: Base64.decode(nickname),
      profileImg,
      latitude,
      longitude,
      role,
      logedin: true,
      socialType: socialtype,
      articles: articlelist === undefined ? [] : JSON.parse(articlelist),
      wishList: wishlist === undefined ? [] : JSON.parse(wishlist),
      myMarketList: mymarketlist === undefined ? [] : JSON.parse(mymarketlist),
    };
    return loginUser;
  }).catch((error) => {
    if (error.response.status === 400) {
      throw new Error(LOGIN_ERROR);
    } else if (error.response.status === 500) {
      throw new Error(SERVER_ERROR);
    } else {
      throw new Error(SERVER_ERROR);
    }
    return error;
  });
}

export function socialLoginAsync(social: string): Promise<boolean> {
  return axios({
    method: 'post',
    url: `/api/oauth2/authorization/${social}`,
  }).then((result) => true).catch((error) => {
    if (error.response.status !== 400) {
      throw new Error('서버 통신 에러');
    }
    return false;
  });
}

export function logoutAsync(): Promise<boolean> {
  return axios({
    method: 'post',
    url: '/api/logout',
  }).then((result) => {
    console.log(result);
    return true;
  }).catch((error) => false);
}

export function modifyProfileAsync(modifyProfile: FormData): Promise<AxiosResponse> {
  return axios({
    method: 'put',
    url: '/api/change/profile',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: modifyProfile,
  }).then((res) => {
    console.log(res);
    const { nickname, profile_img } = res.data.data;
    return { state: true, nickname: Base64.decode(nickname), profileImg: profile_img };
  }).catch((error) => {
    if (error.response.status !== 400) {
      throw new Error('서버통신에러');
    }
    return error;
  });
}

export function getUserInfoAsync(): Promise<memberInterface> {
  return axios({
    method: 'get',
    url: '/api/mypage',
  }).then((result) => {
    console.log(result.data.data, '소셜로그인');
    const { email, nickname, profile_img: profileImg, latitude, longitude, role, articlelist, wishList, mymarketlist, socialtype } = result.data.data;
    const loginUser: memberInterface = {
      email,
      nickname,
      profileImg,
      latitude,
      longitude,
      role,
      logedin: true,
      socialType: socialtype,
      articles: articlelist === undefined ? [] : JSON.parse(articlelist),
      wishList: wishList === undefined ? [] : JSON.parse(wishList),
      myMarketList: mymarketlist === undefined ? [] : JSON.parse(mymarketlist),
    };
    return loginUser;
  });
}
