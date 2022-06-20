import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils';

// for some pages we will be getting body like login page, signup/sign page
// for some page we wont be, so body will be null
// for rest of the key:value pair in 2nd argument we get it in ...customConfig
const customFetch = async (url, { body, ...customConfig }) => {
  // getting token stored in localStorage
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // console.log(token);

  //In header we will be sending & accepting data in form urlencoded
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  // putting token into header for server to able to authenticate request
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // assembling all the config in one variable
  // assembling headers also one which we have declared above & one in customConfig
  // passing this config to fetch
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // encode body & add it in config
  // we cant send js object to the api, type of data-transfer is json
  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    // if data.success is false, throwing error for catch to handle
    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signup = (name, email, password, confirm_password) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { email, name, password, confirm_password },
  });
};

export const editUser = (id, name, password, confirm_password) => {
  // console.log(id, name, password, confirm_password);
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id, name, password, confirm_password },
  });
};
