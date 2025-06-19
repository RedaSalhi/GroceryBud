import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ListItem = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => onPress?.(item)}
    testID={`list-item-${item.id}`}
  >
    <Text style={styles.text}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  text: { fontSize: 16 },
});

export default ListItem;
