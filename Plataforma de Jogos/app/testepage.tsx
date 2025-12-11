import { QuestionForm, ScreenContainer, type Question } from "@/assets/components";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function testePage() {
    const questions: Question[] = [
        {
            questionText: "Qual o nome do gato em inglês?",
            alternatives: ["A) Cat", "B) Lion", "C) Horse", "D) Dog"],
            correctAnswer: 0,
        },
        {
            questionText: "Qual a tradução do verbo 'Think'?",
            alternatives: ["A) Desenhar", "B) Pensar", "C) Caminhar", "D) Rir"],
            correctAnswer: 1,
        },
        {
            questionText: "Na frase 'Eu gosto de desenhar.', como fica o verbo 'desenhar' em inglês?",
            alternatives: ["A) Play", "B) Draw", "C) Eat"],
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

    return (
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
