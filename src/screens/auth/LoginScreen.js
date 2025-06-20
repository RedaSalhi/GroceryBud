import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const { login } = useAuth();
  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button title="Login" onPress={handleLogin} fullWidth style={styles.button} />
        <Button title="Create Account" onPress={handleRegister} variant="ghost" fullWidth style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: theme.background },
    form: { gap: 12 },
    button: { marginTop: 8 },
    error: { color: theme.error, textAlign: 'center', marginVertical: 8 },
  });

export default LoginScreen;
