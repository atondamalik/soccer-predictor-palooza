
import { User } from "@/types";
import { mockUsers } from "./mockData";

// Simulating authentication
const CURRENT_USER_KEY = 'soccer_betting_current_user';

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Clear current user from localStorage
export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Login function
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate network request
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

// Register function
export const register = (username: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate network request
    setTimeout(() => {
      // Check if user with email already exists
      if (mockUsers.some(u => u.email === email)) {
        reject(new Error('User with this email already exists'));
        return;
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        username,
        email,
        wallet: 0,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };

      // In a real app, this would be a server request
      // Locally, we'll just pretend it succeeded
      setCurrentUser(newUser);
      resolve(newUser);
    }, 1000);
  });
};

// Logout function
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate network request
    setTimeout(() => {
      clearCurrentUser();
      resolve();
    }, 500);
  });
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user ? user.isAdmin : false;
};
