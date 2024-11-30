import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type AuthContextData = {
  user: string | null;
  signIn: (email: string) => void;
  signOut: (navigation: any) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const signIn = async (email: string) => {
    setUser(email);
    console.log('SignIn chamado com:', email);
    await AsyncStorage.setItem('@user', email);
  };

  const signOut = async (navigation: any) => {
    setUser(null);
    console.log('SignOut chamado');
    await AsyncStorage.removeItem('@user');
    navigation.navigate('Login');
  };

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    console.log('Usuário carregado do AsyncStorage:', storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  };
  
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
