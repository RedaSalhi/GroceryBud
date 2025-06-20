import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { STORAGE_KEYS } from '../utils/constants';
import { auth } from '../services/firebase';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load onboarding status from storage
  useEffect(() => {
    const loadOnboarding = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem(
          STORAGE_KEYS.ONBOARDING_COMPLETED
        );
        setOnboardingCompleted(onboardingStatus === 'true');
      } catch (error) {
        console.error('Error loading onboarding state:', error);
      }
    };

    loadOnboarding();
  }, []);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      setOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  // Profile methods
  const getUserFullName = () => {
    if (!user) return 'User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || user.email || 'User';
  };
  
  const isPremiumUser = () => {
    // Without authentication, everyone is a free user
    return false;
  };
  
  const updateProfile = async () => ({ success: true });

  const updatePreferences = async () => ({ success: true });

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Value object to be provided to consumers
  const contextValue = {
    isAuthenticated: !!user,
    isLoading,
    onboardingCompleted,
    completeOnboarding,
    user,
    login,
    register,
    getUserFullName,
    isPremiumUser,
    updateProfile,
    updatePreferences,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const getUserFullNameFromData = (data) => {
  const name = `${data?.firstName || ''} ${data?.lastName || ''}`.trim();
  return name || data?.displayName || data?.email || 'User';
};
