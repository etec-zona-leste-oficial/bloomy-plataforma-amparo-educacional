// assets/components/ScreenTitle.tsx
import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface ScreenTitleProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export default function ScreenTitle({ children, style }: ScreenTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Bebas-Neue',
  },
});