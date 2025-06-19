import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { generateUUID } from '../utils/helpers';
import { forgotPasswordRequest, resetPasswordRequest } from './authMockService';

// --- Firebase imports ---
// If you don't want Firebase in certain environments (e.g. unit tests) you can
// guard these imports behind a condition.  For simplicity we import them
// eagerly; the library must be installed via `npx expo install firebase`.
import { auth, db } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Toggle between providers.  When running on-device we default to Firebase;
// during Node-based unit tests you can omit the env var so the mock remains.
const USE_FIREBASE = process.env.EXPO_PUBLIC_AUTH_PROVIDER === 'firebase';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  onboardingCompleted: false,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  SIGN_OUT: 'SIGN_OUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ONBOARDING_COMPLETED: 'SET_ONBOARDING_COMPLETED',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case ActionTypes.SET_ONBOARDING_COMPLETED:
      return {
        ...state,
        onboardingCompleted: action.payload,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// --- Mock Auth Service ---
// This service simulates a backend using AsyncStorage.

const MOCK_USERS_KEY = 'MOCK_USERS_DB';
const CURRENT_USER_KEY = 'CURRENT_USER_SESSION';

// Helper utilities for computing user properties
export const getUserFullNameFromData = (user) => {
  if (!user) return 'Guest';
  const { firstName, lastName, displayName, email } = user;
  const name = `${firstName || ''} ${lastName || ''}`.trim();
  if (name) return name;
  if (displayName) return displayName;
  return email || 'User';
};

export const isPremiumUserFromData = (user) => {
  if (!user) return false;
  const { role, subscription } = user;
  return role === USER_ROLES.PREMIUM || String(subscription).toLowerCase() === 'premium';
};

// Helper to get all stored users
const getMockUsers = async () => {
  try {
    const users = await AsyncStorage.getItem(MOCK_USERS_KEY);
    if (!users) return [];
    return JSON.parse(users);
  } catch (err) {
    console.warn('Failed to parse users from storage, resetting mock DB', err);
    // Clear corrupted data so future parses succeed
    await AsyncStorage.removeItem(MOCK_USERS_KEY);
    return [];
  }
};

// Mock createAccount
const createAccount = async (email, password, additionalData) => {
  const users = await getMockUsers();
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser = {
    uid: generateUUID(),
    email,
    password, // In a real app, NEVER store plain text passwords. This is for mock purposes only.
    displayName: additionalData.displayName || 'New User',
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]));
  return { success: true, user: newUser, message: 'Account created successfully!' };
};

// Mock signIn
const signIn = async (email, password) => {
  const users = await getMockUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }
  // Don't store password in the session object
  const { password: _password, ...userSession } = user;
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
  return { success: true, user: userSession, message: 'Signed in successfully!' };
};

// Mock signOut
const signOutUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
  return { success: true, message: 'Signed out successfully!' };
};

// Mock getCurrentUser
const getCurrentUser = async () => {
  const userSession = await AsyncStorage.getItem(CURRENT_USER_KEY);
  if (userSession) {
    return { success: true, user: JSON.parse(userSession) };
  }
  return { success: false, user: null };
};

// Mock forgotPassword

