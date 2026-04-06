import { Pressable, StyleSheet, type TextProps, type ViewProps } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";
import ThemedText from "../Theme-text";
import ThemedView from "../theme-view";

type textProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    label: string;
}

type statProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    text: textProps;
}

export default function StatButton({
    lightColor,
    darkColor,
    text,
    style,
    ...otherProps
}: statProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");


    return (
        <Pressable
            style={[{ backgroundColor: backgroundColor }, style]}
            {...otherProps}
        >
            <ThemedView style={styles.flexNode}>
                { }
                <ThemedView>
                    <ThemedView style={styles.flexNode}>
                        <ThemedText style={[text.style]}>{text.label}</ThemedText>
                        { }
                    </ThemedView>
                </ThemedView>

            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    flexNode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    }
});