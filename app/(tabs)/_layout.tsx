import ThemedText from '@/components/Theme-text';
import ThemedView from '@/components/theme-view';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { usePathname } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '../../components/hooks/use-color-scheme';

export default function TabLayout() {
    const pathname = usePathname();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'light' ? DefaultTheme : DarkTheme;
    const insets = useSafeAreaInsets();
    return (
        <Tabs style={[styles.container, { paddingTop: insets.top }]}>
            <TabSlot />
            <TabList style={styles.tabBar}>
                <TabTrigger style={styles.tabBarItem} name='search' href={'/search'}>
                    <ThemedView style={styles.tabBarInnerItem}>
                        <MaterialIcons name="kitchen" size={24} color={pathname === '/search' ? 'green' : theme.colors.text} />
                        <ThemedText style={[styles.textStyle, {
                            color: pathname === '/search' ? 'green' : theme.colors.text
                        }]}>Vào bếp</ThemedText>
                    </ThemedView>
                </TabTrigger>


                <ThemedView style={[styles.tabBarItem, styles.tabBarItemLeftCenter]}>
                    <ThemedText style={styles.textStyle}>Kế hoạch</ThemedText>
                </ThemedView>

                <TabTrigger style={[styles.homeBarItem]} name='home' href={'/home'} >
                    <ThemedView style={[styles.homeBarInner, {
                        backgroundColor: pathname === '/home' ? '#EAFBEE' : '#fff',
                    }]}>
                        <MaterialIcons name="house-siding" size={24} color={pathname === '/home' ? 'green' : '#111'} />
                        <ThemedText type='default' style={[styles.homeTextStyle,
                        { color: pathname === '/home' ? 'green' : '#111' }
                        ]}>Trang chủ</ThemedText>
                    </ThemedView>
                </TabTrigger>

                <ThemedView style={[styles.tabBarItem, styles.tabBarItemRightCenter]}>
                    <ThemedText style={styles.textStyle}>Lịch sử</ThemedText>
                </ThemedView>

                <TabTrigger style={styles.tabBarItem} name='profile' href={'/profile'}>
                    <ThemedView>
                        <MaterialIcons name="person" size={24} color={pathname === '/profile' ? 'green' : theme.colors.text} />
                        <ThemedText style={[styles.textStyle, {
                            color: pathname === '/profile' ? 'green' : theme.colors.text
                        }]}>Tôi</ThemedText>
                    </ThemedView>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    tabBarInnerItem:{
        alignItems: 'center'
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