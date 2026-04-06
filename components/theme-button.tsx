import { Pressable, type PressableProps } from "react-native";
import { useThemeColor } from "./hooks/use-theme-color";

type themedButtonProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
}


export default function ThemedButton({
    lightColor,
    darkColor,
    ...otherProps   
}: themedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

    return (
        <Pressable style={({ pressed }) => [{ backgroundColor: backgroundColor }]} {...otherProps}></Pressable>
    );
}

