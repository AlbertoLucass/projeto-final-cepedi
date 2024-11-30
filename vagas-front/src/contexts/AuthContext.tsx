import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api'; // Import the API to fetch the user data

type AuthContextData = {
  user: any | null; // Update to hold the full user object
  signIn: (email: string) => void;
  signOut: (navigation: any) => void;
  loadUser: () => void; // Expose loadUser for manual invocation
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  // Function to sign in and store user data
  const signIn = async (email: string) => {
    // Fetch user data after sign in
    try {
      const response = await api.get(`/api/usuarios/${email}`);
      setUser(response.data.user);
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  };

  // Function to sign out
  const signOut = async (navigation: any) => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
    navigation.navigate('Login');
  };

  // Function to load the stored user from AsyncStorage
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Load user data when the component mounts
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
