import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const slideIcons = {
    'Create Smart Lists': 'edit-3',
    'Track Your Budget': 'dollar-sign',
    'Share with Others': 'share-2',
    'Ready to Start!': 'rocket',
};

const TutorialSlide = ({ item }) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const iconName = slideIcons[item.title] || 'check-circle';

    return (
        <View style={styles.slide}>
            <View style={styles.slideContent}>
                <Feather name={iconName} size={80} color={theme.primary} />
                <Text style={styles.slideTitle}>
                    {item.title}
                </Text>
                <Text style={styles.slideDescription}>
                    {item.description}
                </Text>
            </View>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    slide: {
        width: screenWidth,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideContent: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 60,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
        marginTop: 32,
        marginBottom: 16,
        textAlign: 'center',
    },
    slideDescription: {
        fontSize: 16,
        color: theme.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
});

export default TutorialSlide; 