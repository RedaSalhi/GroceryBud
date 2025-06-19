import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const AddItemModal = ({ visible, onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    const item = {
      name: name.trim(),
      quantity: parseFloat(quantity) || 1,
      price: parseFloat(price) || 0,
    };
    onAdd?.(item);
    setName('');
    setQuantity('1');
    setPrice('');
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.container}>
        <Input label="Name" value={name} onChangeText={setName} testID="item-name" />
        <Input
          label="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          testID="item-qty"
        />
        <Input
          label="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          testID="item-price"
        />
        <Button title="Add" onPress={handleAdd} testID="add-item-btn" />
        <Button title="Cancel" onPress={onCancel} variant="secondary" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12 },
});

export default AddItemModal;
