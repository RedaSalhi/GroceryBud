import React from 'react';
import { Modal as RNModal, View, StyleSheet } from 'react-native';

const Modal = ({ visible, onRequestClose, children }) => (
  <RNModal
    transparent
    animationType="slide"
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View style={styles.overlay}>
      <View style={styles.content}>{children}</View>
    </View>
  </RNModal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  content: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Modal;
