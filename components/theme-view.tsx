import { View, type ViewProps } from "react-native";
import { useThemeColor } from "./hooks/use-theme-color";

export type ThemeViewProps = ViewProps &{
    lightColor?: string;
    darkColor?: string;
} // khởi tạo kiểu props cho ThemedView, kế thừ các thuộc tính của ViewProps và thêm lightColor, darkColor để hỗ trợ theme tùy chỉnh.

export default function ThemedView({lightColor, darkColor, style, ...otherProps}: ThemeViewProps){
    const backgoundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background'); // dùng hook useThemeColor để lấy màu dự trên theme hiện tại, nếu có màu cụ thể cho light hoặc dark thì dùng màu đó nếu không thì dùng màu mặc định từ theme.
    return (
        <View style={[{backgroundColor: backgoundColor}, style]} {...otherProps}></View>
    )
}
