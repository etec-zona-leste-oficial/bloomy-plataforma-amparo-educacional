// assets/components/ScreenContainer.tsx
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * If true, content will be centered horizontally (alignItems: 'center').
   * Default is false to keep pages that expect full-width content unchanged.
   */
  centerContent?: boolean;
}

export default function ScreenContainer({ children, style, centerContent = false }: ScreenContainerProps) {
  const alignItemsStyle = centerContent ? 'center' : 'stretch';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: 'center', alignItems: alignItemsStyle, paddingVertical: 20 },
          style,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}