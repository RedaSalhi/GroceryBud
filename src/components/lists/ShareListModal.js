import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const ShareListModal = ({ visible, onShare, onCancel }) => {
  const [email, setEmail] = useState('');

  const handleShare = () => {
    onShare?.(email.trim());
    setEmail('');
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.container}>
        <Input label="User email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Button title="Share" onPress={handleShare} />
        <Button title="Cancel" onPress={onCancel} variant="secondary" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12 },
});

export default ShareListModal;