// --- Auth Context ---

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ----------------------------------------------
  // Bootstrap auth state (Firebase vs Mock)
  // ----------------------------------------------
  useEffect(() => {
    const bootstrap = async () => {
      // onboarding flag is stored regardless of provider
      const onboardingStatus = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED,
      );
      dispatch({
        type: ActionTypes.SET_ONBOARDING_COMPLETED,
        payload: onboardingStatus === 'true',
      });

      if (USE_FIREBASE) {
        // Subscribe to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Load additionally stored profile (first/last name) if it exists
            let extra = {};
            try {
              const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
              if (snap.exists()) extra = snap.data();
            } catch {}

            dispatch({
              type: ActionTypes.SET_USER,
              payload: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                ...extra,
              },
            });
          } else {
            dispatch({ type: ActionTypes.SET_USER, payload: null });
          }
        });

        return () => unsubscribe();
      } else {
        // Fallback mock provider
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const userResult = await getCurrentUser();
        dispatch({
          type: ActionTypes.SET_USER,
          payload: userResult.success ? userResult.user : null,
        });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    bootstrap();
  }, []);

  const actions = {
    signUp: async (email, password, additionalData) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      try {
        if (USE_FIREBASE) {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          // Update displayName
          if (additionalData?.displayName) {
            await updateProfile(cred.user, { displayName: additionalData.displayName });
          }

          // Persist extra profile info (firstName, lastName) in Firestore
          await setDoc(doc(db, 'users', cred.user.uid), {
            firstName: additionalData.firstName,
            lastName: additionalData.lastName,
            createdAt: Date.now(),
          });

          // Local state payload
          const userPayload = {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName || additionalData.displayName,
            firstName: additionalData.firstName,
            lastName: additionalData.lastName,
          };

          dispatch({ type: ActionTypes.SET_USER, payload: userPayload });
          return { success: true, user: userPayload };
        }

        // ---- Mock fallback ----
        const result = await createAccount(email, password, additionalData);
        if (result.success) {
          dispatch({ type: ActionTypes.SET_USER, payload: result.user });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: result.message });
        }
        return result;
      } catch (error) {
        console.error('SignUp error:', error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message || 'Failed to create account.' });
        return { success: false, message: error.message };
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    signIn: async (email, password) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        if (USE_FIREBASE) {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          // Auth listener will update state; we still return success immediately
          return { success: true, user: cred.user };
        }

        // ---- Mock fallback ----
        const result = await signIn(email, password);
        if (result.success) {
          dispatch({ type: ActionTypes.SET_USER, payload: result.user });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: result.message });
        }
        return result;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message || 'Invalid credentials.' });
        return { success: false, message: error.message };
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    signOut: async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        if (USE_FIREBASE) {
          await firebaseSignOut(auth);
          dispatch({ type: ActionTypes.SIGN_OUT });
          return { success: true };
        }

        const result = await signOutUser();
        if (result.success) {
          dispatch({ type: ActionTypes.SIGN_OUT });
        }
        return result;
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    forgotPassword: async (email) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const result = await forgotPasswordRequest(email);
      if (!result.success) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: result.message });
      } else {
        dispatch({ type: ActionTypes.CLEAR_ERROR });
      }
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return result;
    },
    resetPassword: async (email, password) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const result = await resetPasswordRequest(email, password);
      if (!result.success) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: result.message });
      } else {
        dispatch({ type: ActionTypes.CLEAR_ERROR });
      }
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return result;
    },
    updateProfile: async (profileData) => {
      if (!state.user) return { success: false, message: "No user is signed in." };
      const updatedUser = { ...state.user, ...profileData };
      
      // Update the master user list
      const users = await getMockUsers();
      const userIndex = users.findIndex(u => u.uid === state.user.uid);
      if (userIndex !== -1) {
        // Keep password from original record
        const originalUser = users[userIndex];
        users[userIndex] = { ...originalUser, ...updatedUser };
        await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
      }

      // Update the session
      const { password: _password, ...userSession } = updatedUser;
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      dispatch({ type: ActionTypes.UPDATE_USER, payload: userSession });
      return { success: true, user: userSession, message: "Profile updated." };
    },
    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },
    completeOnboarding: async () => {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      dispatch({ type: ActionTypes.SET_ONBOARDING_COMPLETED, payload: true });
    },
  };

  const helpers = {
    getUserFullName: () => getUserFullNameFromData(state.user),
    isPremiumUser: () => isPremiumUserFromData(state.user),
  };

  return (
    <AuthContext.Provider value={{ ...state, ...actions, ...helpers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for authenticated routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
      return null; // You can replace this with a loading spinner
    }
    if (!isAuthenticated) {
      return null; // You can replace this with redirect logic
    }
    return <Component {...props} />;
  };
};

export default AuthContext;