import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { validateEmail } from '../../utils/validation';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetError, setResetError] = useState(null);
  
  const { resetPassword } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleEmailChange = (value) => {
    setEmail(value);
    if (error) {
      setError('');
    }
    setResetError(null);
  };

  const handleResetPassword = async () => {
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    setIsLoading(true);
    setResetError(null);

    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setEmailSent(true);
      } else {
        setResetError(result.message);
      }
    } catch (error) {
      setResetError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>
              Email Sent!
            </Text>
            <Text style={styles.successMessage}>
              We've sent password reset instructions to {email}
            </Text>
            <Button
              title="Back to Sign In"
              onPress={() => navigation.navigate('Login')}
              style={styles.backButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Reset Password
          </Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleResetPassword}
            testID="forgot-password-email-input"
          />

          {resetError && (
            <Text style={styles.errorText}>{resetError}</Text>
          )}

          <Button
            title="Send Reset Email"
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={!email}
            fullWidth
            style={styles.resetButton}
            testID="forgot-password-submit-button"
          />

          <Button
            title="Back to Sign In"
            onPress={() => navigation.goBack()}
            variant="ghost"
            style={styles.backButton}
            testID="back-to-login-button"
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: theme.textSecondary,
  },
  form: {
    flex: 1,
  },
  resetButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: theme.text,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    color: theme.textSecondary,
  },
  errorText: {
    color: theme.error,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;