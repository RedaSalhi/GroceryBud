import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import ItemCard from '../../components/items/ItemCard';
import AddItemModal from '../../components/items/AddItemModal';
import BudgetTracker from '../../components/items/BudgetTracker';
import Button from '../../components/common/Button';
import { useLists } from '../../context/ListsContext';
import { useTheme } from '../../context/ThemeContext';

const ListDetailsScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const { getListById, addItem, removeItem, toggleItem } = useLists();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState(null);

  const list = getListById(listId) || { items: [] };

  useLayoutEffect(() => {
    navigation.setOptions({ title: list.name || 'List Details' });
  }, [navigation, list.name]);

  const handleAddItem = async (item) => {
    setError(null);
    const result = await addItem(listId, item);
    if (result.success) {
        setShowAdd(false);
    } else {
        setError(result.message || 'Failed to add item.');
    }
  };

  const handleToggle = async (item) => {
    setError(null);
    const result = await toggleItem(listId, item.id);
    if (!result.success) {
        setError(result.message || 'Failed to update item.');
    }
  };
  
  const handleDelete = (item) => {
    Alert.alert('Delete Item', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            setError(null);
            const result = await removeItem(listId, item.id);
            if (!result.success) {
                setError(result.message || 'Failed to remove item.');
            }
          } 
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <ItemCard 
        item={item} 
        onToggle={handleToggle} 
        onLongPress={handleDelete}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list.items || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.title} testID="list-title">
              {list.name}
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <BudgetTracker items={list.items} budget={list.budget} />
          </View>
        )}
      />
      <View style={styles.footer}>
        <Button title="Add Item" onPress={() => setShowAdd(true)} fullWidth/>
      </View>
      <AddItemModal visible={showAdd} onAdd={handleAddItem} onCancel={() => setShowAdd(false)} />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: theme.background,
  },
  content: { 
    padding: 16,
    paddingBottom: 100,
  },
  header: { 
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    paddingBottom: 16,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: theme.text,
  },
  footer: { 
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.background,
  },
  errorText: {
    color: theme.error,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ListDetailsScreen;
