import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateShoppingStats } from '../../utils/calculations';
import { formatPrice } from '../../utils/formatters';

const BudgetTracker = ({ items = [], budget = 0 }) => {
  const stats = calculateShoppingStats(items, budget);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spent: {formatPrice(stats.completedValue)}</Text>
      {budget ? (
        <>
          <Text style={styles.text}>Budget: {formatPrice(budget)}</Text>
          <Text style={styles.text}>Remaining: {formatPrice(stats.remainingBudget)}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 4 },
  text: { fontSize: 14 },
});

export default BudgetTracker;
