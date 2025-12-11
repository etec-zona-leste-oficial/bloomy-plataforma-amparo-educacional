import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';

// Constantes
const ANIMATION_DURATION = 160;
const COLOR_ON = '#FF9800';
const COLOR_OFF = '#E6E6E6';
const KNOB_COLOR = '#FFFFFF';
const PADDING = 2;

type Props = {
  value: boolean;
  onValueChange?: (next: boolean) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
};

const SquareSwitch: React.FC<Props> = ({
  value,
  onValueChange,
  disabled = false,
  width = 56,
  height = 28,
}) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false, // Necessário para animar 'backgroundColor'
    }).start();
  }, [value, animValue]);

  // Cálculos e interpolações memoizados para melhor performance ---
  const { knobSize, knobTranslate, backgroundColor } = useMemo(() => {
    const knobSizeValue = height - PADDING * 2;
    const translateRange = width - PADDING * 2 - knobSizeValue;

    return {
      knobSize: knobSizeValue,
      backgroundColor: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLOR_OFF, COLOR_ON],
      }),
      knobTranslate: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [PADDING, translateRange + PADDING],
      }),
    };
  }, [width, height, animValue]);

  // --- Estilos dinâmicos ---
  const wrapperStyle: ViewStyle = { opacity: disabled ? 0.6 : 1 };
  const trackStyle: Animated.AnimatedProps<ViewStyle> = { width, height, backgroundColor };
  const knobStyle: ViewStyle = {
    width: knobSize,
    height: knobSize,
    transform: [{ translateX: knobTranslate }],
  };

  return (
    <Pressable
      onPress={() => onValueChange?.(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      style={wrapperStyle}
    >
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.knob, knobStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    borderRadius: 3,
  },
  knob: {
    backgroundColor: KNOB_COLOR,
    borderRadius: 3,
  },
});

export default SquareSwitch;