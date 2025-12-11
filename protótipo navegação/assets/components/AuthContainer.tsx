// assets/components/AuthContainer.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface AuthContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function AuthContainer({ children, style }: AuthContainerProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFBB56',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});