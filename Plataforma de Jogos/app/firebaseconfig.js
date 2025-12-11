// Este arquivo não é uma rota. Reexporta utilidades a partir de src/ e fornece
// um componente padrão vazio para evitar avisos do Expo Router.
import { auth } from '../src/firebaseconfig';

export { auth };

export default function FirebaseConfigRoutePlaceholder() {
  return null;
}

