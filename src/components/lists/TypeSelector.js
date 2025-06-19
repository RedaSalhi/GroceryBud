import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LIST_TYPES } from '../../utils/constants';

const TypeSelector = ({ selectedType, onSelectType }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const listTypes = [
        { key: LIST_TYPES.GROCERY, label: '🛒 Grocery', description: 'Weekly groceries and food items' },
        { key: LIST_TYPES.SHOPPING, label: '🛍️ Shopping', description: 'General shopping and retail items' },
        { key: LIST_TYPES.MEAL_PLAN, label: '🍽️ Meal Plan', description: 'Plan meals and ingredients' },
        { key: LIST_TYPES.CUSTOM, label: '📝 Custom', description: 'Create your own custom list' },
    ];

    return (
        <View style={styles.typeSelector}>
            <Text style={styles.label}>
                List Type
            </Text>
            <View style={styles.typeOptions}>
                {listTypes.map((type) => (
                    <TouchableOpacity
                        key={type.key}
                        style={[
                            styles.typeOption,
                            {
                                backgroundColor: selectedType === type.key ? theme.primary : theme.surface,
                                borderColor: selectedType === type.key ? theme.primary : theme.border,
                            }
                        ]}
                        onPress={() => onSelectType(type.key)}
                    >
                        <Text style={[
                            styles.typeLabel,
                            { color: selectedType === type.key ? theme.white : theme.text }
                        ]}>
                            {type.label}
                        </Text>
                        <Text style={[
                            styles.typeDescription,
                            { color: selectedType === type.key ? 'rgba(255,255,255,0.8)' : theme.textSecondary }
                        ]}>
                            {type.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    typeSelector: {
        marginTop: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: theme.text,
    },
    typeOptions: {
        gap: 12,
    },
    typeOption: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    typeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    typeDescription: {
        fontSize: 14,
    },
});

export default TypeSelector; 