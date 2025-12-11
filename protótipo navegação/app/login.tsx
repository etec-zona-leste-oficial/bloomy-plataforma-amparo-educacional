// app/login.jsx
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { PasswordField } from '../assets/components';
import AuthContainer from '../assets/components/AuthContainer';
import BackgroundWrapper from '../assets/components/BackgroundWrapper';
import CustomButton from '../assets/components/CustomButton';
import InputField from '../assets/components/InputField';
import LinkText from '../assets/components/LinkText';
import ScreenContainer from '../assets/components/ScreenContainer';
import ScreenTitle from '../assets/components/ScreenTitle';
import useCustomFonts from '../assets/hooks/useCustomFonts';
import { useAuth } from '../src/authContext';
import { handleLogin } from '../src/authUser';

export default function LoginPage() {
  const fontsLoaded = useCustomFonts();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      router.replace('/mainpage');
    }
  }, [user]);

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await handleLogin(email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.replace('/mainpage');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <BackgroundWrapper>
  <ScreenContainer centerContent={true}>
        <AuthContainer>
          <ScreenTitle>Login</ScreenTitle>
          
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Digite seu email"
          />

          <PasswordField
            label="Senha"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="Digite sua senha"
          />
        </AuthContainer>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Entrar" 
            onPress={handleLoginPress}
            loading={loading}
            disabled={loading}
          />
          
          <LinkText
            text="Não possui uma conta? Cadastre-se"
            onPress={() => router.replace('/signup')}
          />
        </View>
      </ScreenContainer>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: '50%',
    maxWidth: 200,
    marginTop: 10,
  },
});