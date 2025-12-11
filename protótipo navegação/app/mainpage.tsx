import { NavigableItem, NavigationProvider } from '@/assets/components';
import CustomButton from '@/assets/components/CustomButton';
import ScreenContainer from '@/assets/components/ScreenContainer';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { default as React, useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from './firebaseconfig.js';

interface Materia {
  id: number;
  titulo: string;
  descricao: string;
  imagem: any;
  rota: string;
}

const materias: Materia[] = [
  {
    id: 1,
    titulo: 'Matemática',
    descricao: 'Explore números, álgebra, geometria e muito mais. Desenvolva seu raciocínio lógico!',
    imagem: require('@/assets/images/MatériaMatemática.png'),
    rota: '/matematica'
  },
  {
    id: 2,
    titulo: 'Português',
    descricao: 'Aprenda gramática, redação e interpretação de textos de forma divertida.',
    imagem: require('@/assets/images/MatériaPortuguês.png'),
    rota: '/mainpage'
  },
  {
    id: 3,
    titulo: 'Ciências',
    descricao: 'Descubra os mistérios da natureza, biologia, química e física.',
    imagem: require('@/assets/images/MatériaCiências.png'),
    rota: '/mainpage'
  },
  {
    id: 4,
    titulo: 'Inglês',
    descricao: 'Aprenda inglês de forma prática e divertida.',
    imagem: require('@/assets/images/MatériaInglês.png'),
    rota: '/mainpage'
  },
];

export default function MainPage() {
  const [user, setUser] = useState<User | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const animateTransition = (direction: 'next' | 'prev') => {
    // Fade out e slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -50 : 50,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Atualiza o índice
      if (direction === 'next') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % materias.length);
      } else {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? materias.length - 1 : prevIndex - 1
        );
      }
      // Fade in e slide de volta
      slideAnim.setValue(direction === 'next' ? 50 : -50);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => animateTransition('next');
  const handlePrev = () => animateTransition('prev');

  const currentMateria = materias[currentIndex];

  // Layout da navegação:
  // Linha 0: 1 botão (Começar - última unidade)
  // Linha 1: 3 itens (Seta esquerda, Carrossel, Seta direita)
  const navigationLayout = [
    [1],  // Botão Começar
    [3],  // Setas + Carrossel
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <NavigationProvider initialLayout={navigationLayout} enableBackNavigation={true}>
        <View style={pageStyles.pageBackground}>
          <ScreenContainer>

          <View style={pageStyles.ultimaUniContainer}>

            <View style={pageStyles.ultimaUniTitle}>
              <Text style={pageStyles.ultimaUniTitleText}>Última Unidade Acessada</Text>
            </View>

            <View style={pageStyles.ultimaUniBar} />

            <View style={pageStyles.ultimaUniContent}>
              <Text style={pageStyles.ultimaUniContentTitle}>Matemática</Text>
              <Text style={pageStyles.ultimaUniContentDesc}>Unidade 1:Primeiros passos, começando pelo básico.</Text>
            </View>

            <View style={pageStyles.ultimaUniButton}> 
              <NavigableItem
                row={0}
                col={0}
                onSelect={() => router.push('/FaseMatematica')}
              >
                <CustomButton
                    title="Começar"
                    onPress={() => router.push('/FaseMatematica')}
                    variant="primary"
                  />
              </NavigableItem>
            </View>  

          </View>

          <View style={pageStyles.materiasContainer}>
            <View style={pageStyles.materiasTitle}>
              <Text style={pageStyles.materiasTitleText}>Matérias</Text>
            </View>
            
            <View style={pageStyles.materiasContent}>
              {/* Seta Esquerda */}
              <NavigableItem
                row={1}
                col={0}
                onSelect={handlePrev}
                focusedStyle={{ borderRadius: '100%', paddingVertical: 10 }}
              >
                <Pressable 
                  style={pageStyles.carrosselSeta}
                  onPress={handlePrev}
                >
                  <Ionicons name="chevron-back" size={40} color="#FFFFFF" />
                </Pressable>
              </NavigableItem>

              {/* Conteúdo do Carrossel */}
              <View style={{ flex: 1 }}>
                <NavigableItem
                  row={1}
                  col={1}
                  onSelect={() => router.push(currentMateria.rota as any)}
                  focusedStyle={{ borderRadius: 15 }}
                >
                  <Animated.View
                    style={[
                      pageStyles.carrosselItem,
                      {
                        opacity: fadeAnim,
                        transform: [{ translateX: slideAnim }],
                      },
                    ]}
                  >
                  <Pressable 
                    style={{ flex: 1, flexDirection: 'row' }}
                    onPress={() => router.push(currentMateria.rota as any)}
                  >
                  {/* Seção de Textos (60%) */}
                  <View style={pageStyles.carrosselTextos}>
                    {/* Título (30%) */}
                    <View style={pageStyles.carrosselTituloContainer}>
                      <Text style={pageStyles.carrosselTitulo}>
                        {currentMateria.titulo}
                      </Text>
                    </View>
                    
                    {/* Descrição (70%) */}
                    <View style={pageStyles.carrosselDescricaoContainer}>
                      <Text style={pageStyles.carrosselDescricao}>
                        {currentMateria.descricao}
                      </Text>
                    </View>
                  </View>

                  {/* Seção de Imagem (40%) */}
                  <View style={pageStyles.carrosselImagemContainer}>
                    <Image 
                      source={currentMateria.imagem}
                      style={pageStyles.carrosselImagem}
                      resizeMode="cover"
                    />
                  </View>
                  </Pressable>
                </Animated.View>
              </NavigableItem>
              </View>

              {/* Seta Direita */}
              <NavigableItem
                row={1}
                col={2}
                onSelect={handleNext}
                focusedStyle={{ borderRadius: '100%', paddingVertical: 10}}
              >
                <Pressable 
                  style={pageStyles.carrosselSeta}
                  onPress={handleNext}
                >
                  <Ionicons name="chevron-forward" size={40} color="#FFFFFF" />
                </Pressable>
              </NavigableItem>
            </View>

          </View>


          </ScreenContainer>
        </View>
      </NavigationProvider>
    </>
  );
}

