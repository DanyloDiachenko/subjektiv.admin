export const CharacterSetLibrary = {
    ALPHABETIC_LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    ALPHABETIC_UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    NUMERIC: '0123456789',
    SPECIAL: '!@#$%^&*()_+-=[]{}|;:",./<>?`~',
} as const;

type TCharacterSetLibrary = typeof CharacterSetLibrary;
type CharacterSets = TCharacterSetLibrary[keyof TCharacterSetLibrary];

/**
 * Generate string of specified length from specified character sets
 */
export function generateString(
    length: number,
    characterSets: CharacterSets[] = [
        CharacterSetLibrary.ALPHABETIC_UPPERCASE,
        CharacterSetLibrary.NUMERIC,
    ],
): string {
    let result = '';
    const characters = characterSets.join('');
    const charactersLength = characters.length;

    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
