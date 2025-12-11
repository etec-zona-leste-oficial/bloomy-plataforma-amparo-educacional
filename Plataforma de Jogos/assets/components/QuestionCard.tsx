import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface QuestionCardProps {
    questionNumber: number;
    questionText: string;
    alternatives: string[];
    correctAnswer: number;
    onAnswerSelect?: (selectedIndex: number, isCorrect: boolean) => void;
}

function CheckboxOption({ 
    text, 
    isSelected, 
    onPress 
}: { 
    text: string; 
    isSelected: boolean; 
    onPress: () => void;
}) {
    const animatedColor = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedColor, {
            toValue: isSelected ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [isSelected]);

    const backgroundColor = animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff', '#FF9800'],
    });

    return (
        <Pressable style={styles.answerOption} onPress={onPress}>
            <Animated.View style={[styles.checkbox, { backgroundColor }]} />
            <Text style={styles.answerText}>{text}</Text>
        </Pressable>
    );
}

export default function QuestionCard({
    questionNumber,
    questionText,
    alternatives,
    correctAnswer,
    onAnswerSelect,
}: QuestionCardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleAnswerPress = (index: number) => {
        setSelectedAnswer(index);
        if (onAnswerSelect) {
            onAnswerSelect(index, index === correctAnswer);
        }
    };

    return (
        <View style={styles.questionContainer}>
            <View style={styles.questionTextContainer}>
                <Text style={styles.questionText}>
                    Pergunta {questionNumber} - {questionText}
                </Text>
            </View>

            <View style={styles.answersContainer}>
                {alternatives.map((alternative, index) => (
                    <CheckboxOption
                        key={index}
                        text={alternative}
                        isSelected={selectedAnswer === index}
                        onPress={() => handleAnswerPress(index)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    questionContainer: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    questionTextContainer: {
        padding: 5,
        paddingLeft: 10,
        borderRadius: 20,
    },
    questionText: {
        fontSize: 25,
        color: '#7253B5',
        fontWeight: '500',
        fontFamily: 'Bebas-Neue',
    },
    answersContainer: {
        gap: 10,
    },
    answerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#FF9800',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerText: {
        fontSize: 20,
        color: '#7253B5',
        lineHeight: 20,
        fontFamily: 'Bebas-Neue',
    },
});
