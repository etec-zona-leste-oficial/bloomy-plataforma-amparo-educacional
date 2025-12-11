import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react'; // <--- Adicionado useEffect
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { PasswordConfirmModal } from '../assets/components';
import { AuthProvider, useAuth } from '../src/authContext';
import { auth } from '../src/firebaseconfig';
import { NotificationsSettingsProvider } from '../src/notifications/NotificationsSettingsContext';

// Importações necessárias para o Login Anônimo
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

function LayoutInner() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'LuckiestGuy-Regular': require('../assets/fonts/LuckiestGuy-Regular.ttf'),
  });
  const { user } = useAuth();
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [targetRoute, setTargetRoute] = React.useState<string | null>(null);

  // --- LÓGICA DE LOGIN ANÔNIMO AUTOMÁTICO ---
  useEffect(() => {
    // Escuta as mudanças de estado da autenticação
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ Usuário autenticado (UID):", currentUser.uid);
      } else {
        console.log("⚠️ Nenhum usuário detectado. Iniciando login anônimo...");
        // Se não houver usuário, faz o login anônimo
        signInAnonymously(auth)
          .then((userCredential) => {
            console.log("👤 Login anônimo realizado com sucesso! UID:", userCredential.user.uid);
          })
          .catch((error) => {
            console.error("❌ Erro ao tentar login anônimo:", error);
          });
      }
    });

    // Limpa o listener quando o componente desmontar
    return () => unsubscribe();
  }, []);
  // ------------------------------------------

  // Não renderiza até fontes carregarem (comportamento natural do Expo)
  if (!fontsLoaded) {
    return null;
  }

  function openConfirmPassword(route: string) {
    // Se não há usuário logado, redireciona para login
    if (!user) {
      router.push('/login');
      return;
    }

    // Verifica se o provedor de autenticação permite senha (email/password)
    const hasPasswordProvider = auth.currentUser?.providerData?.some((p) => p.providerId === 'password') ?? false;
    if (!hasPasswordProvider || !auth.currentUser?.email) {
      Alert.alert('Reautenticação indisponível', 'Sua conta não suporta reautenticação por senha.');
      return;
    }

    setTargetRoute(route);
    setConfirmModalVisible(true);
  }

  function handleModalClose() {
    setConfirmModalVisible(false);
    setTargetRoute(null);
  }

  function handleConfirmed(route?: string | null) {
    if (route) router.push(route as any);
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: { backgroundColor: '#BA68C8' },
          headerTintColor: '#fff',
          headerTitle: () => (
            <Image
              source={require('../assets/images/LogoBloomySemFundo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          ),
          contentStyle: { backgroundColor: '#F9E9FF' }, // Fundo sólido para telas sem imagem
        }}
      >
        {/* Index agora sem header */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        {/* Mainpage com header customizado */}
        <Stack.Screen
          name="mainpage"
          options={{
            headerShown: true,
            headerLeft: () =>
              router.canGoBack() ? (
                <Pressable onPress={() => router.back()}>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color="#fff"
                    style={styles.headerIcon}
                  />
                </Pressable>
              ) : null,
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Pressable
                  onPress={() => openConfirmPassword('/settingspage')}
                  style={({ pressed }) => [styles.circleButton, pressed && { opacity: 0.8 }]}
                >
                  <FontAwesome name="cog" size={20} color="#fff" />
                </Pressable>
                <Pressable
                  onPress={() => openConfirmPassword('/accountpage')}
                  style={({ pressed }) => [styles.circleButton, pressed && { opacity: 0.8 }]}
                >
                  <Ionicons name="person-sharp" size={20} color="#fff" />
                </Pressable>
              </View>
            ),
          }}
        />

        {/* Tela de Login (sem header) */}
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerShown: false,
            headerLeft: () =>
              router.canGoBack() ? (
                <Pressable onPress={() => router.back()}>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color="black"
                    style={styles.headerIcon}
                  />
                </Pressable>
              ) : null,
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Pressable onPress={() => openConfirmPassword('/settingspage')}>
                  <FontAwesome
                    name="cog"
                    size={24}
                    color="black"
                    style={styles.headerIcon}
                  />
                </Pressable>
                <Pressable onPress={() => openConfirmPassword('/accountpage')}>
                  <Ionicons
                    name="person-sharp"
                    size={24}
                    color="black"
                    style={styles.headerIcon}
                  />
                </Pressable>
              </View>
            ),
          }}
        />
  
        {/* Tela de Cadastro (sem header) */}
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <PasswordConfirmModal
        visible={confirmModalVisible}
        targetRoute={targetRoute}
        onRequestClose={handleModalClose}
        onConfirmed={handleConfirmed}
      />
    </>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <NotificationsSettingsProvider>
        <LayoutInner />
      </NotificationsSettingsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 5,
  },
  headerLogo: {
    width: 200,
    height: 50,
    padding: 10,
    marginBottom: 5,
  },
  circleButton: {
    backgroundColor: '#FFBB56',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});