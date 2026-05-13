import ThemedText from "@/components/Theme-text";
import ThemedView from "@/components/theme-view";
import { useAuth } from "@/hooks/useAuth";
import { TouchableOpacity } from "react-native";

export default function Index() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <ThemedView>
            <ThemedText>
                Nguyen Tuan Anh
            </ThemedText>

            <TouchableOpacity onPress={handleLogout}>
                <ThemedText type="link">
                    Đăng xuất
                </ThemedText>
            </TouchableOpacity>

        </ThemedView>
    );
}