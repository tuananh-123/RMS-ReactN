import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthState = { token: string } | null;

type AuthContextType = {
  user: AuthState;
  isLoading: boolean;
  login: (tokenProps: tokenProps) => Promise<void>;
  logout: () => Promise<void>;
  lastVisitSite: any | null;
  setLastVisitSite: (path: string | null) => Promise<void>;
};

type tokenProps = {
  refreshToken: string,
  accessToken : string
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthState>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisitSite, setLastVisitSiteState] = useState<any | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync('token');
      const savedRoute = await SecureStore.getItemAsync('lastVisitSite');
      if (token) setUser({ token });
      if (savedRoute) setLastVisitSiteState(savedRoute);
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (tokenProps: tokenProps) => {
    await SecureStore.setItemAsync('refreshToken', tokenProps.refreshToken);
    await SecureStore.setItemAsync('accessToken' , tokenProps.accessToken);

    setUser({token: tokenProps.refreshToken});
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('accessToken');
    setUser(null);
  };

  const setLastVisitSite = async (path: string | null) => {
    setLastVisitSiteState(path);
    if (path) {
      await SecureStore.setItemAsync('lastVisitSite', path);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, lastVisitSite, setLastVisitSite }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
