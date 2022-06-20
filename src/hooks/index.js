import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  login as userLogin,
  signup as userSignup,
  editUser as editUserProfile,
} from '../api';
import jwtDecode from 'jwt-decode';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
} from '../utils';
import { useEffect } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // setLoading(true);
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      // setLoading(false);
      return { success: true };
    }
    // setLoading(false);
    else
      return {
        success: false,
        messaage: response.message,
      };
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await userSignup(name, email, password, confirmPassword);
    if (response.success) {
      return { success: true };
    } else {
      return { success: false, messaage: response.message };
    }
  };

  const editUser = async (id, name, password, confirmPassword) => {
    const response = await editUserProfile(id, name, password, confirmPassword);
    if (response.success) {
      setUser(response.data.user);
      // console.log(response.data.token);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    editUser,
  };
};
