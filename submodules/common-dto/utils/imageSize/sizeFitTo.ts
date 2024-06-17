import { ISize } from './iSize';

export default function sizeFitTo(source: ISize, target: ISize): ISize {
    const scalar = Math.max(target.width / source.width, target.height / source.height);

    return {
        width: source.width * scalar,
        height: source.height * scalar,
    };
}
