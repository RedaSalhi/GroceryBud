import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const PlanCard = ({ 
    title, 
    price, 
    period, 
    description, 
    features, 
    onPress, 
    recommended = false,
    buttonTitle = 'Upgrade Now'
}) => {
    const theme = useTheme();
    const styles = getStyles(theme, recommended);

    return (
        <View style={styles.planCard}>
            {recommended && (
                <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                </View>
            )}

            <Text style={styles.planTitle}>
                {title}
            </Text>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>
                    ${price}
                </Text>
                <Text style={styles.period}>
                    /{period}
                </Text>
            </View>

            <Text style={styles.planDescription}>
                {description}
            </Text>

            <View style={styles.planFeatures}>
                {features.map((feature, index) => (
                    <View key={index} style={styles.planFeature}>
                        <Feather name="check" size={16} color={theme.success} style={styles.checkmark} />
                        <Text style={styles.planFeatureText}>
                            {feature}
                        </Text>
                    </View>
                ))}
            </View>

            <Button
                title={buttonTitle}
                onPress={onPress}
                variant={recommended ? 'primary' : 'secondary'}
                fullWidth
                style={styles.planButton}
            />
        </View>
    );
};

const getStyles = (theme, recommended) => StyleSheet.create({
    planCard: {
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        borderWidth: recommended ? 2 : 1,
        borderColor: recommended ? theme.primary : theme.border,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    recommendedBadge: {
        position: 'absolute',
        top: -1,
        right: 16,
        backgroundColor: theme.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    recommendedText: {
        color: theme.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    planTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    price: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.text,
    },
    period: {
        fontSize: 16,
        color: theme.textSecondary,
        marginLeft: 4,
        marginBottom: 4,
    },
    planDescription: {
        fontSize: 14,
        color: theme.textSecondary,
        marginBottom: 24,
    },
    planFeatures: {
        marginBottom: 24,
        gap: 12,
    },
    planFeature: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkmark: {
        marginRight: 8,
    },
    planFeatureText: {
        fontSize: 16,
        color: theme.text,
        flex: 1,
    },
    planButton: {
        marginTop: 'auto',
    },
});

export default PlanCard; 