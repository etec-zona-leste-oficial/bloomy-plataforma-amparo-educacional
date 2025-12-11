import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";
import QuestionCard from "./QuestionCard";

export interface Question {
    questionText: string;
    alternatives: string[];
    correctAnswer: number;
}

interface QuestionFormProps {
    questions: Question[];
    onSubmit: (passed: boolean, score: number) => void;
}

export default function QuestionForm({ questions, onSubmit }: QuestionFormProps) {
    const [answers, setAnswers] = useState<{ [key: number]: { selected: number; correct: boolean } }>({});

    const handleAnswerSelect = (questionNumber: number, selectedIndex: number, isCorrect: boolean) => {
        setAnswers(prev => ({
            ...prev,
            [questionNumber]: { selected: selectedIndex, correct: isCorrect }
        }));
    };

    const handleSubmit = () => {
        const totalQuestions = questions.length;
        const answeredQuestions = Object.keys(answers).length;
        const correctAnswers = Object.values(answers).filter(a => a.correct).length;
        const scorePercentage = (correctAnswers / totalQuestions) * 100;
        const passed = scorePercentage >= 60;

        if (answeredQuestions < totalQuestions) {
            Alert.alert(
                "Atenção",
                `Você respondeu apenas ${answeredQuestions} de ${totalQuestions} questões. Deseja enviar mesmo assim?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Enviar",
                        onPress: () => onSubmit(passed, scorePercentage)
                    }
                ]
            );
        } else {
            onSubmit(passed, scorePercentage);
        }
    };

    return (
        <>
            <View style={styles.contentContainer}>
                {questions.map((question, index) => (
                    <React.Fragment key={index}>
                        <QuestionCard
                            questionNumber={index + 1}
                            questionText={question.questionText}
                            alternatives={question.alternatives}
                            correctAnswer={question.correctAnswer}
                            onAnswerSelect={(selectedIndex: number, isCorrect: boolean) =>
                                handleAnswerSelect(index + 1, selectedIndex, isCorrect)
                            }
                        />
                        {index < questions.length - 1 && <View style={styles.separator} />}
                    </React.Fragment>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Enviar Respostas"
                    onPress={handleSubmit}
                    variant="primary"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FEECD6',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    separator: {
        height: 4,
        backgroundColor: '#7253B5',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
});
