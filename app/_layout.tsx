import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // thư viện này dùng để load font tùy chình vào expo
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen'; // thư viện này dùng để hỗ trợ quá trình load font, giúp chương trình đảm bảo khi nào load font lên thì chương trình mới render giao diện
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '../components/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'ChakraPetch-Medium': require('../assets/fonts/chakra-petch/ChakraPetch-Medium.ttf'), // đặt tên cho font và đường dẫn đến file font trong thư mục assets/fonts. Khi muốn sử dụng font chỉ cần gọi tên đã đặt vào thuộc tính fontFamily của style là được.
    'ChakraPetch-Italic': require('../assets/fonts/chakra-petch/ChakraPetch-Italic.ttf'),
    'ChakraPetch-Bold': require('../assets/fonts/chakra-petch/ChakraPetch-Bold.ttf'),
  }); // load font vào muốn sử dụng, trả về 2 biến loaded và error để kiểm tra quá trình load font có thành công hay không

  useEffect(() => { // hook dùng để theo dõi sự thay đổi của 2 biến loaded và error, khi nào loaded hoặc error thay đổi thì sẽ chạy hàm bên trong useEffect. Nếu loaded là true hoặc error có giá trị (tức là đã load xong hoặc có lỗi xảy ra) thì sẽ gọi hàm SplashScreen
    if (loaded || error){
      SplashScreen.hideAsync(); 
    }
  }, [loaded, error])

  if (!loaded && !error){
    return null; // nếu chưa load xong và không có lỗi trả về null để không render giao diện
  }

  return (
    <SafeAreaProvider> 
      <ThemeProvider value={ colorScheme ==  'light' ? DefaultTheme : DarkTheme }> 
        <Stack /> 
        <StatusBar style="auto" /> 
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
