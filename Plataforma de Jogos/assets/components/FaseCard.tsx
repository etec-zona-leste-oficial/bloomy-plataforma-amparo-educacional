import { FontAwesome } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

interface FaseCardProps {
    numero: number;
    titulo: string;
    descricao: string;
    imagem: ImageSourcePropType;
    // Removida 'rota: string;'
    bloqueado: boolean;
    // Adicionada a prop onPress para navegação controlada pelo componente pai
    onPress?: () => void; 
}

// O componente agora aceita a prop onPress no lugar de rota
export default function FaseCard({ numero, titulo, descricao, imagem, bloqueado, onPress }: FaseCardProps) {
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        if (bloqueado) {
            // Animação de tremor para indicar que está bloqueado
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        } else if (onPress) {
            // Se não estiver bloqueado, chama a função de callback passada pelo pai
            onPress();
        }
    };

    return (
        // O Pressable agora chama o handlePress, que decide se navega ou treme
        <Pressable onPress={handlePress} disabled={bloqueado && !onPress}>
            <Animated.View 
                style={[
                    styles.card,
                    { transform: [{ translateX: shakeAnimation }] }
                ]}
            >
                {/* Aplicando opacidade no cartão se estiver bloqueado */}
                <View style={[styles.cardContent, bloqueado && { opacity: 0.6 }]}>
                    <Animated.Image
                        source={imagem}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    {bloqueado && (
                        // O ícone de cadeado é mantido
                        <View style={styles.lockIconContainer}>
                            <FontAwesome name="lock" size={40} color="#7253B5" />
                        </View>
                    )}
                </View>
                <Text style={styles.cardTitle}>{titulo}</Text>
                <View style={styles.cardDescContainer}>
                    <Text
                        style={styles.cardDesc}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {descricao}
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: '100%',
        backgroundColor: '#FEECD6',
        borderRadius: 10,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardContent: {
        flex: 1,
        width: '90%',
        marginTop: 10,
        marginBottom: 5,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    lockIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // Um fundo leve para o ícone de cadeado
        backgroundColor: 'rgba(254, 236, 214, 0.5)', 
    },
    cardTitle: {
        fontSize: 20,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    cardDescContainer: {
        height: 40,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDesc: {
        fontSize: 16,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
});