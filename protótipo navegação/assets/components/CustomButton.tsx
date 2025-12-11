// assets/components/CustomButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  iconSize?: number;
}

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle,
  disabled = false,
  loading = false,
  iconName,
  iconColor = '#fff',
  iconSize = 20,
}: CustomButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary': return styles.secondaryButton;
      case 'danger': return styles.dangerButton;
      case 'success': return styles.successButton;
      default: return styles.primaryButton;
    }
  };

  const getDisabledStyle = () => {
    if (disabled || loading) return styles.disabledButton;
    return {};
  };

  const content = loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : iconName ? (
    <View style={styles.contentRow}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </View>
  ) : (
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  );

  return (
    <Pressable 
      style={[styles.button, getVariantStyle(), getDisabledStyle(), style]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {content}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#FF9800',
  },
  secondaryButton: {
    backgroundColor: '#7253B5',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  successButton: {
    backgroundColor: '#4CAF50',
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
    width: '100%',
  },
  icon: {
    marginRight: 4,
  },
});