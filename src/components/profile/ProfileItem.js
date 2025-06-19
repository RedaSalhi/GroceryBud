import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const ProfileItem = ({ title, value, onPress, showArrow = false }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <TouchableOpacity
            style={styles.profileItem}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.profileItemContent}>
                <Text style={styles.profileItemTitle}>
                    {title}
                </Text>
                <Text style={styles.profileItemValue}>
                    {value}
                </Text>
            </View>
            {showArrow && (
                <Feather name="chevron-right" size={20} color={theme.textSecondary} />
            )}
        </TouchableOpacity>
    );
};

const getStyles = (theme) => StyleSheet.create({
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    profileItemContent: {
        flex: 1,
    },
    profileItemTitle: {
        fontSize: 14,
        color: theme.textSecondary,
        marginBottom: 4,
    },
    profileItemValue: {
        fontSize: 16,
        color: theme.text,
        fontWeight: '500',
    },
});

export default ProfileItem; 