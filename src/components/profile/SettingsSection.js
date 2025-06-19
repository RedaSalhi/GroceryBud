import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const SettingsSection = ({ title, children }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    section: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.border,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
});

export default SettingsSection; 