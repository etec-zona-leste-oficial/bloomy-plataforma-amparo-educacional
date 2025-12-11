// assets/components/InputField.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TextInputProps, 
  StyleProp, 
  ViewStyle,
  TextStyle 
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export default function InputField({ 
  label, 
  value, 
  onChangeText, 
  containerStyle, 
  inputStyle,
  ...textInputProps 
}: InputFieldProps) {
  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        placeholderTextColor="#666" // Cor do placeholder
        {...textInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#7253B5',
    fontFamily: 'Bebas-Neue',
    fontSize: 20,
    marginBottom: 8,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    minHeight: 50,
    fontFamily: 'Bebas-Neue',
    fontSize: 18,
    color: '#000', // Cor do texto digitado (preto)
  },
});