import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import WebView from 'react-native-webview';

import { getDatabase, push, ref, serverTimestamp } from "firebase/database";
import { useMemo } from "react";
import { useAuth } from '../src/authContext';
import { app } from '../src/firebaseconfig';
import { GAMES_CONFIG } from './gameConfig';

const db = getDatabase(app); 

// Dimensões da tela para garantir o preenchimento total, se necessário
const { width, height } = Dimensions.get('window');

// Função auxiliar para ler parâmetros da URL
const getParamsFromUrl = (url: string) => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params: any = {};
    let match;
    while ((match = regex.exec(url))) {
        params[match[1]] = decodeURIComponent(match[2]);
    }
    return params;
};

export default function GameScreen() {
    const { user } = useAuth(); 
    const { gameId } = useLocalSearchParams(); 
    const router = useRouter(); 
    
    const gameIdString = Array.isArray(gameId) ? gameId[0] : (gameId as string | undefined);
    const currentUserId = user?.uid || 'guest_user'; 

    const gameConfig = useMemo(() => {
        if (!gameIdString || !GAMES_CONFIG[gameIdString as keyof typeof GAMES_CONFIG]) {
            return null;
        }
        // Usamos uma asserção de tipo aqui, assumindo que GAMES_CONFIG é um Record<string, T>
        return GAMES_CONFIG[gameIdString as keyof typeof GAMES_CONFIG];
    }, [gameIdString]);

    // Função de salvamento
    const saveGameResultToFirebase = async (data: any) => {
        // 1. Verificação de Autenticação
        if (currentUserId === 'guest_user') {
             Alert.alert("Atenção", "Faça login para salvar seu progresso.");
             return;
        }

        // 2. Verificação de Configuração
        if (!gameConfig || !gameConfig.databasePath) { 
            Alert.alert("Erro Config", "Database path não encontrado");
            return;
        }
        
        const dbPath = gameConfig.databasePath; 

        // 3. Lógica de Conclusão (Booleano)
        const rawScore = Number(data.score) || 0;
        
        // Acessamos como 'any' para acessar a propriedade minSuccessScore que não estava tipada
        const minScore = (gameConfig as any).minSuccessScore;

        // Se existir um placar mínimo, compara. Se não, considera concluído automaticamente.
        const isCompleted = minScore 
            ? (rawScore >= minScore) 
            : true;

        // 4. Objeto final para o Firebase
        const scoreData = {
            userId: currentUserId,
            completed: isCompleted, // Apenas True ou False
            gameId: gameIdString,
            timestamp: serverTimestamp(), 
        };

        try {
            await push(ref(db, dbPath), scoreData);
            
            // 5. Sucesso e Navegação
            Alert.alert(
                "Muito Bem!", 
                "Você terminou o jogo!",
                [
                    { 
                        text: "Voltar para Jogos", 
                        onPress: () => {
                            router.back(); // Volta para a tela anterior
                        }
                    }
                ]
            );

        } catch (error: any) {
            // [Ajuste de Debug] Mensagem de erro mais clara do Firebase
            const errorMessage = error.message.includes("PERMISSION_DENIED") 
                ? "Permissão negada. Verifique as regras de segurança do Firebase." 
                : error.message;

            Alert.alert("ERRO FIREBASE", errorMessage);
            console.error("Erro Firebase:", error);
        }
    };

    const injectedJavaScript = useMemo(() => {
        return `
            window.GAME_ID = '${gameIdString}'; 
            window.USER_ID = '${currentUserId}'; 
            true;
        `;
    }, [gameIdString, currentUserId]);

    if (!gameConfig) {
        return <Text style={{ padding: 20 }}>Erro: Jogo não configurado.</Text>;
    }
    
    return (
        <>
            {/* 1. REMOVER O HEADER ROXO: Configura o headerShown para false */}
            <Stack.Screen 
                options={{ 
                    headerShown: false,
                    // Opcional: Animação 'none' para transições rápidas em jogos
                    animation: 'none',
                }} 
            />
            
            {/* 2. MAXIMIZAR A TELA: Usar o fullScreenContainer para ocupar 100% */}
            <View style={pageStyles.fullScreenContainer}>
                
                {/* O título anterior foi removido, mas você pode reintroduzir se for um título in-game */}
                
                <View style={pageStyles.contentContainer}>
                    <WebView
                        source={gameConfig.source} 
                        style={pageStyles.webView}
                        
                        onShouldStartLoadWithRequest={(request) => {
                            const { url } = request;

                            // Intercepta a URL "falsa" do Construct
                            if (url.includes('app.local/result')) {
                                const params = getParamsFromUrl(url);
                                
                                saveGameResultToFirebase(params);

                                return false; // Impede o carregamento da página de erro
                            }
                            return true;
                        }}

                        injectedJavaScript={injectedJavaScript}
                        renderLoading={() => <ActivityIndicator size="large" color="#7253B5" style={pageStyles.loadingIndicator} />}
                        startInLoadingState={true}
                        setSupportMultipleWindows={false}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={true} // Tenta forçar o conteúdo a se ajustar
                    />
                </View>
            </View>
        </>
    );
}

const pageStyles = StyleSheet.create({
    // NOVO: Container principal que garante o preenchimento de 100% da tela
    fullScreenContainer: { 
        flex: 1, 
        width: '100%', 
        alignSelf: 'stretch', 
        alignItems: 'stretch',
        backgroundColor: 'black', // Fundo preto para cobrir possíveis bordas
    },

    // O contentContainer agora é flex: 1 para preencher todo o espaço disponível
    contentContainer: { 
        flex: 1, 
        width: '100%',
        margin: 0,
        padding: 0,
    },
    
    // O WebView também é flex: 1 e sem border radius
    webView: { 
        flex: 1, 
        borderRadius: 0, 
        backgroundColor: 'black', // Fundo do webview para preencher o resto
    },
    
    loadingIndicator: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Fundo escuro para loading
    },
});