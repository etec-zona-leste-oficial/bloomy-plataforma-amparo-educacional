import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import NavigableItem from './NavigableItem';
import SquareSwitch from './SquareSwitch';

interface NavigableSwitchProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    row: number;
    col: number;
    disabled?: boolean;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
    width?: number;
    height?: number;
}

export default function NavigableSwitch({
    label,
    value,
    onValueChange,
    row,
    col,
    disabled = false,
    labelStyle,
    containerStyle,
    width,
    height,
}: NavigableSwitchProps) {
    return (
        <NavigableItem
            row={row}
            col={col}
            onSelect={() => !disabled && onValueChange(!value)}
            disabled={disabled}
        >
            <View style={[styles.content, containerStyle]}>
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                <SquareSwitch
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    width={width}
                    height={height}
                />
            </View>
        </NavigableItem>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 20,
        color: '#623DB3',
        fontFamily: 'Bebas-Neue',
    },
});
