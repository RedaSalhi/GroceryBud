import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const featureIcons = {
    'Unlimited Lists': 'infinity',
    'List Sharing': 'users',
    'Advanced Analytics': 'bar-chart-2',
    'Price History': 'dollar-sign',
    'Cloud Sync': 'cloud',
    'Smart Suggestions': 'cpu',
};

const FeatureRow = ({ feature }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const iconName = featureIcons[feature.title] || 'check-circle';

    return (
        <View style={styles.featureRow}>
            <View style={styles.featureInfo}>
                <Feather name={iconName} size={20} color={theme.textSecondary} style={styles.featureIcon} />
                <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>
                        {feature.title}
                    </Text>
                    <Text style={styles.featureDescription}>
                        {feature.description}
                    </Text>
                </View>
            </View>
            <View style={styles.featureComparison}>
                <Text style={styles.freeValue}>
                    {feature.free}
                </Text>
                <Text style={styles.premiumValue}>
                    {feature.premium}
                </Text>
            </View>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    featureInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    featureIcon: {
        marginRight: 12,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        color: theme.text,
        fontWeight: '500',
    },
    featureDescription: {
        fontSize: 12,
        color: theme.textSecondary,
        marginTop: 2,
    },
    featureComparison: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 16,
    },
    freeValue: {
        color: theme.textSecondary,
        width: 60,
        textAlign: 'center',
    },
    premiumValue: {
        color: theme.primary,
        fontWeight: 'bold',
        width: 60,
        textAlign: 'center',
    },
});

export default FeatureRow; 