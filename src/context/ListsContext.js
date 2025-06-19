import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { calculateShoppingStats } from '../utils/calculations';
import { STORAGE_KEYS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { generateUUID } from '../utils/helpers';

// Initial state
const initialState = {
  lists: [],
  currentList: null,
  isLoading: false,
  error: null,
  offlineLists: [],
  syncPending: false,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_LISTS: 'SET_LISTS',
  SET_CURRENT_LIST: 'SET_CURRENT_LIST',
  ADD_LIST: 'ADD_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_LIST: 'DELETE_LIST',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_OFFLINE_LISTS: 'SET_OFFLINE_LISTS',
  ADD_OFFLINE_LIST: 'ADD_OFFLINE_LIST',
  SET_SYNC_PENDING: 'SET_SYNC_PENDING',
  UPDATE_LIST_STATS: 'UPDATE_LIST_STATS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  TOGGLE_ITEM: 'TOGGLE_ITEM',
};

// Reducer
const listsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_LISTS:
      return {
        ...state,
        lists: action.payload,
        isLoading: false,
        error: null,
      };

    case ActionTypes.SET_CURRENT_LIST:
      return {
        ...state,
        currentList: action.payload,
        error: null,
      };

    case ActionTypes.ADD_LIST:
      return {
        ...state,
        lists: [action.payload, ...state.lists],
        error: null,
      };

    case ActionTypes.UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.id ? action.payload : list
        ),
        currentList: state.currentList?.id === action.payload.id 
          ? action.payload 
          : state.currentList,
        error: null,
      };

    case ActionTypes.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        currentList: state.currentList?.id === action.payload 
          ? null 
          : state.currentList,
        error: null,
      };

    case ActionTypes.ADD_ITEM: {
      const { listId, item } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === listId
            ? { ...list, items: [...(list.items || []), item] }
            : list
        ),
      };
    }

    case ActionTypes.UPDATE_ITEM: {
      const { listId, item: updatedItem } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === listId
            ? {
                ...list,
                items: (list.items || []).map(item =>
                  item.id === updatedItem.id ? updatedItem : item
                ),
              }
            : list
        ),
      };
    }

    case ActionTypes.DELETE_ITEM: {
      const { listId, itemId } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === listId
            ? { ...list, items: (list.items || []).filter(item => item.id !== itemId) }
            : list
        ),
      };
    }

    case ActionTypes.TOGGLE_ITEM: {
      const { listId, itemId } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === listId
            ? {
                ...list,
                items: (list.items || []).map(item =>
                  item.id === itemId ? { ...item, completed: !item.completed } : item
                ),
              }
            : list
        ),
      };
    }

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionTypes.SET_OFFLINE_LISTS:
      return {
        ...state,
        offlineLists: action.payload,
      };

    case ActionTypes.ADD_OFFLINE_LIST:
      return {
        ...state,
        offlineLists: [...state.offlineLists, action.payload],
      };

    case ActionTypes.SET_SYNC_PENDING:
      return {
        ...state,
        syncPending: action.payload,
      };

    case ActionTypes.UPDATE_LIST_STATS:
      const { listId: statsListId, stats } = action.payload;
      const updatedList = state.lists.find(l => l.id === statsListId);
      if (!updatedList) return state;
      
      const newListWithStats = {
        ...updatedList,
        totalItems: stats.totalItems,
        completedItems: stats.completedItems,
        totalValue: stats.totalValue,
        completedValue: stats.completedValue,
      };
      
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === statsListId ? newListWithStats : list
        ),
        currentList: state.currentList?.id === statsListId 
          ? newListWithStats 
          : state.currentList,
      };

    default:
      return state;
  }
};

// Create context
const ListsContext = createContext();

