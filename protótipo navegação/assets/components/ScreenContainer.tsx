// assets/components/ScreenContainer.tsx
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { ScrollProvider, useScroll } from './ScrollContext';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * If true, content will be centered horizontally (alignItems: 'center').
   * Default is false to keep pages that expect full-width content unchanged.
   */
  centerContent?: boolean;
}

function ScreenContainerContent({ children, style, centerContent = false }: ScreenContainerProps) {
  const alignItemsStyle = centerContent ? 'center' : 'stretch';
  const scrollContext = useScroll();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollContext?.scrollViewRef}
        onScroll={scrollContext?.onScroll}
        scrollEventThrottle={16}
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

export default function ScreenContainer(props: ScreenContainerProps) {
  return (
    <ScrollProvider>
      <ScreenContainerContent {...props} />
    </ScrollProvider>
  );
}