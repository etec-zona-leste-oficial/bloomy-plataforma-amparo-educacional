import React, { useEffect, useState } from 'react';
import { Modal, Pressable, TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';

interface CustomKeyboardProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
    placeholder?: string;
    initialValue?: string;
}

const KEYBOARD_LAYOUT = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const SPECIAL_KEYS = ['BACKSPACE', 'SPACE', 'CONFIRMAR'];

export default function CustomKeyboard({ 
    visible, 
    onClose, 
    onSubmit, 
    placeholder = "Digite...",
    initialValue = ""
}: CustomKeyboardProps) {
    const [text, setText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [focusedRow, setFocusedRow] = useState(0);
    const [focusedCol, setFocusedCol] = useState(0);
    const [inputKey, setInputKey] = useState(0); // Key para forçar remontagem do input
    const hiddenInputRef = React.useRef<RNTextInput>(null);

    useEffect(() => {
        if (visible) {
            // Resetar completamente o teclado toda vez que abrir
            setText('');
            setCursorPosition(0);
            setFocusedRow(0);
            setFocusedCol(0);
            // Incrementar key para forçar remontagem do input
            setInputKey(prev => prev + 1);
            // Focar no input invisível para capturar teclas
            setTimeout(() => hiddenInputRef.current?.focus(), 100);
        } else {
            // Limpar input ao fechar
            hiddenInputRef.current?.clear();
            hiddenInputRef.current?.blur();
        }
    }, [visible]);

    const handleKeyPress = (char: string) => {
        if (char === 'SPACE') {
            setText(prev => prev + ' ');
            setCursorPosition(prev => prev + 1);
        } else if (char === 'BACKSPACE') {
            setText(prev => prev.slice(0, -1));
            setCursorPosition(prev => Math.max(0, prev - 1));
        } else if (char === 'CONFIRMAR') {
            onSubmit(text);
            onClose();
        } else {
            setText(prev => prev + char.toLowerCase());
            setCursorPosition(prev => prev + 1);
        }
    };

    const handleTextChange = (inputText: string) => {
        if (inputText.length > text.length) {
            // Nova tecla pressionada
            const newChar = inputText[inputText.length - 1].toUpperCase();
            
            // W = subir, S = descer, A = esquerda, D = direita
            if (newChar === 'W') {
                if (focusedRow === KEYBOARD_LAYOUT.length - 1 && focusedCol === -1) {
                    // Backspace para tecla A (linha 2, coluna 0)
                    setFocusedRow(2);
                    setFocusedCol(0);
                } else if (focusedRow > 0) {
                    const newRow = focusedRow - 1;
                    setFocusedRow(newRow);
                    // Ajustar coluna se necessário
                    const maxCol = KEYBOARD_LAYOUT[newRow].length - 1;
                    if (focusedCol > maxCol) {
                        setFocusedCol(maxCol);
                    }
                }
            } else if (newChar === 'S') {
                // Não permitir descer da última linha
                if (focusedRow < KEYBOARD_LAYOUT.length - 1) {
                    const newRow = focusedRow + 1;
                    setFocusedRow(newRow);
                    // Ajustar coluna se necessário
                    if (newRow === KEYBOARD_LAYOUT.length - 1) {
                        // Última linha: permitir -1 a 8
                        if (focusedCol > 8) {
                            setFocusedCol(8);
                        }
                    } else {
                        const maxCol = KEYBOARD_LAYOUT[newRow].length - 1;
                        if (focusedCol > maxCol) {
                            setFocusedCol(maxCol);
                        }
                    }
                }
            } else if (newChar === 'A') {
                if (focusedRow === KEYBOARD_LAYOUT.length - 1) {
                    // Última linha: não ir além do backspace (-1)
                    if (focusedCol > -1) {
                        setFocusedCol(prev => prev - 1);
                    }
                } else {
                    setFocusedCol(prev => Math.max(0, prev - 1));
                }
            } else if (newChar === 'D') {
                if (focusedRow === KEYBOARD_LAYOUT.length - 1) {
                    // Última linha: ⌫ Z X C V SPC B N M ✓ (posições -1 a 8)
                    // Não ir além do confirmar (posição 8)
                    if (focusedCol < 8) {
                        setFocusedCol(prev => prev + 1);
                    }
                } else if (focusedRow === KEYBOARD_LAYOUT.length) {
                    // Linha de botões especiais (navegação antiga, não mais usada)
                    setFocusedCol(prev => Math.min(2, prev + 1));
                } else {
                    const maxCol = KEYBOARD_LAYOUT[focusedRow].length - 1;
                    setFocusedCol(prev => Math.min(maxCol, prev + 1));
                }
            } else if (newChar === 'E' || newChar === ' ') {
                // E ou Espaço = confirmar tecla selecionada
                if (focusedRow === KEYBOARD_LAYOUT.length - 1) {
                    // Última linha: ⌫ Z X C V SPC B N M ✓
                    if (focusedCol === -1) {
                        handleKeyPress('BACKSPACE');
                    } else if (focusedCol === 0 || focusedCol === 1 || focusedCol === 2 || focusedCol === 3) {
                        // Teclas Z X C V (posições 0-3)
                        const currentKey = KEYBOARD_LAYOUT[focusedRow]?.[focusedCol];
                        if (currentKey) {
                            handleKeyPress(currentKey);
                        }
                    } else if (focusedCol === 4) {
                        handleKeyPress('SPACE');
                    } else if (focusedCol >= 5 && focusedCol <= 7) {
                        // Teclas B N M (posições 5-7)
                        const currentKey = KEYBOARD_LAYOUT[focusedRow]?.[focusedCol - 1];
                        if (currentKey) {
                            handleKeyPress(currentKey);
                        }
                    } else if (focusedCol === 8) {
                        handleKeyPress('CONFIRMAR');
                    }
                } else {
                    // Linhas normais do teclado (números, QWERTY, ASDFGHJKL)
                    const currentKey = KEYBOARD_LAYOUT[focusedRow]?.[focusedCol];
                    if (currentKey) {
                        handleKeyPress(currentKey);
                    }
                }
            } else if (newChar === 'Q') {
                // Q = fechar/cancelar
                onClose();
            }
        }
        
        // Limpar o input oculto e tentar manter o teclado fechado RAPIDAMENTE
        hiddenInputRef.current?.clear();
        hiddenInputRef.current?.blur();
        setTimeout(() => hiddenInputRef.current?.focus(), 5);
    };

    const getCurrentKey = () => {
        return KEYBOARD_LAYOUT[focusedRow]?.[focusedCol] || null;
    };

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent={false}
        >
            <Pressable 
                style={styles.overlay}
                onPress={onClose}
            >
                <Pressable 
                    style={styles.container}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Display do texto */}
                    <View style={styles.displayContainer}>
                        <Text style={styles.displayText}>
                            {text.slice(0, cursorPosition)}
                            <Text style={styles.cursor}>|</Text>
                            {text.slice(cursorPosition) || (!text ? placeholder : '')}
                        </Text>
                    </View>

                    {/* Instruções */}
                    <View style={styles.instructionsBox}>
                        <Text style={styles.instructionsText}>
                            W/A/S/D = Navegar | E/Espaço = Selecionar | Q = Cancelar
                        </Text>
                    </View>

                    {/* Teclado */}
                    <View style={styles.keyboard}>
                        {KEYBOARD_LAYOUT.slice(0, -1).map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map((key, colIndex) => {
                                    const isFocused = rowIndex === focusedRow && colIndex === focusedCol;
                                    
                                    return (
                                        <Pressable
                                            key={`${rowIndex}-${colIndex}`}
                                            style={[
                                                styles.key,
                                                isFocused && styles.focusedKey
                                            ]}
                                            onPress={() => handleKeyPress(key)}
                                        >
                                            <Text style={[
                                                styles.keyText,
                                                isFocused && styles.focusedKeyText
                                            ]}>
                                                {key}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        ))}
                        
                        {/* Última linha: ⌫ Z X C V SPC B N M ✓ */}
                        <View style={styles.row}>
                            <Pressable
                                style={[
                                    styles.specialKey,
                                    focusedRow === KEYBOARD_LAYOUT.length - 1 && focusedCol === -1 && styles.focusedKey
                                ]}
                                onPress={() => handleKeyPress('BACKSPACE')}
                            >
                                <Text style={styles.specialKeyText}>⌫</Text>
                            </Pressable>
                            
                            {/* Z X C V (posições 0-3) */}
                            {KEYBOARD_LAYOUT[KEYBOARD_LAYOUT.length - 1].slice(0, 4).map((key, colIndex) => {
                                const isFocused = focusedRow === KEYBOARD_LAYOUT.length - 1 && colIndex === focusedCol;
                                
                                return (
                                    <Pressable
                                        key={`last-${colIndex}`}
                                        style={[
                                            styles.key,
                                            isFocused && styles.focusedKey
                                        ]}
                                        onPress={() => handleKeyPress(key)}
                                    >
                                        <Text style={[
                                            styles.keyText,
                                            isFocused && styles.focusedKeyText
                                        ]}>
                                            {key}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                            
                            {/* SPACE (posição 4) */}
                            <Pressable
                                style={[
                                    styles.spaceKey,
                                    focusedRow === KEYBOARD_LAYOUT.length - 1 && focusedCol === 4 && styles.focusedKey
                                ]}
                                onPress={() => handleKeyPress('SPACE')}
                            >
                                <Text style={styles.keyText}>_______</Text>
                            </Pressable>
                            
                            {/* B N M (posições 5-7) */}
                            {KEYBOARD_LAYOUT[KEYBOARD_LAYOUT.length - 1].slice(4, 7).map((key, idx) => {
                                const colIndex = idx + 5;
                                const isFocused = focusedRow === KEYBOARD_LAYOUT.length - 1 && colIndex === focusedCol;
                                
                                return (
                                    <Pressable
                                        key={`last-${colIndex}`}
                                        style={[
                                            styles.key,
                                            isFocused && styles.focusedKey
                                        ]}
                                        onPress={() => handleKeyPress(key)}
                                    >
                                        <Text style={[
                                            styles.keyText,
                                            isFocused && styles.focusedKeyText
                                        ]}>
                                            {key}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                            
                            {/* CONFIRMAR (posição 8) */}
                            <Pressable
                                style={[
                                    styles.specialKey,
                                    styles.confirmKey,
                                    focusedRow === KEYBOARD_LAYOUT.length - 1 && focusedCol === 8 && styles.focusedKey
                                ]}
                                onPress={() => handleKeyPress('CONFIRMAR')}
                            >
                                <Text style={styles.specialKeyText}>✓</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Input invisível para capturar teclas do controle - key força remontagem */}
                    <RNTextInput
                        key={inputKey}
                        ref={hiddenInputRef}
                        style={styles.hiddenInput}
                        onChangeText={handleTextChange}
                        autoFocus={true}
                        showSoftInputOnFocus={false}
                        caretHidden={true}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#2C2C2C',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        paddingBottom: 30,
        maxHeight: '90%', // Limitar altura a 90% da tela
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 20,
    },
    displayContainer: {
        backgroundColor: '#1A1A1A',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        minHeight: 50,
        justifyContent: 'center',
    },
    displayText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Bebas-Neue',
    },
    cursor: {
        color: '#7253B5',
        fontWeight: 'bold',
    },
    instructionsBox: {
        backgroundColor: '#7253B5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    instructionsText: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    keyboard: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    key: {
        backgroundColor: '#3C3C3C',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        minWidth: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    specialKey: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        minWidth: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceKey: {
        backgroundColor: '#3C3C3C',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        minWidth: 110,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmKey: {
        backgroundColor: '#4CAF50',
    },
    focusedKey: {
        backgroundColor: '#7253B5',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        transform: [{ scale: 1.05 }],
    },
    keyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    specialKeyText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    focusedKeyText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
        top: -1000,
    },
});
