import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { THEME_MODES, useTheme } from '../../context/ThemeContext';

const ThemeSelector = () => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const currentMode = theme.getThemeMode();

    const handleThemeChange = () => {
        Alert.alert(
            'Choose Theme',
            'Select your preferred theme',
            [
                { text: 'Light', onPress: () => theme.setThemeMode(THEME_MODES.LIGHT) },
                { text: 'Dark', onPress: () => theme.setThemeMode(THEME_MODES.DARK) },
                { text: 'Auto', onPress: () => theme.setThemeMode(THEME_MODES.AUTO) },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const getThemeLabel = () => {
        switch (currentMode) {
            case THEME_MODES.LIGHT: return 'Light';
            case THEME_MODES.DARK: return 'Dark';
            case THEME_MODES.AUTO: return 'Auto';
            default: return 'Auto';
        }
    };

    return (
        <TouchableOpacity onPress={handleThemeChange}>
            <Text style={styles.themeValue}>
                {getThemeLabel()}
            </Text>
        </TouchableOpacity>
    );
};


const getStyles = (theme) => StyleSheet.create({
    themeValue: {
        fontSize: 16,
        color: theme.primary,
        fontWeight: '500',
    },
});

export default ThemeSelector; 