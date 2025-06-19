import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const AddListModal = ({ visible, onCreate, onCancel }) => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    onCreate?.(name.trim());
    setName('');
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.container}>
        <Input label="List name" value={name} onChangeText={setName} testID="list-name" />
        <Button title="Create" onPress={handleCreate} testID="create-list-btn" />
        <Button title="Cancel" onPress={onCancel} variant="secondary" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12 },
});

export default AddListModal;
