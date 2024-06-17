export default function uncapitalize<const Text extends string>(text: Text): Uncapitalize<Text> {
    return (text.charAt(0).toLowerCase() + text.slice(1)) as Uncapitalize<Text>;
}
