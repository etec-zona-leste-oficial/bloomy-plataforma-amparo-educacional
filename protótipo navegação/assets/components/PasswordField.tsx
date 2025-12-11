// assets/components/PasswordField.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  TextStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void; // Tipo simplificado
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
}

export default function PasswordField({ 
  label, 
  value, 
  onChangeText, 
  showPassword, 
  setShowPassword, 
  containerStyle,
  inputStyle,
  editable = true,
  placeholder 
}: PasswordFieldProps) {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Corrigido: usando o valor atual diretamente
  };

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={editable}
          onChangeText={onChangeText}
          style={[styles.passwordInput, inputStyle]}
          secureTextEntry={!showPassword} // Isso deve funcionar agora
          placeholderTextColor="#666" // Cor do placeholder
        />
        <Pressable onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>
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
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    minHeight: 50,
    paddingVertical: 15,
    fontFamily: 'Bebas-Neue',
    fontSize: 18,
    color: '#000', // Cor do texto digitado (preto)
  },
  eyeIcon: {
    marginLeft: 10,
    color: '#888',
  },
});