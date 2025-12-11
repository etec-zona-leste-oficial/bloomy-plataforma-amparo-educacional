import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../src/firebaseconfig';
import CustomButton from './CustomButton';
import PasswordField from './PasswordField';

type Props = {
  visible: boolean;
  targetRoute?: string | null;
  onRequestClose: () => void;
  onConfirmed?: (route?: string | null) => void;
  title?: string;
  subtitle?: string;
};

export default function PasswordConfirmModal({
  visible,
  targetRoute = null,
  onRequestClose,
  onConfirmed,
  title = 'Confirme sua senha',
  subtitle = 'Digite a senha da sua conta para continuar.',
}: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    // Se não há usuário logado, redireciona pelo callback (deverá redirecionar para login)
    if (!auth.currentUser) {
      Alert.alert('Não autenticado', 'Você precisa fazer login antes de continuar.');
      onRequestClose();
      onConfirmed?.('/login');
      return;
    }

    // Verifica se existe provedor de senha
    const hasPasswordProvider = auth.currentUser.providerData?.some((p) => p.providerId === 'password') ?? false;
    if (!hasPasswordProvider || !auth.currentUser.email) {
      Alert.alert('Reautenticação indisponível', 'Sua conta não suporta reautenticação por senha.');
      onRequestClose();
      return;
    }

    setVerifying(true);
    setError(null);
    try {
      const cred = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, cred);
      // sucesso
      setPassword('');
      onRequestClose();
      onConfirmed?.(targetRoute);
    } catch (e: any) {
      console.warn('Reauth failed', e);
      setError('Senha incorreta. Tente novamente.');
    } finally {
      setVerifying(false);
    }
  }

  function handleCancel() {
    setPassword('');
    setError(null);
    onRequestClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <PasswordField
            label="Senha"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder=""
            editable={!verifying}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.actions}>
            <View style={styles.actionItem}>
              <CustomButton
                title="Cancelar"
                onPress={handleCancel}
                variant="secondary"
                style={{ marginVertical: 0 }}
                disabled={verifying}
              />
            </View>
            <View style={styles.actionItem}>
              <CustomButton
                title={verifying ? 'Verificando...' : 'Confirmar'}
                onPress={handleConfirm}
                variant="primary"
                style={{ marginVertical: 0 }}
                loading={verifying}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: 'Bebas-Neue',
    color: '#7253B5',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
    fontFamily: 'Bebas-Neue',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    paddingLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  primary: {
    backgroundColor: '#FFBB56',
  },
  actionItem: {
    flex: 1,
    marginHorizontal: 6,
  },
});
