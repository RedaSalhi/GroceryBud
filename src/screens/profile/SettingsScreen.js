import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import SettingsSection from '../../components/profile/SettingsSection';
import SettingsItem from '../../components/profile/SettingsItem';
import ThemeSelector from '../../components/profile/ThemeSelector';

const SettingsScreen = ({ navigation }) => {
  const { user, updatePreferences } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [preferences, setPreferences] = useState(user?.preferences || {});
  const [error, setError] = useState(null);

  const handlePreferenceChange = async (key, value) => {
    setError(null);
    const oldPreferences = preferences;
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    const result = await updatePreferences({ [key]: value });
    if (!result.success) {
      setPreferences(oldPreferences);
      setError(result.message || 'Failed to update settings.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Appearance */}
        <SettingsSection title="Appearance">
          <SettingsItem
            title="Theme"
            description="Choose your preferred theme"
            rightComponent={<ThemeSelector />}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsItem
            title="Push Notifications"
            description="Receive notifications about shared lists and updates"
            rightComponent={
              <Switch
                value={preferences.notifications !== false}
                onValueChange={(value) => handlePreferenceChange('notifications', value)}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={theme.surface}
              />
            }
          />
          <SettingsItem
            title="Budget Alerts"
            description="Get notified when approaching budget limits"
            rightComponent={
              <Switch
                value={preferences.budgetAlerts !== false}
                onValueChange={(value) => handlePreferenceChange('budgetAlerts', value)}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={theme.surface}
              />
            }
          />
        </SettingsSection>

        {/* Shopping */}
        <SettingsSection title="Shopping">
          <SettingsItem
            title="Price Tracking"
            description="Track and compare prices across shopping trips"
            rightComponent={
              <Switch
                value={preferences.priceTracking !== false}
                onValueChange={(value) => handlePreferenceChange('priceTracking', value)}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={theme.surface}
              />
            }
          />
          <SettingsItem
            title="Currency"
            description={`Current: ${preferences.currency || 'USD'}`}
            onPress={() => {
              Alert.alert(
                'Currency',
                'Select your preferred currency',
                [
                  { text: 'USD ($)', onPress: () => handlePreferenceChange('currency', 'USD') },
                  { text: 'EUR (€)', onPress: () => handlePreferenceChange('currency', 'EUR') },
                  { text: 'GBP (£)', onPress: () => handlePreferenceChange('currency', 'GBP') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }}
            showArrow
          />
        </SettingsSection>

        {/* Account */}
        <SettingsSection title="Account">
          <SettingsItem
            title="Change Password"
            description="Update your account password"
            onPress={() => {
              Alert.alert('Feature Coming Soon', 'Password change functionality will be available in a future update.');
            }}
            showArrow
          />
          <SettingsItem
            title="Export Data"
            description="Download your shopping lists and data"
            onPress={() => {
              Alert.alert('Feature Coming Soon', 'Data export functionality will be available in a future update.');
            }}
            showArrow
          />
          <SettingsItem
            title="Delete Account"
            description="Permanently delete your account and all data"
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'This action cannot be undone. Are you sure you want to delete your account?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => {
                      Alert.alert('Feature Coming Soon', 'Account deletion will be available in a future update.');
                    }
                  },
                ]
              );
            }}
            showArrow
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingsItem
            title="Version"
            description="1.0.0"
          />
          <SettingsItem
            title="Privacy Policy"
            onPress={() => {
              Alert.alert('Privacy Policy', 'Your privacy is important to us. Full privacy policy coming soon.');
            }}
            showArrow
          />
          <SettingsItem
            title="Terms of Service"
            onPress={() => {
              Alert.alert('Terms of Service', 'Terms of service document coming soon.');
            }}
            showArrow
          />
        </SettingsSection>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  errorText: {
    color: theme.error,
    textAlign: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: theme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.error,
  },
});

export default SettingsScreen;