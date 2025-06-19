import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { calculateShoppingStats } from '../utils/calculations';
import { useAuth } from './AuthContext';
import { generateUUID } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

// Initial state
const initialState = {
  lists: [],
  currentList: null,
  isLoading: false,
  error: null,
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
        currentList: state.currentList?.id === listId
          ? {
              ...state.currentList,
              items: [...(state.currentList.items || []), item]
            }
          : state.currentList,
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
        currentList: state.currentList?.id === listId
          ? {
              ...state.currentList,
              items: (state.currentList.items || []).map(item =>
                item.id === updatedItem.id ? updatedItem : item
              )
            }
          : state.currentList,
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
        currentList: state.currentList?.id === listId
          ? {
              ...state.currentList,
              items: (state.currentList.items || []).filter(item => item.id !== itemId)
            }
          : state.currentList,
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
        currentList: state.currentList?.id === listId
          ? {
              ...state.currentList,
              items: (state.currentList.items || []).map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : state.currentList,
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

    default:
      return state;
  }
};

// Create context
const ListsContext = createContext();

// Helper function to save lists to AsyncStorage
const saveLists = async (lists) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving lists to AsyncStorage:', error);
  }
};

// Lists provider component
export const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, initialState);
  const { user } = useAuth();

  // Load lists from AsyncStorage when component mounts
  useEffect(() => {
    const loadLists = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      try {
        const listsJson = await AsyncStorage.getItem(STORAGE_KEYS.LISTS);
        
        if (listsJson) {
          const lists = JSON.parse(listsJson);
          
          // Calculate stats for each list
          const processedLists = lists.map(list => {
            const items = list.items || [];
            const stats = calculateShoppingStats(items);
            return { ...list, stats };
          });
          
          dispatch({ type: ActionTypes.SET_LISTS, payload: processedLists });
        } else {
          dispatch({ type: ActionTypes.SET_LISTS, payload: [] });
        }
      } catch (error) {
        console.error('Error loading lists from AsyncStorage:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to load shopping lists.' 
        });
      }
    };
    
    loadLists();
  }, []);

  // Save lists to AsyncStorage whenever they change, but skip during refresh
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    if (!isRefreshing) {
      saveLists(state.lists);
    }
  }, [state.lists, isRefreshing]);

  // Define actions for the context
  const actions = {
    // Create a new shopping list
    createList: async (listData) => {
      try {
        const timestamp = new Date();
        
        const newList = {
          id: generateUUID(),
          ...listData,
          items: [],
          ownerId: user.uid,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        
        dispatch({ type: ActionTypes.ADD_LIST, payload: newList });
        return { success: true, list: newList };
      } catch (error) {
        console.error('Error creating list:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to create list.'
        });
        return { success: false, error: 'Failed to create list.' };
      }
    },
    
    // Get a single list by ID
    getList: (listId) => {
      try {
        const list = state.lists.find(item => item.id === listId);
        
        if (list) {
          return { success: true, list };
        }
        
        return { success: false, error: 'List not found.' };
      } catch (error) {
        console.error('Error getting list:', error);
        return { success: false, error: 'Error retrieving list.' };
      }
    },
    
    // Update a list
    updateList: async (listId, updatedData) => {
      try {
        const listIndex = state.lists.findIndex(list => list.id === listId);
        
        if (listIndex === -1) {
          dispatch({ 
            type: ActionTypes.SET_ERROR, 
            payload: 'List not found.'
          });
          return { success: false, error: 'List not found.' };
        }
        
        const updatedList = {
          ...state.lists[listIndex],
          ...updatedData,
          updatedAt: new Date(),
        };
        
        dispatch({ type: ActionTypes.UPDATE_LIST, payload: updatedList });
        return { success: true, list: updatedList };
      } catch (error) {
        console.error('Error updating list:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to update list.'
        });
        return { success: false, error: 'Failed to update list.' };
      }
    },
    
    // Delete a list
    deleteList: async (listId) => {
      try {
        dispatch({ type: ActionTypes.DELETE_LIST, payload: listId });
        return { success: true };
      } catch (error) {
        console.error('Error deleting list:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to delete list.'
        });
        return { success: false, error: 'Failed to delete list.' };
      }
    },
    
    // Add an item to a list
    addItem: async (listId, itemData) => {
      try {
        const newItem = {
          id: generateUUID(),
          ...itemData,
          completed: false,
          createdAt: new Date(),
        };
        
        dispatch({ 
          type: ActionTypes.ADD_ITEM, 
          payload: { listId, item: newItem }
        });
        
        return { success: true, item: newItem };
      } catch (error) {
        console.error('Error adding item:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to add item.'
        });
        return { success: false, error: 'Failed to add item.' };
      }
    },
    
    // Update an item in a list
    updateItem: async (listId, itemId, updatedData) => {
      try {
        const list = state.lists.find(l => l.id === listId);
        
        if (!list) {
          dispatch({ 
            type: ActionTypes.SET_ERROR, 
            payload: 'List not found.'
          });
          return { success: false, error: 'List not found.' };
        }
        
        const itemIndex = list.items.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) {
          dispatch({ 
            type: ActionTypes.SET_ERROR, 
            payload: 'Item not found.'
          });
          return { success: false, error: 'Item not found.' };
        }
        
        const updatedItem = {
          ...list.items[itemIndex],
          ...updatedData,
          updatedAt: new Date(),
        };
        
        dispatch({ 
          type: ActionTypes.UPDATE_ITEM, 
          payload: { listId, item: updatedItem }
        });
        
        return { success: true, item: updatedItem };
      } catch (error) {
        console.error('Error updating item:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to update item.'
        });
        return { success: false, error: 'Failed to update item.' };
      }
    },
    
    // Delete an item from a list
    deleteItem: async (listId, itemId) => {
      try {
        dispatch({ 
          type: ActionTypes.DELETE_ITEM, 
          payload: { listId, itemId }
        });
        
        return { success: true };
      } catch (error) {
        console.error('Error deleting item:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to delete item.'
        });
        return { success: false, error: 'Failed to delete item.' };
      }
    },
    
    // Toggle item completion status
    toggleItemCompletion: async (listId, itemId) => {
      try {
        const list = state.lists.find(l => l.id === listId);
        if (!list) {
          throw new Error('List not found');
        }

        const item = list.items.find(i => i.id === itemId);
        if (!item) {
          throw new Error('Item not found');
        }

        const updatedItem = {
          ...item,
          completed: !item.completed,
          updatedAt: new Date()
        };

        dispatch({ 
          type: ActionTypes.UPDATE_ITEM, 
          payload: { listId, item: updatedItem }
        });
        
        return { success: true, item: updatedItem };
      } catch (error) {
        console.error('Error toggling item:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: error.message || 'Failed to update item.'
        });
        return { success: false, error: error.message || 'Failed to update item.' };
      }
    },
    
    // Clear error state
    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },
    
    // Refresh lists from storage
    refreshLists: async () => {
      setIsRefreshing(true);
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      try {
        const listsJson = await AsyncStorage.getItem(STORAGE_KEYS.LISTS);
        
        if (listsJson) {
          const lists = JSON.parse(listsJson);
          
          // Calculate stats for each list
          const processedLists = lists.map(list => {
            const items = list.items || [];
            const stats = calculateShoppingStats(items);
            return { ...list, stats };
          });
          
          dispatch({ type: ActionTypes.SET_LISTS, payload: processedLists });
        } else {
          dispatch({ type: ActionTypes.SET_LISTS, payload: [] });
        }
        
        setIsRefreshing(false);
        return { success: true };
      } catch (error) {
        console.error('Error refreshing lists:', error);
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Failed to refresh lists.' 
        });
        setIsRefreshing(false);
        return { success: false, error: 'Failed to refresh lists.' };
      }
    },
  };
  
  // Provide context value
  const value = {
    ...state,
    ...actions,
  };

  return (
    <ListsContext.Provider value={value}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => useContext(ListsContext);