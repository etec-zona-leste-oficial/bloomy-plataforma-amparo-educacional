import { ScreenContainer, UnidadeItem } from "@/assets/components";
import { default as React } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function PortuguesPage() {
    return (
        <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidades - Língua Portuguesa</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <UnidadeItem
                        numero={1}
                        descricao="Primeiros passos, começando pelo básico. Aprendendo palavras e frases."
                        rota="/FasePortugues"
                        progressArray={[0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        numero={2}
                        descricao="Descobrindo o mundo dos adjetivos e verbos."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                </View>
            </View>
        </ScreenContainer>
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