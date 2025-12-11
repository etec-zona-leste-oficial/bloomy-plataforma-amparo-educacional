import { CustomKeyboard, NavigableItem, NavigationProvider, ScreenContainer } from "@/assets/components";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";


export default function TutorialPage() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (text: string) => {
        setInputValue(text);
        Alert.alert("Texto digitado", text);
    };

    // Layout da navegação:
    // Linha 0: 2 botões no header (Voltar, Ajuda)
    // Linha 1: 1 botão no meio (Abrir Teclado)
    // Linha 2: 3 botões de navegação (Anterior, Pausar, Próximo)
    // Linha 3: 2 botões de teste (Teste 1, Teste 2)
    const navigationLayout = [
        [2],  // Header: 2 botões
        [1],  // Meio: 1 botão
        [3],  // Navegação: 3 botões
        [2],  // Teste: 2 botões
    ];

    return (
        <NavigationProvider initialLayout={navigationLayout} enableBackNavigation={true}>
            <ScreenContainer>
                <View style={styles.container}>
                    {/* Header com 2 botões - Linha 0 */}
                    <View style={styles.header}>
                        <NavigableItem
                            row={0}
                            col={0}
                            onSelect={() => Alert.alert("Botão 1", "Botão 1 selecionado")}
                            style={styles.headerButton}
                        >
                            <Text style={styles.buttonText}>Botão 1</Text>
                        </NavigableItem>

                        <NavigableItem
                            row={0}
                            col={1}
                            onSelect={() => Alert.alert("Botão 2", "Botão 2 selecionado")}
                            style={styles.headerButton}
                        >
                            <Text style={styles.buttonText}>Botão 2</Text>
                        </NavigableItem>
                    </View>

                    {/* Título */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>PÁGINA DE TUTORIAIS</Text>
                        <Text style={styles.subtitle}>Use WASD para navegar, E para selecionar, Q para voltar</Text>
                    </View>

                    {/* Botão do meio - Linha 1 */}
                    <View style={styles.centerSection}>
                        <NavigableItem
                            row={1}
                            col={0}
                            onSelect={() => setKeyboardVisible(true)}
                            style={styles.keyboardButton}
                        >
                            <Text style={styles.keyboardButtonText}>Abrir Teclado</Text>
                        </NavigableItem>

                        {inputValue ? (
                            <View style={styles.inputDisplay}>
                                <Text style={styles.inputLabel}>Último texto digitado:</Text>
                                <Text style={styles.inputText}>{inputValue}</Text>
                            </View>
                        ) : null}
                    </View>

                    {/* Espaçador maior */}
                    <View style={styles.spacer} />

                    {/* Botões de navegação - Linha 2 */}
                    <View style={styles.navigationSection}>
                        <View style={styles.buttonRow}>
                            <NavigableItem
                                row={2}
                                col={0}
                                onSelect={() => Alert.alert("Botão 3", "Botão 3 selecionado")}
                                style={styles.navButton}
                            >
                                <Text style={styles.buttonText}>Botão 3</Text>
                            </NavigableItem>

                            <NavigableItem
                                row={2}
                                col={1}
                                onSelect={() => Alert.alert("Botão 4", "Botão 4 selecionado")}
                                style={styles.navButton}
                            >
                                <Text style={styles.buttonText}>Botão 4</Text>
                            </NavigableItem>

                            <NavigableItem
                                row={2}
                                col={2}
                                onSelect={() => Alert.alert("Botão 5", "Botão 5 selecionado")}
                                style={styles.navButton}
                            >
                                <Text style={styles.buttonText}>Botão 5</Text>
                            </NavigableItem>
                        </View>
                    </View>

                    {/* Botões de teste - Linha 3 */}
                    <View style={styles.testSection}>
                        <View style={styles.buttonRow}>
                            <NavigableItem
                                row={3}
                                col={0}
                                onSelect={() => Alert.alert("Botão 6", "Botão 6 selecionado")}
                                style={styles.testButton}
                            >
                                <Text style={styles.buttonText}>Botão 6</Text>
                            </NavigableItem>

                            <NavigableItem
                                row={3}
                                col={1}
                                onSelect={() => Alert.alert("Botão 7", "Botão 7 selecionado")}
                                style={styles.testButton}
                            >
                                <Text style={styles.buttonText}>Botão 7</Text>
                            </NavigableItem>
                        </View>
                    </View>
                </View>

                {/* Teclado Virtual */}
                <CustomKeyboard
                    visible={keyboardVisible}
                    onClose={() => setKeyboardVisible(false)}
                    onSubmit={handleSubmit}
                    placeholder="Digite algo..."
                />
            </ScreenContainer>
        </NavigationProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 10,
    },
    headerButton: {
        backgroundColor: '#7253B5',
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        minHeight: 55,
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Bebas-Neue',
    },
    subtitle: {
        color: '#AAAAAA',
        fontSize: 12,
        textAlign: 'center',
    },
    centerSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    keyboardButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 12,
        alignItems: 'center',
        minWidth: 280,
        minHeight: 60,
        justifyContent: 'center',
    },
    keyboardButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputDisplay: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        minWidth: 250,
    },
    inputLabel: {
        color: '#AAAAAA',
        fontSize: 12,
        marginBottom: 5,
    },
    inputText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    spacer: {
        height: 50,
    },
    navigationSection: {
        marginBottom: 30,
    },
    testSection: {
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    navButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        minHeight: 55,
        justifyContent: 'center',
    },
    testButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        minHeight: 55,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
