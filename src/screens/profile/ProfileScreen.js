import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import SettingsSection from '../../components/profile/SettingsSection';
import ProfileItem from '../../components/profile/ProfileItem';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut, getUserFullName, isPremiumUser } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            setError(null);
            const result = await signOut();
            if (!result.success) {
              setError(result.message || 'Failed to sign out.');
            }
          }
        },
      ]
    );
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleUpgrade = () => {
    navigation.navigate('Upgrade');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getUserFullName().split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>
            {getUserFullName()}
          </Text>
          <Text style={styles.email}>
            {user?.email}
          </Text>
          {isPremiumUser() && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Account Info */}
        <SettingsSection>
          <Text style={styles.sectionTitle}>
            Account Information
          </Text>
          <ProfileItem
            title="Name"
            value={getUserFullName()}
          />
          <ProfileItem
            title="Email"
            value={user?.email || ''}
          />
          <ProfileItem
            title="Member Since"
            value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
          />
        </SettingsSection>

        {/* Subscription */}
        {!isPremiumUser() && (
          <SettingsSection>
            <Text style={styles.sectionTitle}>
              Subscription
            </Text>
            <View style={styles.upgradeContainer}>
              <Text style={styles.upgradeTitle}>
                Upgrade to Premium
              </Text>
              <Text style={styles.upgradeDescription}>
                Unlock unlimited lists, sharing, and advanced features
              </Text>
              <Button
                title="Upgrade Now"
                onPress={handleUpgrade}
                variant="secondary"
                style={styles.upgradeButton}
              />
            </View>
          </SettingsSection>
        )}

        {/* Statistics */}
        <SettingsSection>
          <Text style={styles.sectionTitle}>
            Your Statistics
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {user?.stats?.listsCreated || 0}
              </Text>
              <Text style={styles.statLabel}>
                Lists Created
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {user?.stats?.itemsAdded || 0}
              </Text>
              <Text style={styles.statLabel}>
                Items Added
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                ${user?.stats?.moneySaved || 0}
              </Text>
              <Text style={styles.statLabel}>
                Money Saved
              </Text>
            </View>
          </View>
        </SettingsSection>

        {/* Actions */}
        <SettingsSection>
          <TouchableOpacity style={styles.actionItem} onPress={handleSettings}>
            <Feather name="settings" size={20} color={theme.text} />
            <Text style={styles.actionText}>
              Settings
            </Text>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.actionItem} onPress={handleSignOut}>
            <Feather name="log-out" size={20} color={theme.error} />
            <Text style={[styles.actionText, { color: theme.error }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
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
    header: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        color: theme.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: theme.textSecondary,
        marginBottom: 8,
    },
    premiumBadge: {
        backgroundColor: theme.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    premiumText: {
        color: theme.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 12,
    },
    upgradeContainer: {
        alignItems: 'center',
        padding: 16,
    },
    upgradeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
    upgradeDescription: {
        fontSize: 14,
        color: theme.textSecondary,
        textAlign: 'center',
        marginBottom: 16,
    },
    upgradeButton: {
        width: '100%',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.primary,
    },
    statLabel: {
        fontSize: 14,
        color: theme.textSecondary,
        marginTop: 4,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    actionText: {
        fontSize: 16,
        marginLeft: 16,
        flex: 1,
        color: theme.text,
    },
    divider: {
        height: 1,
        backgroundColor: theme.border,
        marginHorizontal: -16,
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

export default ProfileScreen;