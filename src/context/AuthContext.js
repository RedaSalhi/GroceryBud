import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // We'll only track onboarding status since we don't need authentication anymore
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    uid: 'local-user',
    email: 'local@example.com',
    displayName: 'Local User',
    firstName: 'Local',
    lastName: 'User',
    stats: {
      listsCreated: 0,
      itemsAdded: 0,
      moneySaved: 0,
    },
    preferences: {
      notifications: true,
      budgetAlerts: true,
      priceTracking: true,
      currency: 'USD',
    },
    createdAt: new Date().toISOString(),
  });

  // Initialize state from local storage
  useEffect(() => {
    const loadState = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
        setOnboardingCompleted(onboardingStatus === 'true');
        
        // Try to load any saved user data
        const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      setOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  };
  
  // Profile methods
  const getUserFullName = () => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'User';
  };
  
  const isPremiumUser = () => {
    // Without authentication, everyone is a free user
    return false;
  };
  
  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, message: 'Failed to update profile' };
    }
  };
  
  const updatePreferences = async (preferencesData) => {
    try {
      const updatedUser = { 
        ...user, 
        preferences: { 
          ...user.preferences, 
          ...preferencesData 
        } 
      };
      setUser(updatedUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error('Error updating preferences:', error);
      return { success: false, message: 'Failed to update preferences' };
    }
  };
  
  const signOut = async () => {
    // In a non-auth version, this could reset user preferences or clear data
    return { success: true };
  };

  // Value object to be provided to consumers
  const contextValue = {
    // Always consider the user as authenticated
    isAuthenticated: true,
    isLoading,
    onboardingCompleted,
    completeOnboarding,
    user,
    getUserFullName,
    isPremiumUser,
    updateProfile,
    updatePreferences,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);