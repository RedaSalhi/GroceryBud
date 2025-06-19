import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { formatDate, formatPrice } from '../../utils/formatters';

const ListCard = ({ list, onPress, onDelete }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const completionPercentage = list.totalItems > 0 
    ? Math.round((list.completedItems / list.totalItems) * 100) 
    : 0;

  const handleLongPress = () => {
    Alert.alert(
      'List Options',
      `What would you like to do with "${list.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(list.id) },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => onPress(list)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.listCardHeader}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <Text style={styles.listDate}>
          {formatDate(list.updatedAt, 'short')}
        </Text>
      </View>

      <View style={styles.listCardContent}>
        <View style={styles.listStats}>
          <Text style={styles.itemCount}>
            {list.completedItems}/{list.totalItems} items
          </Text>
          {list.totalValue > 0 && (
            <Text style={styles.totalValue}>
              {formatPrice(list.totalValue)}
            </Text>
          )}
        </View>

        {list.totalItems > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${completionPercentage}%`,
                    backgroundColor: completionPercentage === 100 ? theme.success : theme.primary,
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {completionPercentage}%
            </Text>
          </View>
        )}

        {list.isShared && (
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Shared</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme) => StyleSheet.create({
    listCard: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: theme.border,
    },
    listCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        flexShrink: 1,
    },
    listDate: {
        fontSize: 12,
        color: theme.textSecondary,
    },
    listCardContent: {
        // No specific styles needed here now
    },
    listStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemCount: {
        fontSize: 14,
        color: theme.textSecondary,
    },
    totalValue: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBar: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.border,
        marginRight: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        color: theme.textSecondary,
    },
    badges: {
        flexDirection: 'row',
        marginTop: 8,
    },
    badge: {
        backgroundColor: theme.primary,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    badgeText: {
        color: theme.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default ListCard;
