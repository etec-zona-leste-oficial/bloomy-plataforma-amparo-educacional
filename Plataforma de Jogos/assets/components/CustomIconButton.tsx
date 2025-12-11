// assets/components/CustomIconButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  iconSize?: number;
}

export default function CustomIconButton({ 
  title, 
  onPress, 
  style, 
  textStyle,
  disabled = false,
  iconName,
  iconColor = '#fff',
  iconSize = 20,
}: CustomButtonProps) {
  const getDisabledStyle = () => {
    if (disabled) return styles.disabledButton;
    return {};
  };

  return (
    <Pressable 
      style={[styles.button, styles.primaryButton, getDisabledStyle(), style]} 
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentRow}>
        {iconName ? (
          <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.leftIcon} />
        ) : null}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#FF9800',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Bebas-Neue',
    textAlign: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  leftIcon: {
    marginRight: 6,
  },
});