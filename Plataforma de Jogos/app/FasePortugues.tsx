import { CustomButton, FaseCard, ScreenContainer } from "@/assets/components";
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import { useEffect, useState } from "react"; // Adicionamos useState e useEffect
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native"; // Adicionamos ActivityIndicator

import { get, getDatabase, ref } from "firebase/database";
import { useAuth } from '../src/authContext';
import { app } from '../src/firebaseconfig';

const db = getDatabase(app);

// -------------------------------------------------------------------------
// 2. Mapeamento de Fases (Define qual jogo é liberado por qual)
// Você deve usar os IDs de jogo que está salvando no Firebase
// A fase 1 não tem pré-requisito (null). A fase 2 exige a conclusão da fase 1.
const FASES_PORTUGUES= [
    { 
        id: 'jumper', 
        numero: 1, 
        titulo: 'Fase 1', 
        descricao: 'Palavras', 
        // Não precisa de pré-requisito
        prerequisiteGameId: null, 
    },
    { 
        id: 'palavra_floresta', 
        numero: 2, 
        titulo: 'Fase 2', 
        descricao: 'Frases', 
        // EXIGE que a Fase 1 (nuvem_invader) tenha sido completada
        prerequisiteGameId: 'jumper', 
    },
];
// -------------------------------------------------------------------------

export default function FasePortugues() {
    const { user } = useAuth();
    // Estado para armazenar os IDs dos jogos concluídos pelo usuário
    const [completedGames, setCompletedGames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    const currentUserId = user?.uid; 
    const isFocused = useIsFocused();

    // Função para buscar os scores
    const fetchUserProgress = async () => {
        if (!currentUserId) {
            setLoading(false);
            return;
        }

        try {
            // Cria uma query para buscar TODOS os scores do usuário que foram completados (completed: true)
            const scoresRef = ref(db, 'scores');
            
            // A sua estrutura de scores é 'scores/{gameId}/{scoreId}',
            // então você precisa varrer a estrutura. 
            // Vamos fazer uma busca geral e filtrar localmente, pois o Firebase RTDB não suporta queries compostas de forma eficiente (ex: filter por userId E completed)

            const snapshot = await get(scoresRef);
            const userCompletedGames = new Set<string>();

            if (snapshot.exists()) {
                // Percorre todos os jogos (mat_labirinto, mat_soma, etc.)
                snapshot.forEach((gameSnapshot) => {
                    // Percorre todos os resultados dentro daquele jogo
                    gameSnapshot.forEach((scoreSnapshot) => {
                        const scoreData = scoreSnapshot.val();
                        
                        // Filtra: É deste usuário E está completado?
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

    // Executa a busca quando o componente é montado, o usuário muda ou a tela volta ao foco
    useEffect(() => {
        // Se a tela estiver focada (ex: voltando de GamePage), refaz o fetch
        if (isFocused) {
            setLoading(true);
            fetchUserProgress();
        }
    }, [currentUserId, isFocused]);

    // Lógica para verificar se o jogo está liberado
    const isGameLocked = (gameId: string, prerequisiteGameId: string | null): boolean => {
        // O primeiro jogo (prerequisiteGameId é null) nunca está bloqueado
        if (!prerequisiteGameId) {
            return false;
        }
        // Verifica se o jogo anterior está na lista de jogos concluídos
        return !completedGames.includes(prerequisiteGameId);
    };
    
    // Função para navegar
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
                    <Text style={pageStyles.titleText}>Unidade 1 - Português</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <View style={pageStyles.cardsContainer}>
                        {/* Mapeia a lista de fases para renderizar os cards dinamicamente */}
                        {FASES_PORTUGUES.map((fase) => {
                            const locked = isGameLocked(fase.id, fase.prerequisiteGameId);
                            
                            // Define a descrição do status
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
                                    bloqueado={locked} // Passa o estado de bloqueio para o componente visual
                                />
                            );
                        })}
                    </View>
                    <View style={pageStyles.buttonContainer}>
                        {/* Mantenha seu botão de teste */}
                        <CustomButton
                            title="Teste"
                            onPress={() => router.push('/testepage')}
                            variant="primary"
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
        height: 280, // Ajuste este valor se necessário, ele limita o tamanho da área de conteúdo.
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