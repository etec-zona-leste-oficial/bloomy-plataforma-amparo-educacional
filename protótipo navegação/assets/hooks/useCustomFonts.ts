// assets/hooks/useCustomFonts.ts
import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../fonts/BebasNeue-Regular.ttf'),
  });

  return fontsLoaded;
}