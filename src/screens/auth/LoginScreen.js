import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { validateEmail } from '../../utils/validation';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState(null);
  
  const { signIn } = useAuth();
  const theme = useTheme();

  const styles = getStyles(theme);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
    setSignInError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSignInError(null);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (!result.success) {
        setSignInError(result.message);
      }
      // Success is handled by the AuthContext and navigation
    } catch (error) {
      setSignInError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Welcome Back!
            </Text>
            <Text style={styles.subtitle}>
              Sign in to your GroceryBuddy account
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              testID="login-email-input"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={errors.password}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
              testID="login-password-input"
            />

            {signInError && (
              <Text style={styles.errorText}>{signInError}</Text>
            )}

            <Button
              title="Sign In"
              onPress={handleSignIn}
              loading={isLoading}
              disabled={!formData.email || !formData.password}
              fullWidth
              style={styles.signInButton}
              testID="login-submit-button"
            />

            <Button
              title="Forgot Password?"
              onPress={handleForgotPassword}
              variant="ghost"
              style={styles.forgotButton}
              testID="forgot-password-button"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
            </Text>
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              variant="ghost"
              style={styles.signUpButton}
              testID="signup-navigation-button"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: theme.textSecondary,
  },
  errorText: {
    color: theme.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    flex: 1,
    marginBottom: 32,
  },
  signInButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  signUpButton: {
    paddingHorizontal: 0,
    marginLeft: -8,
  },
});

export default LoginScreen;