const pageStyles = StyleSheet.create({
  pageBackground: { flex: 1, backgroundColor: '#F9E9FF' },

  ultimaUniContainer: { height: 80, width: '70%',backgroundColor: '#FEECD6' , display: 'flex', flexDirection: 'row', margin: 'auto', borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5   },
  
  ultimaUniTitle: { flex: 0.2, justifyContent: 'center' },
  ultimaUniTitleText: { color: '#7253B5', fontSize: 20, marginLeft: 10,  textAlign: 'center', fontFamily: 'Bebas-Neue'},
  
  ultimaUniBar: { width: 2, backgroundColor: '#7253B5', marginHorizontal: 10 },

  ultimaUniContent: { flex: 1, justifyContent: 'center' },
  ultimaUniContentTitle: { color: '#7253B5', fontSize: 20, marginLeft: 10, fontFamily: 'LuckiestGuy-Regular'  },
  ultimaUniContentDesc: { color: '#7253B5', fontSize: 20, marginTop: 5, marginLeft: 10, fontFamily: 'Bebas-Neue' },

  ultimaUniButton: { flex: 0.3, justifyContent: 'center', alignItems: 'center', marginRight: 10 },


  materiasContainer: { flex: 1, borderRadius: 15 },

  materiasTitle: { flex: 0.2, justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
  materiasTitleText: { color: '#7253B5', fontSize: 30, fontFamily: 'LuckiestGuy-Regular' },
  
  materiasContent: { 
    flex: 0.8, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 10,
  },

  // Estilos do Carrossel
  carrosselSeta: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 25,
    marginHorizontal: 10,
  },

  carrosselItem: {
    flex: 1,
    height: 250,
    backgroundColor: '#FEECD6',
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  // Seção de Textos (60%)
  carrosselTextos: {
    flex: 0.6,
    padding: 15,
  },

  carrosselTituloContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },

  carrosselTitulo: {
    fontSize: 24,
    fontFamily: 'LuckiestGuy-Regular',
    color: '#7253B5',
  },

  carrosselDescricaoContainer: {
    flex: 0.7,
  },

  carrosselDescricao: {
    fontSize: 25,
    fontFamily: 'Bebas-Neue',
    color: '#7253B5',
    lineHeight: 22,
  },

  // Seção de Imagem (40%)
  carrosselImagemContainer: {
    flex: 0.4,
  },

  carrosselImagem: {
    width: '100%',
    height: '100%',
  },
});


