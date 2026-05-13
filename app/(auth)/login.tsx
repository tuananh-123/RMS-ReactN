import ThemedText from "@/components/Theme-text";
import ThemedView from "@/components/theme-view";
import { apiClient } from "@/hooks/useAPI";
import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, user, lastVisitSite } = useAuth();
    const router = useRouter();
    const END_POINT = "api/auth/login";

    useEffect(() => {
        if (user) {
            router.replace(lastVisitSite ?? "/");
        }
    }, [user, lastVisitSite]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post(END_POINT, {
                email: email,
                password: password
            });

            // console.log("✅ Login thành công:", response);
            // TODO: Xử lý token sau khi login thành công
            const {refreshToken, accessToken} = response.data;
            await login({refreshToken, accessToken});
        } catch (error: any) {
            console.error("❌ Login thất bại:", error);
            const errorMessage = error.message || "Đăng nhập thất bại";
            Alert.alert("Lỗi", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <ThemedView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        Đăng Nhập
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Vui lòng nhập thông tin tài khoản
                    </ThemedText>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>Email</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>Mật Khẩu</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity disabled={loading}>
                        <ThemedText type="link" style={styles.forgotPassword}>
                            Quên mật khẩu?
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <ThemedText style={styles.buttonText}>Đăng Nhập</ThemedText>
                    )}
                </TouchableOpacity>

                {/* Register Link */}
                <View style={styles.footer}>
                    <ThemedText>Chưa có tài khoản? </ThemedText>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")} disabled={loading}>
                        <ThemedText type="link" style={styles.registerLink}>
                            Đăng ký ngay
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.6,
    },
    form: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontFamily: "ChakraPetch-Medium",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        fontFamily: "ChakraPetch-Medium",
        color: "#000",
    },
    forgotPassword: {
        textAlign: "right",
        marginTop: 8,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "ChakraPetch-Bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    registerLink: {
        fontFamily: "ChakraPetch-Bold",
    },
});