// assets/components/CustomButton.tsx
import React from 'react';
import { 
  Pressable, 
  Text, 
  StyleSheet, 
  StyleProp, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator 
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle,
  disabled = false,
  loading = false
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

  return (
    <Pressable 
      style={[styles.button, getVariantStyle(), getDisabledStyle(), style]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
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
});