import ThemedView from '@/components/theme-view';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // thư viện này dùng để load font tùy chình vào expo
import { usePathname } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import * as SplashScreen from 'expo-splash-screen'; // thư viện này dùng để hỗ trợ quá trình load font, giúp chương trình đảm bảo khi nào load font lên thì chương trình mới render giao diện
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '../components/hooks/use-color-scheme';
import ThemedText from '../components/Theme-text';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const theme = colorScheme === 'light' ? DefaultTheme : DarkTheme;
  const [loaded, error] = useFonts({
    'ChakraPetch-Medium': require('../assets/fonts/chakra-petch/ChakraPetch-Medium.ttf'), // đặt tên cho font và đường dẫn đến file font trong thư mục assets/fonts. Khi muốn sử dụng font chỉ cần gọi tên đã đặt vào thuộc tính fontFamily của style là được.
    'ChakraPetch-Italic': require('../assets/fonts/chakra-petch/ChakraPetch-Italic.ttf'),
    'ChakraPetch-Bold': require('../assets/fonts/chakra-petch/ChakraPetch-Bold.ttf'),
  }); // load font vào muốn sử dụng, trả về 2 biến loaded và error để kiểm tra quá trình load font có thành công hay không

  useEffect(() => { // hook dùng để theo dõi sự thay đổi của 2 biến loaded và error, khi nào loaded hoặc error thay đổi thì sẽ chạy hàm bên trong useEffect. Nếu loaded là true hoặc error có giá trị (tức là đã load xong hoặc có lỗi xảy ra) thì sẽ gọi hàm SplashScreen
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null; // nếu chưa load xong và không có lỗi trả về null để không render giao diện
  }

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
        <Tabs style={styles.container} >
          <TabSlot />
          <TabList style={styles.tabBar}>
            <ThemedView style={styles.tabBarItem}>
              <ThemedText style={styles.textStyle}>Vào bếp</ThemedText>
            </ThemedView>

            <ThemedView style={[styles.tabBarItem, styles.tabBarItemLeftCenter]}>
              <ThemedText style={styles.textStyle}>Kế hoạch</ThemedText>
            </ThemedView>

            <TabTrigger style={[styles.homeBarItem]} name='index' href={'/'} >
              <ThemedView style={[styles.homeBarInner, {
                backgroundColor: pathname === '/' ? '#EAFBEE' : '#fff',
              }]}>
                <MaterialIcons name="house-siding" size={24} color={pathname === '/' ? 'green' : '#111'} />
                <ThemedText type='default' style={[styles.homeTextStyle,
                { color: pathname === '/' ? 'green' : '#111' }
                ]}>Trang chủ</ThemedText>
              </ThemedView>
            </TabTrigger>

            <ThemedView style={[styles.tabBarItem, styles.tabBarItemRightCenter]}>
              <ThemedText style={styles.textStyle}>Lịch sử</ThemedText>
            </ThemedView>

            <TabTrigger style={styles.tabBarItem} name='settings' href={'/setting'}>
              <ThemedView>
                <MaterialIcons name="person" size={24} color={pathname === '/setting' ? 'green' : theme.colors.text} />
                <ThemedText style={[styles.textStyle, {
                  color: pathname === '/setting' ? 'green' : theme.colors.text
                }]}>Tôi</ThemedText>
              </ThemedView>
            </TabTrigger>
          </TabList>
        </Tabs>
      </SafeAreaProvider>
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 14,
    paddingHorizontal: 12,
    minHeight: 70,
    backgroundColor: '#fff',
    position: 'relative'
  },
  tabBarItem: {
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarItemLeftCenter: {
    marginRight: 52,
  },
  tabBarItemRightCenter: {
    marginLeft: 52,
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
  homeBarItem: {
    position: 'absolute',
    left: '50%',
    bottom: 15,
    width: 96,
    marginLeft: -36,
    alignItems: 'center',
    zIndex: 2,
  },
  homeBarInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
  homeTextStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
  selectPathname: {
    color: '#007AFF',
  }
});