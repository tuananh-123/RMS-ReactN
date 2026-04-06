import { ScrollView, type ScrollViewProps } from "react-native";
import { useThemeColor } from "./hooks/use-theme-color";


type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    children: React.ReactNode;
    flexDirection?: 'row' | 'column';
    gap?: number;
};


export default function ThemedScrollView({ lightColor, darkColor, children, flexDirection = 'column', gap = 10, style,  ...otherProps }: ThemedScrollViewProps){
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return (
        <ScrollView style={[{ 
            flexDirection: flexDirection,
            // gap: gap,
            backgroundColor: backgroundColor,
        }, style]} {...otherProps}>
            {children}
        </ScrollView>
    );
}