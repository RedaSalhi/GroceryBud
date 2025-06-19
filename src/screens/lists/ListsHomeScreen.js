import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ListCard from '../../components/lists/ListCard';
import EmptyState from '../../components/lists/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useLists } from '../../context/ListsContext';
import { useTheme } from '../../context/ThemeContext';
import { formatDate, formatPrice } from '../../utils/formatters';

const ListsHomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const { user } = useAuth();
  const { 
    lists, 
    isLoading, 
    error, 
    deleteList, 
    refreshLists,
    getTotalListsCount,
    getTotalItemsCount,
    getTotalValue 
  } = useLists();
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    // Set up navigation header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleCreateList}
        >
          <Feather name="plus" size={24} color={theme.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setDeleteError(null);
    await refreshLists();
    setRefreshing(false);
  };

  const handleCreateList = () => {
    navigation.navigate('CreateList');
  };

  const handleListPress = (list) => {
    navigation.navigate('ListDetails', { 
      listId: list.id, 
      listName: list.name 
    });
  };

  const handleDeleteList = async (listId) => {
    setDeleteError(null);
    const result = await deleteList(listId);
    if (!result.success) {
      setDeleteError(result.message);
    }
  };

  const renderListItem = ({ item }) => (
    <ListCard
      list={item}
      onPress={handleListPress}
      onDelete={handleDeleteList}
    />
  );

  const renderHeader = () => {
    if (lists.length === 0) return null;

    const totalLists = getTotalListsCount();
    const totalItems = getTotalItemsCount();
    const totalValue = getTotalValue();

    return (
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>
          Your Shopping Summary
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {totalLists}
            </Text>
            <Text style={styles.statLabel}>
              Lists
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {totalItems}
            </Text>
            <Text style={styles.statLabel}>
              Items
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {formatPrice(totalValue)}
            </Text>
            <Text style={styles.statLabel}>
              Total Value
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner text="Loading your lists..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <Button
            title="Try Again"
            onPress={handleRefresh}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        {deleteError && (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{deleteError}</Text>
            </View>
        )}
      {lists.length === 0 ? (
        <EmptyState onCreateList={handleCreateList} />
      ) : (
        <FlatList
          data={lists}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerButton: {
        marginRight: 16,
    },
    statsContainer: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.border,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.primary,
    },
    statLabel: {
        fontSize: 14,
        color: theme.textSecondary,
        marginTop: 4,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        color: theme.error,
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 16,
    },
});

export default ListsHomeScreen;