import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Animated, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import NavigableItem from "./NavigableItem";

interface FaseCardProps {
    row: number;
    col: number;
    numero: number;
    titulo: string;
    descricao: string;
    imagem: ImageSourcePropType;
    rota: string;
    bloqueado: boolean;
}

export default function FaseCard({ row, col, numero, titulo, descricao, imagem, rota, bloqueado }: FaseCardProps) {
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        if (bloqueado) {
            // Animação de tremor
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        } else {
            router.push(rota as any);
        }
    };

    return (
        <NavigableItem
            row={row}
            col={col}
            onSelect={handlePress}
            focusedStyle={{ borderRadius: 10 }}
        >
            <Pressable onPress={handlePress}>
                <Animated.View 
                    style={[
                        styles.card,
                        { transform: [{ translateX: shakeAnimation }] }
                    ]}
                >
                <View style={styles.cardContent}>
                    <Animated.Image
                        source={imagem}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    {bloqueado && (
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
        </NavigableItem>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: '100%',
        backgroundColor: '#FEECD6',
        borderRadius: 10,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
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
        backgroundColor: 'rgba(254, 236, 214, 0.8)',
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
