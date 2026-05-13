import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function ProfileLayout() {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) return <Redirect href={'/login'} />;
    
    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}