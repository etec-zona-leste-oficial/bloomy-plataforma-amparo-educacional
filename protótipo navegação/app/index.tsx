import { BackgroundWrapper } from '@/assets/components';
import { router, Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState, } from 'react';
import { Image, StyleSheet, View } from "react-native";
import CustomButton from '../assets/components/CustomButton';
import ScreenContainer from '../assets/components/ScreenContainer';
import { auth } from './firebaseconfig.js';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário no estado do componente
    });

    // Limpa o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  return (
    <BackgroundWrapper>
  <Stack.Screen options={{ headerShown: false }} />
  <ScreenContainer centerContent={true}>
        <View style={styles.container}>
          {user ? (
            <View>
              <Image
                source={require('../assets/images/LogoBloomySemFundo.png')}
                style={styles.logo}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Começar"
                  onPress={() => router.replace('/mainpage')}
                  variant="primary"
                />
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={require('../assets/images/LogoBloomySemFundo.png')}
                style={styles.logo}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Entrar"
                  onPress={() => router.replace('/signup')}
                  variant="secondary"
                />
              </View>
            </View>
          )}
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
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '50%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logo: {
    width: 400,
    height: 200,
  },
});


