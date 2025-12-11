import { router, useFocusEffect } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';

interface NavigationPosition {
    row: number;
    col: number;
}

interface NavigableItemData {
    position: NavigationPosition;
    onSelect: () => void;
    disabled?: boolean;
    viewRef?: React.RefObject<any>;
}

interface NavigationContextType {
    focusedPosition: NavigationPosition;
    setFocusedPosition: (pos: NavigationPosition) => void;
    registerItem: (position: NavigationPosition, onSelect: () => void, disabled?: boolean) => void;
    unregisterItem: (position: NavigationPosition) => void;
    registerItemRef: (position: NavigationPosition, ref: React.RefObject<any>) => void;
    layout: number[][]; // Array de arrays com o número de itens em cada linha
    setLayout: (layout: number[][]) => void;
    enableBackNavigation: boolean;
    setEnableBackNavigation: (enabled: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
};

interface NavigationProviderProps {
    children: React.ReactNode;
    initialLayout?: number[][];
    enableBackNavigation?: boolean;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
    children, 
    initialLayout = [[]], 
    enableBackNavigation: initialEnableBack = true 
}) => {
    const [focusedPosition, setFocusedPosition] = useState<NavigationPosition>({ row: 0, col: 0 });
    const [layout, setLayout] = useState<number[][]>(initialLayout);
    const [enableBackNavigation, setEnableBackNavigation] = useState(initialEnableBack);
    const itemsRef = useRef<Map<string, NavigableItemData>>(new Map());
    const hiddenInputRef = useRef<RNTextInput>(null);
    const [inputKey, setInputKey] = useState(0);

    // Registrar/desregistrar itens
    const registerItem = (position: NavigationPosition, onSelect: () => void, disabled?: boolean) => {
        const key = `${position.row}-${position.col}`;
        const existing = itemsRef.current.get(key);
        itemsRef.current.set(key, { position, onSelect, disabled, viewRef: existing?.viewRef });
    };

    const registerItemRef = (position: NavigationPosition, ref: React.RefObject<any>) => {
        const key = `${position.row}-${position.col}`;
        const existing = itemsRef.current.get(key);
        if (existing) {
            existing.viewRef = ref;
        } else {
            itemsRef.current.set(key, { position, onSelect: () => {}, viewRef: ref });
        }
    };

    const unregisterItem = (position: NavigationPosition) => {
        const key = `${position.row}-${position.col}`;
        itemsRef.current.delete(key);
    };

    // Focar no input invisível quando o componente é montado
    useEffect(() => {
        setInputKey(prev => prev + 1);
        setTimeout(() => hiddenInputRef.current?.focus(), 100);
    }, []);

    // Resetar foco toda vez que a tela ficar visível
    useFocusEffect(
        useCallback(() => {
            setFocusedPosition({ row: 0, col: 0 });
            setTimeout(() => hiddenInputRef.current?.focus(), 100);
        }, [])
    );

    const handleTextChange = (inputText: string) => {
        if (inputText.length > 0) {
            const newChar = inputText[inputText.length - 1].toUpperCase();
            
            // W = subir, S = descer, A = esquerda, D = direita
            if (newChar === 'W') {
                if (focusedPosition.row > 0) {
                    const newRow = focusedPosition.row - 1;
                    setFocusedPosition(prev => {
                        const maxCol = (layout[newRow]?.[0] || 1) - 1;
                        return {
                            row: newRow,
                            col: Math.min(prev.col, maxCol)
                        };
                    });
                }
            } else if (newChar === 'S') {
                if (focusedPosition.row < layout.length - 1) {
                    const newRow = focusedPosition.row + 1;
                    setFocusedPosition(prev => {
                        const maxCol = (layout[newRow]?.[0] || 1) - 1;
                        return {
                            row: newRow,
                            col: Math.min(prev.col, maxCol)
                        };
                    });
                }
            } else if (newChar === 'A') {
                setFocusedPosition(prev => ({
                    ...prev,
                    col: Math.max(0, prev.col - 1)
                }));
            } else if (newChar === 'D') {
                setFocusedPosition(prev => {
                    const maxCol = (layout[prev.row]?.[0] || 1) - 1;
                    return {
                        ...prev,
                        col: Math.min(maxCol, prev.col + 1)
                    };
                });
            } else if (newChar === 'E' || newChar === ' ') {
                // E ou Espaço = selecionar item atual
                const key = `${focusedPosition.row}-${focusedPosition.col}`;
                const item = itemsRef.current.get(key);
                if (item && !item.disabled) {
                    item.onSelect();
                }
            } else if (newChar === 'Q') {
                // Q = voltar
                if (enableBackNavigation && router.canGoBack()) {
                    router.back();
                }
            }
        }
        
        // Limpar input e manter foco
        hiddenInputRef.current?.clear();
        hiddenInputRef.current?.blur();
        setTimeout(() => hiddenInputRef.current?.focus(), 5);
    };

    return (
        <NavigationContext.Provider
            value={{
                focusedPosition,
                setFocusedPosition,
                registerItem,
                unregisterItem,
                registerItemRef,
                layout,
                setLayout,
                enableBackNavigation,
                setEnableBackNavigation,
            }}
        >
            {children}
            {/* Input invisível para capturar teclas do controle */}
            <RNTextInput
                key={inputKey}
                ref={hiddenInputRef}
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    opacity: 0,
                    top: -1000,
                }}
                onChangeText={handleTextChange}
                autoFocus={true}
                showSoftInputOnFocus={false}
                caretHidden={true}
            />
        </NavigationContext.Provider>
    );
};
