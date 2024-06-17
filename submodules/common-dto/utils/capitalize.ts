export default function capitalize<const Text extends string>(text: Text): Capitalize<Text> {
    return (text.charAt(0).toUpperCase() + text.slice(1)) as Capitalize<Text>;
}
