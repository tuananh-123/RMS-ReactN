import React, { isValidElement, useEffect, useState } from "react";
import { StyleSheet, TextInput, type StyleProp, type ViewStyle } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";
import ThemedView from "../theme-view";



// định nghĩa các kiểu text có thể sử dụng trong search bar
const TypeProps = ["default", "defaultSemiBold", "defaultItalic"] as const;
type TypeText = (typeof TypeProps)[number];

type iconProps = {
    node?: React.ReactNode;
    size?: number,
    color?: string
    render?: (props: { color?: string, size?: number }) => React.ReactNode;
}

type slideHotSearchProps = {
    searchs: string[];
    speed: number,
    direction?: 'horizontal' | 'vertical';
}

type SearchBarProps = {
    lightColor?: string;
    darkColor?: string;
    placeholder?: string;
    slideHotSearch?: slideHotSearchProps;
    typeText?: TypeText;
    icon: iconProps;
    style?: StyleProp<ViewStyle>; // kiểu mở rộng cho Style của View cho phép truyền vào màng điều kiện style khác nhau
}

export default function SearchBar({
    lightColor,
    darkColor,
    placeholder,
    typeText = 'default',
    icon,
    style,
    slideHotSearch,
}: SearchBarProps) {

    const [index, setIndex] = useState(0);
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundBar');
    const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    const themeIconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    const iconColor = icon?.color ?? themeIconColor
    const iconSize = icon?.size ?? 24

    const iconNode = (() => {
        if (icon?.render) {
            return icon.render({ color: iconColor, size: iconSize });
        }

        if (!icon?.node) return null;
        if (!isValidElement(icon.node)) return null;
        return React.cloneElement(icon.node as React.ReactElement<{ color?: string; size?: number }>, {
            color: iconColor,
            size: iconSize
        })


    })();



    useEffect(() => {
        if (!slideHotSearch?.searchs || slideHotSearch.searchs.length === 0 || !slideHotSearch.speed) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slideHotSearch.searchs.length); // Sử dụng toán tử modulo để quay lại đầu khi đạt cuối mảng
        }, slideHotSearch.speed);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <ThemedView style={[styles.searchBar, { backgroundColor: backgroundColor }, style]}>
            {iconNode}
            <TextInput
                style={[
                    styles.textInput,
                    { color: textColor },
                    typeText === 'default' ? styles.default : undefined,
                    typeText === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                    typeText === 'defaultItalic' ? styles.defaultItalic : undefined,
                ]}
                placeholder={slideHotSearch?.searchs ? slideHotSearch.searchs[index] : placeholder}
                placeholderTextColor={placeholderColor} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 14, // Kich thuoc chu mac dinh cho input.
        lineHeight: 20, // Chieu cao moi dong de text thoang hon.
        fontFamily: 'ChakraPetch-Medium' // Dung font Medium cho kieu default.
    },
    defaultSemiBold: {
        fontSize: 16, // Tang co chu cho kieu nhan manh.
        lineHeight: 22, // Dong cao hon de can bang voi co chu 16.
        fontFamily: 'ChakraPetch-Bold' // Dung font dam de tao emphasis.
    },
    defaultItalic: {
        fontSize: 14, // Giu cung co chu voi default.
        lineHeight: 20, // Giu line-height dong deu voi default.
        fontFamily: 'ChakraPetch-Italic' // Dung bien the nghieng cua font.
    },
    textInput: {
        flex: 1, // Cho TextInput chiem het khong gian con lai sau icon.
        flexShrink: 1, // Cho phep input co lai khi text dai de khong tran layout.
        marginLeft: 4, // Tao khoang cach nho giua icon va text.
        paddingVertical: 0, // Loai bo padding doc mac dinh de de can giua.
        textAlignVertical: 'center', // Can text theo truc doc (hieu qua ro tren Android).
        includeFontPadding: false, // Bo font padding mac dinh Android de baseline gon hon.
    },
    searchBar: {
        flexDirection: 'row', // Dat icon va input nam ngang cung mot hang.
        alignItems: 'center', // Can giua icon va input theo chieu doc.
        borderRadius: 25, // Bo tron goc thanh tim kiem.
        overflow: 'hidden', // Cat noi dung vuot khung theo bo goc rounded.
        width: '100%', // Thanh tim kiem rong het container cha.
        minHeight: 44, // Dam bao chieu cao toi thieu de de bam va de nhin.
        paddingHorizontal: 10, // Tao khoang trong hai ben trai/phai.
    }
});