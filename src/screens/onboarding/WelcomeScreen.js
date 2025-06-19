import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleGetStarted = () => {
    navigation.navigate('Tutorial');
  };

  const handleSkip = () => {
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather name="shopping-cart" size={40} color={theme.white} />
          </View>
          <Text style={styles.title}>
            Welcome to GroceryBuddy
          </Text>
          <Text style={styles.subtitle}>
            Your smart shopping companion that helps you organize lists, track budgets, and shop efficiently.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Feather name="edit-3" size={40} color={theme.primary} />
            <Text style={styles.featureTitle}>
              Smart Lists
            </Text>
            <Text style={styles.featureDescription}>
              Create and organize shopping lists with intelligent suggestions
            </Text>
          </View>

          <View style={styles.feature}>
            <Feather name="dollar-sign" size={40} color={theme.primary} />
            <Text style={styles.featureTitle}>
              Budget Tracking
            </Text>
            <Text style={styles.featureDescription}>
              Keep track of your spending and stay within budget
            </Text>
          </View>

          <View style={styles.feature}>
            <Feather name="share-2" size={40} color={theme.primary} />
            <Text style={styles.featureTitle}>
              Share & Collaborate
            </Text>
            <Text style={styles.featureDescription}>
              Share lists with family and friends for collaborative shopping
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            fullWidth
            style={styles.getStartedButton}
            testID="welcome-get-started-button"
          />
          
          <Button
            title="Skip Introduction"
            onPress={handleSkip}
            variant="ghost"
            style={styles.skipButton}
            testID="welcome-skip-button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  features: {
    gap: 32,
  },
  feature: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    gap: 16,
    paddingBottom: 32,
  },
  getStartedButton: {
    marginBottom: 8,
  },
  skipButton: {
    alignSelf: 'center',
  },
});

export default WelcomeScreen;