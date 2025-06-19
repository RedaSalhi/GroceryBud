import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const SettingsItem = ({ title, description, onPress, showArrow = false, rightComponent }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <TouchableOpacity
            style={styles.settingsItem}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingsItemContent}>
                <Text style={styles.settingsItemTitle}>
                    {title}
                </Text>
                {description && (
                    <Text style={styles.settingsItemDescription}>
                        {description}
                    </Text>
                )}
            </View>
            {rightComponent && (
                <View style={styles.rightComponent}>
                    {rightComponent}
                </View>
            )}
            {showArrow && (
                <Feather name="chevron-right" size={20} color={theme.textSecondary} />
            )}
        </TouchableOpacity>
    );
};

const getStyles = (theme) => StyleSheet.create({
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    settingsItemContent: {
        flex: 1,
    },
    settingsItemTitle: {
        fontSize: 16,
        color: theme.text,
    },
    settingsItemDescription: {
        fontSize: 14,
        color: theme.textSecondary,
        marginTop: 4,
    },
    rightComponent: {
        marginLeft: 16,
    },
});

export default SettingsItem; 