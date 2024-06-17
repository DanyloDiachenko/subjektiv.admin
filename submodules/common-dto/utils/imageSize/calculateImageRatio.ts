// Define the predefined ratios and their corresponding enum values
import { ImageRatioEnum } from '../../api-client/storage';

const PredefinedRatios = [
    { ratio: 3 / 4, enum: ImageRatioEnum.RATIO_3_4 },
    { ratio: 4 / 3, enum: ImageRatioEnum.RATIO_4_3 },
    { ratio: 1, enum: ImageRatioEnum.RATIO_1_1 },
    { ratio: 16 / 9, enum: ImageRatioEnum.RATIO_16_9 },
    { ratio: 9 / 16, enum: ImageRatioEnum.RATIO_9_16 },
    { ratio: 3 / 2, enum: ImageRatioEnum.RATIO_3_2 },
    { ratio: 2 / 3, enum: ImageRatioEnum.RATIO_2_3 },
] as const;

export default function calculateImageRatio(width: number, height: number): ImageRatioEnum {
    const ratio = width / height;

    // Find the closest matching ratio by iterating through the predefined ratios
    let closestRatio: ImageRatioEnum | null = null;
    let minDifference = Number.POSITIVE_INFINITY;
    for (const definedRatio of PredefinedRatios) {
        const difference = Math.abs(ratio - definedRatio.ratio);
        if (difference < minDifference) {
            minDifference = difference;
            closestRatio = definedRatio.enum;
        }
    }

    const result = PredefinedRatios.find((item) => item.enum === closestRatio);

    if (!result) {
        throw new Error(
            `No closest ratio found for width: ${width} and height: ${height} with ratio: ${ratio}`,
        );
    }

    // Return the corresponding enum value for the closest ratio
    return result.enum;
}
