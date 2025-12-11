import { NavigationProvider, QuestionForm, ScreenContainer, type Question } from "@/assets/components";
import React, { useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function testePage() {
    const questions: Question[] = [
        {
            questionText: "Quanto é 5 + 3?",
            alternatives: ["A) 7", "B) 8", "C) 9", "D) 53"],
            correctAnswer: 1,
        },
        {
            questionText: "Quanto é 6 - 3?",
            alternatives: ["A) 3", "B) 6", "C) 9", "D) 2"],
            correctAnswer: 0,
        },
        {
            questionText: "Quanto é 2 x 3?",
            alternatives: ["A) 5", "B) 6", "C) 1"],
            correctAnswer: 1,
        },
    ];

    const handleFormSubmit = (passed: boolean, score: number) => {
        if (passed) {
            Alert.alert(
                "Parabéns!",
                `Você foi aprovado com ${score.toFixed(0)}% de acerto!`
            );
        } else {
            Alert.alert(
                "Não foi dessa vez",
                `Você obteve ${score.toFixed(0)}% de acerto. \n É necessário 60% para aprovação.`
            );
        }
    };

    // Calcula layout dinâmico baseado nas questões
    const navigationLayout = useMemo(() => {
        const layout: number[][] = [];
        // Cada alternativa é uma linha separada (navegação vertical)
        questions.forEach(q => {
            q.alternatives.forEach(() => {
                layout.push([1]); // Cada alternativa em sua própria linha
            });
        });
        // Última linha: botão enviar
        layout.push([1]);
        return layout;
    }, [questions]);

    return (
        <NavigationProvider initialLayout={navigationLayout} enableBackNavigation={true}>
            <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Teste</Text>
                </View>

                <QuestionForm 
                    questions={questions} 
                    onSubmit={handleFormSubmit}
                />


            </View>
        </ScreenContainer>
        </NavigationProvider>
    )
}
const pageStyles = StyleSheet.create({
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
});
