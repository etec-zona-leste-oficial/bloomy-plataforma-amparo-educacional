import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import CustomButton from './CustomButton';
import NavigableItem from './NavigableItem';

interface NavigableButtonProps {
  title: string;
  onSelect: () => void;
  row: number;
  col: number;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  iconSize?: number;
}

export default function NavigableButton({
  title,
  onSelect,
  row,
  col,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
  loading = false,
  iconName,
  iconColor,
  iconSize,
}: NavigableButtonProps) {
  return (
    <NavigableItem
      row={row}
      col={col}
      onSelect={onSelect}
      disabled={disabled || loading}
      style={{ marginVertical: 0 }}
    >
      <CustomButton
        title={title}
        onPress={onSelect}
        variant={variant}
        style={style}
        textStyle={textStyle}
        disabled={disabled}
        loading={loading}
        iconName={iconName}
        iconColor={iconColor}
        iconSize={iconSize}
      />
    </NavigableItem>
  );
}
