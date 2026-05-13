import { AuthProvider } from '@/hooks/useAuth';
import { useTrackRoute } from '@/hooks/useTrackRoute';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // thư viện này dùng để hỗ trợ quá trình load font, giúp chương trình đảm bảo khi nào load font lên thì chương trình mới render giao diện
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync();

function RouteTracker() {
  useTrackRoute();
  return null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ChakraPetch-Medium': require('../assets/fonts/chakra-petch/ChakraPetch-Medium.ttf'),
    'ChakraPetch-Italic': require('../assets/fonts/chakra-petch/ChakraPetch-Italic.ttf'),
    'ChakraPetch-Bold'  : require('../assets/fonts/chakra-petch/ChakraPetch-Bold.ttf'),
  });

  useEffect(() => { // hook dùng để theo dõi sự thay đổi của 2 biến loaded và error, khi nào loaded hoặc error thay đổi thì sẽ chạy hàm bên trong useEffect. Nếu loaded là true hoặc error có giá trị (tức là đã load xong hoặc có lỗi xảy ra) thì sẽ gọi hàm SplashScreen
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null; // nếu chưa load xong và không có lỗi trả về null để không render giao diện
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RouteTracker />
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

