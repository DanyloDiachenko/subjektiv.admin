import { ArtworkPostReaction } from '../api-client/main';

export const ArtworkPostReactionToEmojiMap = {
    [ArtworkPostReaction.LIKE]: '❤️',
    [ArtworkPostReaction.DISLIKE]: '💩',
} as const satisfies {
    [key in ArtworkPostReaction]: string;
};
