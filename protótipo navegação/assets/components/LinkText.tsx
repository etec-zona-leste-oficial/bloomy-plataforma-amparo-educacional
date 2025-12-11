// assets/components/LinkText.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface LinkTextProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
}

export default function LinkText({ text, onPress, style }: LinkTextProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.link, style]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Bebas-Neue',
  },
});