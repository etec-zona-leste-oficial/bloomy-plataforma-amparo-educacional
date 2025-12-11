import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

interface UnidadeItemProps {
    numero: number;
    descricao: string;
    rota: string;
    progressArray: number[];
}

export default function UnidadeItem({ numero, descricao, rota, progressArray }: UnidadeItemProps) {
    // Calcula a porcentagem de progresso
    const calculateProgress = (arr: number[]) => {
        const total = arr.length;
        const completed = arr.filter(item => item === 1).length;
        return total > 0 ? (completed / total) * 100 : 0;
    };

    const progressPercentage = calculateProgress(progressArray);

    // Define o texto do botão baseado no progresso
    const getButtonText = () => {
        if (progressPercentage === 0) return "Começar";
        if (progressPercentage === 100) return "Revisar";
        return "Continuar";
    };

    return (
        <View style={styles.unidadeItem}>
            <View style={styles.unidadeLabel}>
                <Text style={styles.unidadeNum}>Unidade {numero} - </Text>

                <View style={{ width: '60%' }}>
                    <Text
                        style={styles.unidadeDescription}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {descricao}
                    </Text>
                </View>

                <CustomButton
                    style={styles.unidadeButton}
                    title={getButtonText()}
                    onPress={() => router.push(rota as any)}
                    variant="primary"
                />
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBg}>
                    <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    unidadeItem: {
        marginBottom: 20,
        width: '100%',
        height: 125,
        backgroundColor: '#FEECD6',
        borderRadius: 10,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    unidadeLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '60%',
        paddingHorizontal: 10,
    },
    unidadeNum: {
        fontSize: 25,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    unidadeButton: {
        width: 110,
        minWidth: 110,
    },
    unidadeDescription: {
        fontSize: 18,
        color: '#7253B5',
        fontFamily: 'Bebas-Neue',
    },
    progressContainer: {
        height: '40%',
        padding: 10,
        justifyContent: 'center',
    },
    progressBg: {
        height: '100%',
        borderRadius: 15,
        backgroundColor: '#EBCAA3',
        overflow: 'hidden',
    },
    progressBar: {
        backgroundColor: '#7253B5',
        height: '100%',
        borderRadius: 15,
    },
});
