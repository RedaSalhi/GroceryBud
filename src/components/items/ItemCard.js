import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

const ItemCard = ({ item, onToggle, onLongPress }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handlePress = () => onToggle?.(item);
  const handleLongPress = () => onLongPress?.(item);

  return (
    <View style={[styles.container, item.completed && styles.completedContainer]}>
      <TouchableOpacity 
        onPress={handlePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.checkboxContainer}
      >
        <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
          {item.completed && (
            <Feather name="check" size={16} color={theme.white} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onLongPress={handleLongPress}
        style={styles.contentContainer}
      >
        <View style={styles.row}>
          <Text style={[styles.name, item.completed && styles.completed]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.qty, item.completed && styles.completed]}>
            x{item.quantity || 1}
          </Text>
        </View>
        {item.price ? (
          <Text style={[styles.price, item.completed && styles.completed]}>
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: theme.surface,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: theme.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: theme.surface + '80',
  },
  checkboxContainer: {
    marginRight: 12,
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface,
  },
  checkedBox: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  name: { 
    fontSize: 16,
    color: theme.text,
    flex: 1,
    marginRight: 8,
  },
  completed: { 
    textDecorationLine: 'line-through', 
    color: theme.textSecondary,
    fontStyle: 'italic',
  },
  qty: { 
    fontSize: 14,
    color: theme.textSecondary,
    backgroundColor: theme.primaryLight + '40',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  price: { 
    fontSize: 16,
    fontWeight: '600',
    color: theme.primary,
    marginTop: 4,
  },
});

export default ItemCard;
