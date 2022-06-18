import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data);
      return { success: true };
    } else return { success: false, messaage: response.message };
  };

  const logout = () => {};

  return {
    user,
    login,
    logout,
    loading,
  };
};
