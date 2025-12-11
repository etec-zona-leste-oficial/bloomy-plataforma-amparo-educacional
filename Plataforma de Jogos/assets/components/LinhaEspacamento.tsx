import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface LinhaEspacamentoProps {
  color?: string;
  height?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export default function LinhaEspacamento({
  color = '#623DB3',
  height = 2,
  marginVertical = 12,
  style,
}: LinhaEspacamentoProps) {
  return (
    <View
      style={[
        styles.separator,
        { backgroundColor: color, height, marginVertical },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    alignSelf: 'stretch',
    borderRadius: 20,
  },
});
