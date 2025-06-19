import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';

// Import screens
import ListsHomeScreen from '../screens/lists/ListsHomeScreen';
import ListDetailsScreen from '../screens/lists/ListDetailsScreen';
import CreateListScreen from '../screens/lists/CreateListScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import UpgradeScreen from '../screens/profile/UpgradeScreen';

// Import icons (you would replace these with actual icon components)
const HomeIcon = ({ color, size }) => <Text style={{ color, fontSize: size }}>🏠</Text>;
const ListIcon = ({ color, size }) => <Text style={{ color, fontSize: size }}>📝</Text>;
const ProfileIcon = ({ color, size }) => <Text style={{ color, fontSize: size }}>👤</Text>;
const AddIcon = ({ color, size }) => <Text style={{ color, fontSize: size }}>➕</Text>;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const ListsStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="ListsHome"
        component={ListsHomeScreen}
        options={{
          title: 'My Lists',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="ListDetails"
        component={ListDetailsScreen}
        options={({ route }) => ({
          title: route.params?.listName || 'List Details',
        })}
      />
      <Stack.Screen
        name="CreateList"
        component={CreateListScreen}
        options={{
          title: 'Create List',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="Upgrade"
        component={UpgradeScreen}
        options={{
          title: 'Upgrade to Premium',
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon color={color} size={size} />;
            case 'Lists':
              return <ListIcon color={color} size={size} />;
            case 'Profile':
              return <ProfileIcon color={color} size={size} />;
            default:
              return <ListIcon color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      })}
    >
      <Tab.Screen
        name="Lists"
        component={ListsStackNavigator}
        options={{
          title: 'Lists',
          tabBarBadge: undefined, // You can add badge count here
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;