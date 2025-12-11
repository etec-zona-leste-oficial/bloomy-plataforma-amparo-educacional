import React, { useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from './NavigationContext';
import { useScroll } from './ScrollContext';

interface NavigableItemProps {
    children: React.ReactNode;
    row: number;
    col: number;
    onSelect: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    focusedStyle?: ViewStyle;
}

export default function NavigableItem({
    children,
    row,
    col,
    onSelect,
    disabled = false,
    style,
    focusedStyle,
}: NavigableItemProps) {
    const { focusedPosition, registerItem, unregisterItem, registerItemRef } = useNavigation();
    const scrollContext = useScroll();
    const viewRef = useRef<View>(null);

    useEffect(() => {
        registerItem({ row, col }, onSelect, disabled);
        registerItemRef({ row, col }, viewRef);
        return () => unregisterItem({ row, col });
    }, [row, col, onSelect, disabled]);

    const isFocused = focusedPosition.row === row && focusedPosition.col === col;

    // Scroll automático quando focado
    useEffect(() => {
        if (isFocused && viewRef.current && scrollContext?.scrollViewRef.current) {
            const timeout = setTimeout(() => {
                // Se for o primeiro item (row 0), rolar para o topo
                if (row === 0) {
                    scrollContext.scrollViewRef.current?.scrollTo({
                        y: 0,
                        animated: true,
                    });
                    return;
                }

                viewRef.current?.measureInWindow((x, y, width, height) => {
                    const screenHeight = Dimensions.get('window').height;
                    const topOffset = 100; // Margem superior
                    const bottomOffset = 150; // Margem inferior
                    
                    // Verificar se o item está fora da viewport
                    if (y < topOffset) {
                        // Item está acima da área visível
                        scrollContext.scrollViewRef.current?.scrollTo({
                            y: Math.max(0, scrollContext.currentScrollY + y - topOffset),
                            animated: true,
                        });
                    } else if (y + height > screenHeight - bottomOffset) {
                        // Item está abaixo da área visível
                        scrollContext.scrollViewRef.current?.scrollTo({
                            y: scrollContext.currentScrollY + (y + height - screenHeight + bottomOffset),
                            animated: true,
                        });
                    }
                });
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isFocused, row]);

    return (
        <View
            ref={viewRef}
            collapsable={false}
        >
            <Pressable
                style={[
                    styles.container,
                    style,
                    isFocused && styles.focused,
                    isFocused && focusedStyle,
                    disabled && styles.disabled,
                ]}
                onPress={disabled ? undefined : onSelect}
            >
                {children}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    focused: {
        borderWidth: 3,
        borderColor: '#7253B5',
        borderRadius: 8,
        shadowColor: '#7253B5',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    disabled: {
        opacity: 0.5,
    },
});
