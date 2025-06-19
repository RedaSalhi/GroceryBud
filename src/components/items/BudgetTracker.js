import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { calculateShoppingStats } from '../../utils/calculations';
import { formatPrice } from '../../utils/formatters';

const BudgetTracker = ({ items = [], budget = 0 }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const stats = calculateShoppingStats(items, budget);

  const getBudgetColor = () => {
    if (!budget) return theme.text;
    if (stats.remainingBudget < 0) return theme.error;
    if (stats.remainingBudget < budget * 0.2) return theme.warning;
    return theme.success;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Spent:</Text>
        <Text style={[styles.value, { color: theme.primary }]}>
          {formatPrice(stats.completedValue)}
        </Text>
      </View>
      {budget ? (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Budget:</Text>
            <Text style={styles.value}>{formatPrice(budget)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Remaining:</Text>
            <Text style={[styles.value, { color: getBudgetColor() }]}>
              {formatPrice(stats.remainingBudget)}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme.surface,
    borderRadius: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
  },
});

export default BudgetTracker;
