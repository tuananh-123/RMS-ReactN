import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "./hooks/use-theme-color";

const themedTextTypes = ["default", "title", "defaultSemiBold", "defaultItalic", "subtitle", "link"] as const;
export type ThemedTextType = (typeof themedTextTypes)[number];
 
export type ThemeTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: ThemedTextType;
}

export default function ThemedText(
    {
        lightColor,
        darkColor,
        style,
        type = 'default',
        ...otherProps
    }: ThemeTextProps) {

    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
    return (
        <Text style={[
            { color: color },
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'defaultItalic' ? styles.defaultItalic : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            style
        ]
        } {...otherProps}></Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 14, // Kich thuoc chu mac dinh cho input.
        lineHeight: 22, // Chieu cao dong ~1.55x de doc de hon cho body text.
        fontFamily: 'ChakraPetch-Medium' // Dung font Medium cho kieu default.
    },
    defaultSemiBold: {
        fontSize: 16, // Tang co chu cho kieu nhan manh.
        lineHeight: 24, // Chieu cao dong can doi cho chu 16.
        fontFamily: 'ChakraPetch-Bold' // Dung font dam de tao emphasis.
    },
    defaultItalic: {
        fontSize: 14, // Giu cung co chu voi default.
        lineHeight: 22, // Giu nhip dong dong bo voi style default.
        fontFamily: 'ChakraPetch-Italic' // Dung bien the nghieng cua font.
    },
    title: {
        fontSize: 32,
        lineHeight: 40,
        fontFamily: 'ChakraPetch-Medium' // Dung font Medium cho kieu default.
    },
    subtitle: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: 'ChakraPetch-Medium' // Dung font Medium cho kieu default.
    },
    link: {
        lineHeight: 24,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: 'ChakraPetch-Medium' // Dung font Medium cho kieu default.
    }
});