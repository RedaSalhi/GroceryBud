import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const LoadingSpinner = ({
  size = 'large',
  text = 'Loading...',
  color,
  overlay = false,
  fullScreen = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();

  const getContainerStyles = () => {
    const baseStyles = [styles.container];

    if (fullScreen) {
      baseStyles.push(styles.fullScreen);
    }

    if (overlay) {
      baseStyles.push(styles.overlay);
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getTextStyles = () => {
    const baseStyles = [
      styles.text,
      {
        color: theme.text,
      }
    ];

    if (textStyle) {
      baseStyles.push(textStyle);
    }

    return baseStyles;
  };

  return (
    <View style={getContainerStyles()}>
      <ActivityIndicator
        size={size}
        color={color || theme.primary}
      />
      {text && (
        <Text style={getTextStyles()}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingSpinner;