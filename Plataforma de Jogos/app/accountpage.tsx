// app/accountpage.jsx
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { PasswordField } from '../assets/components';
import AuthContainer from '../assets/components/AuthContainer';
import BackgroundWrapper from '../assets/components/BackgroundWrapper';
import CustomButton from '../assets/components/CustomButton';
import InputField from '../assets/components/InputField';
import ScreenContainer from '../assets/components/ScreenContainer';
import ScreenTitle from '../assets/components/ScreenTitle';
import useCustomFonts from '../assets/hooks/useCustomFonts';
import { useAuth } from '../src/authContext';
import {
  handleDeleteAccount,
  handleSignOut,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from '../src/authUser';

export default function AccountPage() {
  const fontsLoaded = useCustomFonts();
  const { user, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace('/login');
      } else {
        setName(user.displayName || '');
        setEmail(user.email || '');
      }
    }
    // Reage quando o usuário autentica/desautentica ou quando o auth termina de carregar
  }, [authLoading, user]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      if (name !== user.displayName) await updateUserName(name);
      if (email !== user.email) await updateUserEmail(email);
      if (password.length > 0) await updateUserPassword(password);

      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      setEditing(false);
      setPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar informações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            Alert.prompt(
              'Digite sua senha',
              'Confirme sua senha para deletar a conta.',
              async (inputPassword) => {
                try {
                  await handleDeleteAccount(inputPassword);
                  router.replace('/signup');
                } catch (error) {
                  Alert.alert('Erro', 'Falha ao deletar conta. Tente novamente.');
                }
              }
            );
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await handleSignOut();
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer logout. Tente novamente.');
    }
  };

  // Exibe nada enquanto fontes ou auth estão carregando para evitar flicker
  if (!fontsLoaded || authLoading) return null;
  if (!user) return null;

  return (
    <BackgroundWrapper>
      <ScreenContainer>
        <View style={styles.container}>
          <ScreenTitle style={styles.title}>Minha Conta</ScreenTitle>

          <AuthContainer>
            <InputField
              label="Nome"
              value={name}
              editable={editing}
              onChangeText={setName}
              placeholder="Digite seu nome"
            />

            <InputField
              label="Email"
              value={email}
              editable={editing}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Digite seu email"
            />

            <PasswordField
              label="Senha"
              value={password}
              editable={editing}
              onChangeText={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={editing ? "Nova senha (deixe em branco para manter)" : "••••••••"}
            />
          </AuthContainer>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={editing ? 'Salvar Alterações' : 'Editar Informações'}
              onPress={editing ? handleSave : () => setEditing(true)}
              variant={editing ? 'success' : 'primary'}
              loading={loading}
              disabled={loading}
            />

            <CustomButton
              title="Deletar Conta"
              onPress={confirmDelete}
              variant="danger"
            />

            <CustomButton
              title="Logout"
              onPress={handleLogout}
              variant="secondary"
            />
          </View>
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
  title: {
    fontSize: 32,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
});