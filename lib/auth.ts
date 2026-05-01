/**
 * Authentication utility functions
 */

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Set authentication token in cookies
 */
export const setAuthToken = (token: string) => {
  // Set token in localStorage for client-side access
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
    // Also set as a cookie for middleware
    document.cookie = `adminToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    // Clear cookie
    document.cookie = 'adminToken=; path=/; max-age=0';
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    return !!token;
  }
  return false;
};

/**
 * Get stored user data
 */
export const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Store user data
 */
export const setStoredUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminUser', JSON.stringify(user));
  }
};
