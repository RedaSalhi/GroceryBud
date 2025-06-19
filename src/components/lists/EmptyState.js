import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const EmptyState = ({ onCreateList }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
                No Lists Yet
            </Text>
            <Text style={styles.emptySubtitle}>
                Create your first shopping list to get started
            </Text>
            <Button
                title="Create Your First List"
                onPress={onCreateList}
                style={styles.emptyButton}
            />
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 48,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 16,
    },
    emptySubtitle: {
        fontSize: 16,
        color: theme.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    emptyButton: {
        minWidth: 200,
    },
});

export default EmptyState; 