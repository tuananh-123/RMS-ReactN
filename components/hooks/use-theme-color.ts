import { Colors } from "../constants/theme";
import { useColorScheme } from "./use-color-scheme";

// hàm này dùng để lấy ra màu sắc dựa trên màu của hệ thống hoặc màu được truyền vào từ props
export function useThemeColor(
    props: {light?: string; dark?: string},
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
){
    const theme = useColorScheme() ?? 'light'; 
    const colorFromProps = props[theme]; // lấy màu từ props nếu có

    if (colorFromProps){
        return colorFromProps;
    }else{
        return Colors[theme][colorName]; // nếu không có màu từ props thì lấy màu từ theme mặc định
    }
}