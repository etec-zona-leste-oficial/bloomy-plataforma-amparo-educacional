import { get, getDatabase, ref } from 'firebase/database';
import { app } from './firebaseconfig';

/**
 * Verifica se o usuário completou uma fase específica (gameId).
 * Retorna `true` se existir ao menos um registro em `scores/{gameId}`
 * com `userId === userId` e `completed === true`.
 */
export async function IsGameCompleted(gameId: string, userId?: string): Promise<boolean> {
    if (!userId) return false;

    const db = getDatabase(app);
    const gameScoresRef = ref(db, `scores/${gameId}`);

    try {
        const snapshot = await get(gameScoresRef);
        if (!snapshot.exists()) return false;

        let foundCompleted = false;
        snapshot.forEach((scoreSnap) => {
            const score = scoreSnap.val();
            if (score && score.userId === userId && score.completed === true) {
                foundCompleted = true;
                return true; // interrompe o forEach
            }
            return false;
        });

        return foundCompleted;
    } catch (error) {
        console.error('IsGameCompleted error:', error);
        return false;
    }
}

export default IsGameCompleted;
