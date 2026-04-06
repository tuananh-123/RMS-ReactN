import React, { isValidElement } from "react";
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import ThemedText, { ThemedTextType } from "../Theme-text";
import { useThemeColor } from "../hooks/use-theme-color";

type iconProps = {
    node?: React.ReactNode;
    render?: (props: { color: string; size: number, style?: StyleProp<TextStyle> }) => React.ReactNode;
    color?: string;
    size?: number;
    style?: StyleProp<TextStyle>;
}

type IconButtonProps = Omit<PressableProps, 'style'> & {
    lightColor?: string;
    darkColor?: string;
    icon?: iconProps;
    typeText?: ThemedTextType;
    placeholder?: string;
    style?: StyleProp<ViewStyle>; // Chi nhan object style, khong function
}

export default function IconButton({
    lightColor, 
    darkColor, 
    icon,
    typeText = 'default', 
    placeholder, 
    style,
    ...otherProps}: IconButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'iconButtonBackground');
    const themedIconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    const iconColor = icon?.color ?? themedIconColor;
    const iconSize = icon?.size ?? 24;

    const iconNode = (() => {
        if (icon?.render) {
            return icon.render({ color: iconColor, size: iconSize, style: icon.style });
        }
        if (!icon?.node) return null;
        if (!isValidElement(icon.node)) return icon.node;
        return React.cloneElement(icon.node as React.ReactElement<{ color?: string; size?: number; style?: StyleProp<TextStyle> }>, {
            color: iconColor,
            size: iconSize,
            style: icon.style,
        });
    })();

    return (
        <Pressable style={[{ backgroundColor: backgroundColor }, styles.button, style]} {...otherProps}>
            {iconNode}
            { placeholder && <ThemedText type={typeText} lightColor={lightColor} darkColor={darkColor}>{placeholder}</ThemedText>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column', // Icon va text xep theo cot, icon o tren text.
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
    }
});