import React from 'react';
import {
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
  const { user, getUserFullName, isPremiumUser } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);

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
              {getUserFullName().split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>
            {getUserFullName()}
          </Text>
          <Text style={styles.email}>
            {user?.email || 'local@example.com'}
          </Text>
          {isPremiumUser() && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>

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
        minWidth: 160,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: theme.textSecondary,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    actionText: {
        fontSize: 16,
        color: theme.text,
        marginLeft: 16,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: theme.border,
        marginVertical: 4,
    },
});

export default ProfileScreen;