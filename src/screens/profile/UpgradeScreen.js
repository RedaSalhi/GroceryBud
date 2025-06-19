import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import FeatureRow from '../../components/upgrade/FeatureRow';
import PlanCard from '../../components/upgrade/PlanCard';

const UpgradeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);

  const features = [
    {
      title: 'Unlimited Lists',
      description: 'Create as many shopping lists as you need',
      free: '3 lists',
      premium: 'Unlimited',
    },
    {
      title: 'List Sharing',
      description: 'Share lists with family and friends',
      free: '❌',
      premium: '✅',
    },
    {
      title: 'Advanced Analytics',
      description: 'Detailed spending insights and trends',
      free: '❌',
      premium: '✅',
    },
    {
      title: 'Price History',
      description: 'Track price changes over time',
      free: '❌',
      premium: '✅',
    },
    {
      title: 'Cloud Sync',
      description: 'Access your lists on all devices',
      free: 'Basic',
      premium: 'Advanced',
    },
    {
      title: 'Smart Suggestions',
      description: 'AI-powered shopping recommendations',
      free: '❌',
      premium: '✅',
    },
  ];

  const handleUpgradeToPremium = () => {
    Alert.alert(
      'Upgrade to Premium',
      'This will redirect you to the payment screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // In a real app, this would open payment flow
            Alert.alert('Coming Soon', 'Payment integration will be available soon!');
          }
        },
      ]
    );
  };

  const handleUpgradeToFamily = () => {
    Alert.alert(
      'Upgrade to Family',
      'This will redirect you to the payment screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // In a real app, this would open payment flow
            Alert.alert('Coming Soon', 'Payment integration will be available soon!');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Upgrade to Premium
          </Text>
          <Text style={styles.subtitle}>
            Unlock powerful features to supercharge your shopping experience
          </Text>
        </View>

        {/* Pricing Plans */}
        <View style={styles.plansSection}>
          <PlanCard
            title="Premium"
            price="4.99"
            period="month"
            description="Perfect for individuals and small families"
            recommended={true}
            features={[
              'Unlimited shopping lists',
              'Share lists with up to 5 people',
              'Advanced analytics and insights',
              'Price history tracking',
              'Priority customer support',
            ]}
            onPress={handleUpgradeToPremium}
          />
          
          <PlanCard
            title="Family"
            price="9.99"
            period="month"
            description="Best for large families and groups"
            features={[
              'Everything in Premium',
              'Share lists with unlimited people',
              'Family expense tracking',
              'Shared family budget',
            ]}
            onPress={handleUpgradeToFamily}
          />
        </View>

        {/* Feature Comparison */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>
            Free vs Premium
          </Text>
          
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonLabel}>
              Features
            </Text>
            <Text style={[styles.comparisonLabel, { textAlign: 'center' }]}>
              Free
            </Text>
            <Text style={[styles.comparisonLabel, { color: theme.primary, textAlign: 'center' }]}>
              Premium
            </Text>
          </View>
          
          {features.map((feature, index) => (
            <FeatureRow key={index} feature={feature} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.textSecondary,
        textAlign: 'center',
    },
    plansSection: {
        paddingHorizontal: 16,
    },
    plansTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 24,
    },
    comparisonSection: {
        backgroundColor: theme.surface,
        borderRadius: 16,
        margin: 16,
        padding: 16,
    },
    comparisonTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 16,
    },
    comparisonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    comparisonLabel: {
        fontSize: 14,
        color: theme.textSecondary,
        fontWeight: '600',
        flex: 1,
    },
});

export default UpgradeScreen;