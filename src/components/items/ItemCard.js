import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const ItemCard = ({ item, onToggle, onLongPress }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handlePress = () => onToggle?.(item);
  const handleLongPress = () => onLongPress?.(item);

  return (
    <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress} style={styles.container} testID={`item-${item.id}`}>
      <View style={styles.row}>
        <Text style={[styles.name, item.completed && styles.completed]}>{item.name}</Text>
        <Text style={styles.qty}>x{item.quantity || 1}</Text>
      </View>
      {item.price ? (
        <Text style={styles.price}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  name: { 
    fontSize: 16,
    color: theme.text,
    flex: 1,
  },
  completed: { 
    textDecorationLine: 'line-through', 
    color: theme.textSecondary,
    fontStyle: 'italic',
  },
  qty: { 
    fontSize: 16,
    color: theme.textSecondary,
    marginLeft: 16,
  },
  price: { 
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginLeft: 16,
  },
});

export default ItemCard;
