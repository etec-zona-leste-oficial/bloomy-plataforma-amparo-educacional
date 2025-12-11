import { NavigationProvider, ScreenContainer, UnidadeItem } from "@/assets/components";
import { default as React } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function MatematicaPage() {
    // Layout da navegação:
    // Linha 0-3: 4 botões (um para cada unidade)
    const navigationLayout = [
        [1],  // Unidade 1
        [1],  // Unidade 2
        [1],  // Unidade 3
        [1],  // Unidade 4
    ];

    return (
        <NavigationProvider initialLayout={navigationLayout} enableBackNavigation={true}>
            <ScreenContainer>
                <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidades - Matemática</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <UnidadeItem
                        row={0}
                        numero={1}
                        descricao="Primeiros passos, começando pelo básico. Aprenda os conceitos fundamentais. "
                        rota="/FaseMatematica"
                        progressArray={[1, 0, 0]}
                    />
                    
                    <UnidadeItem
                        row={1}
                        numero={2}
                        descricao="Operações básicas e resolução de problemas simples."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        row={2}
                        numero={3}
                        descricao="Álgebra introdutória e equações do primeiro grau."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        row={3}
                        numero={4}
                        descricao="Geometria básica: formas, áreas e perímetros."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                </View>
                </View>
            </ScreenContainer>
        </NavigationProvider>
    );
}

const pageStyles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginVertical: 15,
    },
    titleText: {
        fontSize: 32,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    contentContainer: {
        flex: 1,
        width: '90%',
    },
});