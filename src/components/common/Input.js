import React, { forwardRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  containerStyle,
  testID,
  accessible = true,
  accessibilityLabel,
  returnKeyType = 'done',
  onSubmitEditing,
  blurOnSubmit = true,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const theme = useTheme();

  const handleFocus = (event) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const toggleSecureText = () => {
    setIsSecureText(!isSecureText);
  };

  const getContainerStyles = () => {
    const baseStyles = [styles.container];
    
    if (containerStyle) {
      baseStyles.push(containerStyle);
    }
    
    return baseStyles;
  };

  const getInputContainerStyles = () => {
    const baseStyles = [
      styles.inputContainer,
      {
        borderColor: theme.getBorderColor('light'),
        backgroundColor: theme.surface,
      }
    ];

    if (isFocused) {
      baseStyles.push({
        borderColor: theme.primary,
        borderWidth: 2,
      });
    } else if (error) {
      baseStyles.push({
        borderColor: theme.error,
        borderWidth: 1,
      });
    }

    if (disabled) {
      baseStyles.push({
        backgroundColor: theme.getBorderColor('light'),
        opacity: 0.6,
      });
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getInputStyles = () => {
    const baseStyles = [
      styles.input,
      {
        color: theme.text,
        fontSize: 16,
      }
    ];

    if (multiline) {
      baseStyles.push(styles.multilineInput);
    }

    if (leftIcon) {
      baseStyles.push(styles.inputWithLeftIcon);
    }

    if (rightIcon || secureTextEntry) {
      baseStyles.push(styles.inputWithRightIcon);
    }

    if (inputStyle) {
      baseStyles.push(inputStyle);
    }

    return baseStyles;
  };

  const getLabelStyles = () => {
    const baseStyles = [
      styles.label,
      {
        color: theme.text,
      }
    ];

    if (error) {
      baseStyles.push({ color: theme.error });
    } else if (isFocused) {
      baseStyles.push({ color: theme.primary });
    }

    if (labelStyle) {
      baseStyles.push(labelStyle);
    }

    return baseStyles;
  };

  const getHelperTextStyles = () => {
    const baseStyles = [
      styles.helperText,
      {
        color: theme.textSecondary,
      }
    ];

    if (error) {
      baseStyles.push({
        color: theme.error,
      });
    }

    if (errorStyle) {
      baseStyles.push(errorStyle);
    }

    return baseStyles;
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <Text style={getLabelStyles()}>
        {label}
        {required && <Text style={{ color: theme.error }}> *</Text>}
      </Text>
    );
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    return (
      <View style={styles.leftIconContainer}>
        {leftIcon}
      </View>
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={toggleSecureText}
          testID={`${testID}-toggle-secure`}
        >
          <Feather
            name={isSecureText ? 'eye-off' : 'eye'}
            size={20}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      );
    }

    if (!rightIcon) return null;

    return (
      <TouchableOpacity
        style={styles.rightIconContainer}
        onPress={onRightIconPress}
        disabled={!onRightIconPress}
        testID={`${testID}-right-icon`}
      >
        {rightIcon}
      </TouchableOpacity>
    );
  };

  const renderHelperText = () => {
    const text = error || helperText;
    if (!text) return null;

    return (
      <Text style={getHelperTextStyles()}>
        {text}
      </Text>
    );
  };

  return (
    <View style={getContainerStyles()}>
      {renderLabel()}
      
      <View style={getInputContainerStyles()}>
        {renderLeftIcon()}
        
        <TextInput
          ref={ref}
          style={getInputStyles()}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={isSecureText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          testID={testID}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel || label}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          keyboardAppearance={theme.getKeyboardAppearance()}
          {...props}
        />
        
        {renderRightIcon()}
      </View>
      
      {renderHelperText()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  multilineInput: {
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    paddingRight: 12,
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 4,
  },
});

Input.displayName = 'Input';

export default Input;