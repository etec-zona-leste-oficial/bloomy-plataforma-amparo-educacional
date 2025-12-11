import { CustomButton, FaseCard, ScreenContainer } from "@/assets/components";
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import { get, getDatabase, ref } from "firebase/database";
import { useAuth } from '../src/authContext';
import { app } from '../src/firebaseconfig';

const db = getDatabase(app);

// -------------------------------------------------------------------------
// 2. Mapeamento de Fases (Define qual jogo é liberado por qual)
const FASES_INGLES = [
    { 
        id: 'nuvem_invader', 
        numero: 1, 
        titulo: 'Level 1', 
        descricao: 'Words', 
        prerequisiteGameId: null, 
    },
    { 
        id: 'verbo_ingles', 
        numero: 2, 
        titulo: 'Level 2', 
        descricao: 'Verbs', 
        prerequisiteGameId: 'nuvem_invader', 
    },
    // Se você adicionar mais fases, a última do array será a que desbloqueia o Teste.
];
// -------------------------------------------------------------------------

export default function FaseIngles() {
    const { user } = useAuth();
    const [completedGames, setCompletedGames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    const currentUserId = user?.uid; 
    const isFocused = useIsFocused();
    
    // NOVO: Identifica o ID da última fase da unidade
    const LAST_GAME_ID = FASES_INGLES[FASES_INGLES.length - 1]?.id; 

    // Função para buscar os scores
    const fetchUserProgress = async () => {
        if (!currentUserId) {
            setLoading(false);
            return;
        }

        try {
            const scoresRef = ref(db, 'scores');
            const snapshot = await get(scoresRef);
            const userCompletedGames = new Set<string>();

            if (snapshot.exists()) {
                snapshot.forEach((gameSnapshot) => {
                    gameSnapshot.forEach((scoreSnapshot) => {
                        const scoreData = scoreSnapshot.val();
                        
                        if (scoreData.userId === currentUserId && scoreData.completed === true) {
                            userCompletedGames.add(scoreData.gameId);
                        }
                    });
                });
            }

            setCompletedGames(Array.from(userCompletedGames));
        } catch (error) {
            console.error("Erro ao buscar progresso:", error);
            Alert.alert("Erro", "Não foi possível carregar seu progresso.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            fetchUserProgress();
        }
    }, [currentUserId, isFocused]);

    // Lógica para verificar se o jogo está liberado
    const isGameLocked = (gameId: string, prerequisiteGameId: string | null): boolean => {
        if (!prerequisiteGameId) {
            return false;
        }
        return !completedGames.includes(prerequisiteGameId);
    };
    
    // Função para navegar para o jogo
    const navigateToGame = (gameId: string, isLocked: boolean) => {
        if (isLocked) {
            Alert.alert("Bloqueado!", "Você deve completar a fase anterior para liberar esta.");
            return;
        }
        router.push({
            pathname: '/GamePage',
            params: { gameId: gameId }, 
        });
    };
    
    // NOVO: Lógica de bloqueio e handler para o botão Teste
    const isTestLocked = !completedGames.includes(LAST_GAME_ID);
    
    const handleTestPress = () => {
        if (isTestLocked) {
             Alert.alert(
                "Teste Bloqueado", 
                `Você deve completar o Level ${FASES_INGLES.length} (${FASES_INGLES[FASES_INGLES.length - 1].titulo}) antes de iniciar o Teste.`
            );
            return;
        }
        router.push('/testepage');
    };


    if (loading) {
        return (
            <ScreenContainer>
                <View style={pageStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7253B5" />
                    <Text>Carregando progresso...</Text>
                </View>
            </ScreenContainer>
        );
    }
    
    if (!currentUserId) {
           return <Text style={{ padding: 20 }}>Por favor, faça login para ver seu progresso nas fases.</Text>;
    }


    return (
        <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidade 1 - Língua Inglesa</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <View style={pageStyles.cardsContainer}>
                        {FASES_INGLES.map((fase) => {
                            const locked = isGameLocked(fase.id, fase.prerequisiteGameId);
                            
                            const statusDescricao = locked 
                                ? 'Bloqueada' 
                                : (completedGames.includes(fase.id) ? 'Concluída ✅' : fase.descricao);

                            return (
                                <FaseCard
                                    key={fase.id}
                                    numero={fase.numero}
                                    titulo={fase.titulo}
                                    descricao={statusDescricao}
                                    imagem={require('@/assets/images/MatériaMatemática.png')}
                                    onPress={() => navigateToGame(fase.id, locked)}
                                    bloqueado={locked}
                                />
                            );
                        })}
                    </View>
                    <View style={pageStyles.buttonContainer}>
                        {/* Botão Teste usa a nova lógica */}
                        <CustomButton
                            title={isTestLocked ? "Teste Bloqueado" : "Teste"}
                            onPress={handleTestPress}
                            variant={isTestLocked ? "secondary" : "primary"} // 'secondary' pode ser uma cor cinza ou esmaecida
                        />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
}

const pageStyles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    // ... (restante dos seus estilos)
    container: {
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginBottom: 15,
    },  
    titleText: {
        fontSize: 32,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    contentContainer: {
        flex: 1,
        height: 280,
        width: '80%',
        justifyContent: 'space-between',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '70%',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        marginHorizontal: 'auto',
        width: '40%',
    },
});