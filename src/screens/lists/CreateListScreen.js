import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import TypeSelector from '../../components/lists/TypeSelector';
import { useLists } from '../../context/ListsContext';
import { useTheme } from '../../context/ThemeContext';
import { ITEM_CATEGORIES, LIST_TYPES } from '../../utils/constants';
import { validateListName } from '../../utils/validation';

const CreateListScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    type: LIST_TYPES.GROCERY,
    category: ITEM_CATEGORIES.OTHER,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  
  const { createList } = useLists();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
    setCreateError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    const nameValidation = validateListName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message;
    }

    if (formData.budget) {
      const budget = parseFloat(formData.budget);
      if (isNaN(budget) || budget < 0) {
        newErrors.budget = 'Please enter a valid budget amount';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateList = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setCreateError(null);

    try {
      const listData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        budget: formData.budget ? parseFloat(formData.budget) : 0,
        type: formData.type,
        category: formData.category,
      };

      const result = await createList(listData);
      
      if (result.success && result.list) {
        navigation.replace('ListDetails', { 
            listId: result.list.id, 
            listName: result.list.name 
        });
      } else {
        setCreateError(result.message || 'Failed to create list.');
      }
    } catch (error) {
      setCreateError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Create New List
            </Text>
            <Text style={styles.subtitle}>
              Set up your shopping list with a name, budget, and type
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="List Name *"
              placeholder="e.g., Weekly Groceries"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              error={errors.name}
              autoCapitalize="words"
              returnKeyType="next"
              testID="create-list-name-input"
            />

            <Input
              label="Description (Optional)"
              placeholder="Add a description for your list"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={3}
              returnKeyType="next"
              testID="create-list-description-input"
            />

            <Input
              label="Budget (Optional)"
              placeholder="0.00"
              value={formData.budget}
              onChangeText={(value) => handleInputChange('budget', value)}
              error={errors.budget}
              keyboardType="decimal-pad"
              returnKeyType="done"
              leftIcon={
                <Text style={styles.currencySymbol}>
                  $
                </Text>
              }
              testID="create-list-budget-input"
            />

            <TypeSelector selectedType={formData.type} onSelectType={(type) => handleInputChange('type', type)} />
          </View>

          <View style={styles.footer}>
            {createError && (
              <Text style={styles.errorText}>{createError}</Text>
            )}
            <Button
              title="Create List"
              onPress={handleCreateList}
              loading={isLoading}
              disabled={!formData.name.trim()}
              fullWidth
              style={styles.createButton}
              testID="create-list-submit-button"
            />

            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="ghost"
              style={styles.cancelButton}
              testID="create-list-cancel-button"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.textSecondary,
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
    },
    currencySymbol: {
        color: theme.textSecondary,
        fontSize: 16,
        marginRight: 8,
    },
    footer: {
        paddingTop: 16,
    },
    createButton: {
        marginBottom: 8,
    },
    cancelButton: {
        alignSelf: 'center',
    },
    errorText: {
      color: theme.error,
      textAlign: 'center',
      marginBottom: 16,
    },
});

export default CreateListScreen;