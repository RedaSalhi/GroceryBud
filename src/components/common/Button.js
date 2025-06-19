import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  testID,
  accessible = true,
  accessibilityLabel,
  children,
  ...props
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    const baseStyles = [styles.button];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyles.push(styles.buttonLarge);
        break;
      default:
        baseStyles.push(styles.buttonMedium);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyles.push({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.primary,
        });
        break;
      case 'outline':
        baseStyles.push({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
        });
        break;
      case 'ghost':
        baseStyles.push({
          backgroundColor: 'transparent',
        });
        break;
      case 'danger':
        baseStyles.push({
          backgroundColor: theme.error,
        });
        break;
      case 'success':
        baseStyles.push({
          backgroundColor: theme.success,
        });
        break;
      case 'warning':
        baseStyles.push({
          backgroundColor: theme.warning,
        });
        break;
      default:
        baseStyles.push({
          backgroundColor: theme.primary,
        });
    }

    // State styles
    if (disabled) {
      baseStyles.push({
        backgroundColor: theme.getBorderColor('light'),
        borderColor: theme.getBorderColor('light'),
        opacity: 0.6,
      });
    }

    // Full width
    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }

    // Custom styles
    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getTextStyles = () => {
    const baseStyles = [styles.buttonText];
    
    // Size text styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.buttonTextSmall);
        break;
      case 'large':
        baseStyles.push(styles.buttonTextLarge);
        break;
      default:
        baseStyles.push(styles.buttonTextMedium);
    }

    // Variant text styles
    switch (variant) {
      case 'secondary':
        baseStyles.push({ color: theme.primary });
        break;
      case 'outline':
        baseStyles.push({ color: theme.text });
        break;
      case 'ghost':
        baseStyles.push({ color: theme.primary });
        break;
      case 'danger':
        baseStyles.push({ color: '#FFFFFF' });
        break;
      case 'success':
        baseStyles.push({ color: '#FFFFFF' });
        break;
      case 'warning':
        baseStyles.push({ color: '#FFFFFF' });
        break;
      default:
        baseStyles.push({ color: '#FFFFFF' });
    }

    // Disabled text color
    if (disabled) {
      baseStyles.push({ color: theme.textSecondary });
    }

    // Custom text styles
    if (textStyle) {
      baseStyles.push(textStyle);
    }

    return baseStyles;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === 'primary' || variant === 'danger' || variant === 'success' || variant === 'warning' 
              ? '#FFFFFF' 
              : theme.primary
            }
          />
          {title && (
            <Text style={[getTextStyles(), styles.loadingText]}>
              {title}
            </Text>
          )}
        </View>
      );
    }

    const content = [];

    // Left icon
    if (icon && iconPosition === 'left') {
      content.push(
        <View key="leftIcon" style={styles.iconLeft}>
          {icon}
        </View>
      );
    }

    // Button text or children
    if (children) {
      content.push(
        <View key="children" style={styles.childrenContainer}>
          {children}
        </View>
      );
    } else if (title) {
      content.push(
        <Text key="title" style={getTextStyles()}>
          {title}
        </Text>
      );
    }

    // Right icon
    if (icon && iconPosition === 'right') {
      content.push(
        <View key="rightIcon" style={styles.iconRight}>
          {icon}
        </View>
      );
    }

    return content;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  buttonSmall: {
    height: 36,
    paddingHorizontal: 12,
  },
  buttonMedium: {
    height: 48,
    paddingHorizontal: 16,
  },
  buttonLarge: {
    height: 56,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextMedium: {
    fontSize: 16,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Button;