// Lists provider component
export const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load lists from AsyncStorage
  useEffect(() => {
    const loadLists = async () => {
      if (!isAuthenticated || !user) {
        dispatch({ type: ActionTypes.SET_LISTS, payload: [] });
        return;
      }
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const storedLists = await AsyncStorage.getItem(`${STORAGE_KEYS.LISTS}_${user.uid}`);
        if (storedLists) {
          dispatch({ type: ActionTypes.SET_LISTS, payload: JSON.parse(storedLists) });
        } else {
          dispatch({ type: ActionTypes.SET_LISTS, payload: [] });
        }
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to load lists.' });
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };
    loadLists();
  }, [isAuthenticated, user]);

  // Save lists to AsyncStorage whenever they change
  useEffect(() => {
    const saveLists = async () => {
      if (isAuthenticated && user && !state.isLoading) {
        try {
          await AsyncStorage.setItem(
            `${STORAGE_KEYS.LISTS}_${user.uid}`,
            JSON.stringify(state.lists)
          );
        } catch (error) {
          console.error('Failed to save lists to storage:', error);
        }
      }
    };
    saveLists();
  }, [state.lists, isAuthenticated, user, state.isLoading]);

  // Action creators
  const actions = {
    // Create a new list
    createList: async (listData) => {
      try {
        if (!user) throw new Error('User not authenticated');
        const newList = {
          id: generateUUID(),
          ...listData,
          ownerId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [],
          sharedWith: [],
        };
        dispatch({ type: ActionTypes.ADD_LIST, payload: newList });
        return { success: true, list: newList, message: 'List created successfully!' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    // Update a list
    updateList: async (listId, updateData) => {
      const listToUpdate = state.lists.find(list => list.id === listId);
      if (!listToUpdate) return { success: false, message: 'List not found' };

      const updatedList = {
        ...listToUpdate,
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: ActionTypes.UPDATE_LIST, payload: updatedList });
      return { success: true, message: 'List updated successfully!' };
    },

    // Delete a list
    deleteList: async (listId) => {
      dispatch({ type: ActionTypes.DELETE_LIST, payload: listId });
      return { success: true, message: 'List deleted successfully!' };
    },

    // Get a single list by ID
    getListById: (listId) => {
      return state.lists.find(list => list.id === listId) || null;
    },
    
    // Add an item to a list
    addItem: async (listId, itemData) => {
      const newItem = {
        id: generateUUID(),
        ...itemData,
        createdAt: new Date().toISOString(),
        completed: false,
      };
      dispatch({ type: ActionTypes.ADD_ITEM, payload: { listId, item: newItem } });
      return { success: true, item: newItem };
    },
    
    // Update an item in a list
    updateItem: async (listId, itemId, updateData) => {
      const list = state.lists.find(l => l.id === listId);
      const item = list?.items.find(i => i.id === itemId);
      if (!item) return { success: false, message: 'Item not found' };

      const updatedItem = { ...item, ...updateData };
      dispatch({ type: ActionTypes.UPDATE_ITEM, payload: { listId, item: updatedItem } });
      return { success: true };
    },

    // Delete an item from a list
    deleteItem: async (listId, itemId) => {
      dispatch({ type: ActionTypes.DELETE_ITEM, payload: { listId, itemId } });
      return { success: true };
    },

    // Toggle item completion
    toggleItem: async (listId, itemId) => {
      dispatch({ type: ActionTypes.TOGGLE_ITEM, payload: { listId, itemId } });
      return { success: true };
    },

    // Refresh lists (now just re-calculates stats)
    refreshLists: async () => {
      state.lists.forEach(list => {
        const stats = calculateShoppingStats(list.items);
        dispatch({ type: ActionTypes.UPDATE_LIST_STATS, payload: { listId: list.id, stats } });
      });
      return { success: true };
    },

    // Get stats for a list
    getListStats: (listId) => {
      const list = state.lists.find(l => l.id === listId);
      return list ? calculateShoppingStats(list.items) : calculateShoppingStats([]);
    },
    
    // Get total counts
    getTotalListsCount: () => state.lists.length,
    getTotalItemsCount: () => state.lists.reduce((acc, list) => acc + (list.items?.length || 0), 0),
    getTotalValue: () =>
      state.lists.reduce((acc, list) => {
        const stats = calculateShoppingStats(list.items);
        return acc + stats.totalValue;
      }, 0),
  };

  return (
    <ListsContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ListsContext.Provider>
  );
};

// Custom hook to use the lists context
export const useLists = () => {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};

export default ListsContext;