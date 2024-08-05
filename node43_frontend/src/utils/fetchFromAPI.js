import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_IMG = "http://localhost:8080/public/imgs/";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getVideoAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options);

  return data.content;
};

export const getTypeAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-type`, options);

  return data.content;
};

export const getVideoTypeAPI = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-type/${typeId}`,
    options
  );

  return data.content;
};

export const getVideoPageAPI = async (page) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-page/${page}`,
    options
  );

  return data.content;
};

export const getVideoDetailAPI = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-detail/${videoId}`,
    options
  );

  return data.content;
};

export const loginAPI = async (logInData) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login`,
    logInData,
    options
  );

  return data;
};

export const signUpAPI = async (signUpData) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/sign-up`,
    signUpData,
    options
  );

  return data;
};

export const loginFacebookAPI = async (logInData) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login-face`,
    logInData,
    options
  );

  return data;
};

export const forgetCheckMailAPI = async (logInData) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/forget-check-email`,
    logInData,
    options
  );

  return data;
};

export const forgetCheckCodeAPI = async (logInData) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/forget-check-code`,
    logInData,
    options
  );

  return data;
};

export const uploadCloudAPI = async (formData) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dgqq2mm1z/auto/upload`,
    formData
  );
  return data;
};
