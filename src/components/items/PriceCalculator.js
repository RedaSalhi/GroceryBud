import React from 'react';
import { Text } from 'react-native';
import { formatPrice } from '../../utils/formatters';

const PriceCalculator = ({ price = 0, quantity = 1 }) => {
  const total = (parseFloat(price) || 0) * (parseFloat(quantity) || 1);
  return <Text>{formatPrice(total)}</Text>;
};

export default PriceCalculator;
