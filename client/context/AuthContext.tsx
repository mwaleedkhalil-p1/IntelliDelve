import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useApi';
import { AuthUser } from '../services/apiService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const [authError, setAuthError] = useState<Error | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthError(null);
      // The actual login logic is handled by the useLogin hook
      // This is just a placeholder for the context interface
      throw new Error('Use useLogin hook directly for login functionality');
    } catch (err) {
      setAuthError(err as Error);
      throw err;
    }
  };

  const logout = (): void => {
    // The actual logout logic is handled by the useLogout hook
    // This is just a placeholder for the context interface
  };

  useEffect(() => {
    if (error) {
      setAuthError(error as Error);
    }
  }, [error]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error: authError,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <div>Please log in to access this page.</div> 
}) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Hook for checking specific roles
export const useRole = (requiredRole?: string) => {
  const { user, isAuthenticated } = useAuthContext();
  
  const hasRole = (role: string): boolean => {
    if (!isAuthenticated || !user) return false;
    return user.role === role || user.role === 'admin'; // Admin has all permissions
  };

  const hasAnyRole = (roles: string[]): boolean => {
    if (!isAuthenticated || !user) return false;
    return roles.some(role => hasRole(role));
  };

  return {
    user,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    canAccess: requiredRole ? hasRole(requiredRole) : isAuthenticated,
  };
};
