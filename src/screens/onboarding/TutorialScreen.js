import React, { useState, useRef } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import TutorialSlide from '../../components/onboarding/TutorialSlide';

const tutorialData = [
  {
    id: '1',
    title: 'Create Smart Lists',
    description: 'Build shopping lists with intelligent categorization and item suggestions to make shopping more efficient.',
  },
  {
    id: '2',
    title: 'Track Your Budget',
    description: 'Set budgets for your shopping trips and get real-time updates on your spending as you add items.',
  },
  {
    id: '3',
    title: 'Share with Others',
    description: 'Collaborate with family and friends by sharing your lists and shopping together in real-time.',
  },
  {
    id: '4',
    title: 'Ready to Start!',
    description: 'You\'re all set! Let\'s create your account and start building your first shopping list.',
  },
];

const TutorialScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);
  const flatListRef = useRef(null);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < tutorialData.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await completeOnboarding();
    navigation.navigate('Auth');
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };
  
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const isLastSlide = currentIndex === tutorialData.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={tutorialData}
          renderItem={({ item }) => <TutorialSlide item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          bounces={false}
        />

        <View style={styles.pagination}>
          {tutorialData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex ? theme.primary : theme.border,
                }
              ]}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            <Button
              title="Skip"
              onPress={handleSkip}
              variant="ghost"
              style={[styles.button, styles.skipButton, isLastSlide && styles.hidden]}
              testID="tutorial-skip-button"
            />
            
            <Button
              title={isLastSlide ? "Get Started" : "Next"}
              onPress={handleNext}
              style={[styles.button, styles.nextButton]}
              testID="tutorial-next-button"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        flex: 1,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
    },
    skipButton: {
        marginRight: 8,
    },
    nextButton: {
        marginLeft: 8,
    },
    hidden: {
        opacity: 0,
    }
});

export default TutorialScreen;