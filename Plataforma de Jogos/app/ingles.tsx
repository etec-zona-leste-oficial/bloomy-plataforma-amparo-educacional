import { ScreenContainer, UnidadeItem } from "@/assets/components";
import { default as React } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function InglesPage() {
    return (
        <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidades - Língua Inglesa</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <UnidadeItem
                        numero={1}
                        descricao="Aprendendo palavras simples e verbos da língua inglesa."
                        rota="/FaseIngles"
                        progressArray={[0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        numero={2}
                        descricao="Operações básicas e resolução de problemas simples."
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