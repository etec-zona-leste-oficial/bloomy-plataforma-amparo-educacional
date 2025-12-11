// assets/components/BackgroundWrapper.tsx
import React from 'react';
import { ImageBackground, StyleProp, ViewStyle } from 'react-native';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function BackgroundWrapper({ children, style }: BackgroundWrapperProps) {
  return (
    <ImageBackground
      source={require('../images/Textura.png')}
      resizeMode="repeat"
      style={[{ flex: 1 }, style]}
    >
      {children}
    </ImageBackground>
  );
}