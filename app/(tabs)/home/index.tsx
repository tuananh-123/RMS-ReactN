import { Recipe } from "@/components/constants/recipe";
import ThemedButton from "@/components/theme-button";
import ThemedScrollView from "@/components/theme-scroll";
import ThemedText from "@/components/Theme-text";
import ThemedView from "@/components/theme-view";
import IconButton from "@/components/ui/icon-button";
import ThemedRenderRecipeItem from "@/components/ui/render-item";
import SearchBar from "@/components/ui/search-bar";
import type { ServiceGridItem } from "@/components/ui/service-grid";
import ServiceGrid from "@/components/ui/service-grid";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack } from "expo-router";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

function OnPressButton() {
    alert("Bạn đã nhấn nút!");
}

export default function Index() {
    // const insets = useSafeAreaInsets();
    const hotSearhToday = [
        "Cơm chiên dương châu",
        "Phở bò tái chín",
        "Bún bò Huế",
        "Gỏi cuốn tôm thịt",
        "Bánh mì thịt nướng",
        "Cháo gà hạt sen",
        "Mì Quảng",
        "Bánh xèo miền Tây",
        "Cao lầu Hội An",
        "Bún chả Hà Nội"
    ];
    const gridItems: ServiceGridItem[] = [
        {
            id: '1',
            title: 'Tìm theo nguyên liệu',
            icon: <Ionicons name="fish-outline" size={34} color="#DE754F" />,
            onPress: OnPressButton,
        },
        {
            id: '2',
            title: 'Tìm theo món ',
            icon: <Ionicons name="barbell" size={34} color="#4FDED6" />,
            onPress: OnPressButton,
        },
        {
            id: '3',
            title: 'Lọc theo calo',
            icon: <Ionicons name="basket-outline" size={34} color="#2888D1" />,
            onPress: OnPressButton,
        },
        {
            id: '4',
            title: 'Lọc dị ứng',
            icon: <Ionicons name="filter-outline" size={34} color="#28D152" />,
            onPress: OnPressButton,
        },
        {
            id: '5',
            title: 'Vieo nấu ăn',
            icon: <Ionicons name="videocam-outline" size={34} color="#DE754F" />,
            onPress: OnPressButton,
        },
        {
            id: '6',
            title: 'Món quà tặng',
            icon: <Ionicons name="gift-outline" size={34} color="#DE4F9B" />,
            onPress: OnPressButton,
        },
        {
            id: '7',
            title: 'Cộng đồng',
            icon: <Ionicons name="people-outline" size={34} color="#8228D1" />,
            onPress: OnPressButton,
        },
        {
            id: '8',
            title: 'Top tuần',
            icon: <Ionicons name="analytics-outline" size={34} color="#28D152" />,
            onPress: OnPressButton,
        },
        {
            id: '9',
            title: 'Theo ngân sách',
            icon: <Ionicons name="card-outline" size={34} color="#BAD128" />,
            onPress: OnPressButton,
        },
        {
            id: '10',
            title: 'Phân tích dinh dưỡng',
            icon: <Ionicons name="pie-chart-outline" size={34} color="#4FDED6" />,
            onPress: OnPressButton,
        },
        {
            id: '11',
            title: 'EatClean',
            icon: <Ionicons name="accessibility-outline" size={34} color="#2888D1" />,
            onPress: OnPressButton,
        },
        {
            id: '12',
            title: 'Xem thêm',
            icon: <Ionicons name="ellipsis-horizontal-outline" size={34} color="#687076" />,
            onPress: OnPressButton,
        }

    ]

    const quickStatsDividerColor = {
        light: 'rgba(0, 0, 0, 0.12)',
        dark: 'rgba(255, 255, 255, 0.16)'
    };

    const recipes: Recipe[] = [
        {
            id: 1,
            title: "Cơm chiên dương châu",
            nation: "Trung Quốc",
            cookingTime: 30,
            rating: 4.5,
            imageSrc: require('@/assets/images/com-chien-duong-chau-13.jpg')
            // imageSrc: require('../assets/images/com-chien-duong-chau-13.jpg')
        },
        {
            id: 2,
            title: "Phở bò tái chín",
            nation: "Việt Nam",
            cookingTime: 200,
            rating: 4.8,
            imageSrc: require('@/assets/images/pho-bo-tai-chin.png')
        },
        {
            id: 3,
            title: "Bún bò Huế",
            nation: "Việt Nam",
            cookingTime: 120,
            rating: 4.7,
            imageSrc: require('@/assets/images/bun-bo-hue.jpg')
        },
        {
            id: 4,
            title: "Gỏi cuốn tôm thịt",
            nation: "Việt Nam",
            cookingTime: 20,
            rating: 4.6,
            imageSrc: require('@/assets/images/goi-cuon-tom-thit.jpg')
        },
        {
            id: 5,
            title: "Bánh mì thịt nướng",
            nation: "Việt Nam",
            cookingTime: 15,
            rating: 4.4,
            imageSrc: require('@/assets/images/banh-mi-thit-nuong.jpg')
        },
        // {
        //     id: 6,
        //     title: "Cháo gà hạt sen",
        //     nation: "Việt Nam",
        //     cookingTime: 60,
        //     rating: 4.3,
        //     imageSrc: require('../assets/images/chao-ga-hat-sen.jpg')
        // }
    ]

    const suggestedFunctions = [
        {
            id: '1',
            title: 'Nấu nhanh dưới 15 phút',
            color: '#DE754F',
            icon: <Ionicons name="flash-outline" size={34} color="#DE754F" />,
            onPress: OnPressButton,
        },
        {
            id: '2',
            title: 'Món chay thanh đạm',
            color: '#4FDED6',
            icon: <Ionicons name="leaf-outline" size={34} color="#4FDED6" />,
            onPress: OnPressButton,
        },
        {
            id: '3',
            title: 'Món ăn giảm cân',
            color: '#2888D1',
            icon: <Ionicons name="fitness-outline" size={34} color="#2888D1" />,
            onPress: OnPressButton,
        },
        {
            id: '4',
            title: 'Món ăn cho người tiểu đường',
            color: '#28D152',
            icon: <Ionicons name="medkit-outline" size={34} color="#28D152" />,
            onPress: OnPressButton,
        },
        {
            id: '5',
            title: 'Trending tuần này',
            color: '#DE754F',
            icon: <Ionicons name="trending-up-outline" size={34} color="#DE754F" />,
            onPress: OnPressButton,
        },
        {
            id: '6',
            title: 'Ăn sáng nhanh gọn',
            color: '#DE4F9B',
            icon: <Ionicons name="sunny-outline" size={34} color="#DE4F9B" />,
            onPress: OnPressButton,
        },
    ]

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ImageBackground
                source={require('@/assets/images/background_foodraining.png')}
                style={[styles.screenBackground]}
                resizeMode="cover"
            >
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ThemedRenderRecipeItem item={item} />}
                    initialNumToRender={3}
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    ListHeaderComponent={
                        <>
                            <ThemedView style={styles.headerBar}>
                                <SearchBar
                                    icon={{ render: ({ color, size }) => <EvilIcons name="search" size={size} color={color} />, size: 26 }}
                                    typeText="default"
                                    placeholder="Tìm kiếm công thức..."
                                    slideHotSearch={{ searchs: hotSearhToday, speed: 3000 }}
                                    style={styles.searchBarWrap}
                                />
                                <ThemedView style={styles.actionGroup}>
                                    <IconButton
                                        icon={{ render: ({ color, size }) => <Feather name="bell" size={size} color={color} />, size: 24, color: '#fff' }}
                                        onPress={OnPressButton}
                                    />
                                    <IconButton
                                        icon={{ render: ({ color, size }) => <MaterialCommunityIcons name="message-processing-outline" size={size} color={color} />, size: 24, color: '#fff' }}
                                        onPress={OnPressButton}
                                    />
                                </ThemedView>
                            </ThemedView>

                            <ThemedView style={[styles.actionGroupButton, { marginTop: 10 }]}>
                                <IconButton
                                    icon={{
                                        render: ({ color, size, style }) => <Entypo name="squared-plus" size={size} color={color} style={style} />,
                                        size: 20,
                                        color: 'green',
                                        style: { backgroundColor: '#fff', padding: 15, borderRadius: 10 }
                                    }} placeholder="Thêm"
                                    style={styles.actionButtonItem}
                                    typeText="defaultSemiBold"
                                    lightColor="transparent"
                                    darkColor="transparent"
                                    onPress={OnPressButton}
                                />
                                <IconButton
                                    icon={{
                                        render: ({ color, size, style }) => <MaterialCommunityIcons name="storage-tank" size={size} color={color} style={style} />,
                                        size: 20,
                                        color: 'green',
                                        style: { backgroundColor: '#fff', padding: 15, borderRadius: 10 }
                                    }} placeholder="Lưu trữ"
                                    style={styles.actionButtonItem}
                                    typeText="defaultSemiBold"
                                    lightColor="transparent"
                                    darkColor="transparent"
                                    onPress={OnPressButton}
                                />
                                <IconButton
                                    icon={{
                                        render: ({ color, size, style }) => <Foundation name="lightbulb" size={size} color={color} style={style} />,
                                        size: 20,
                                        color: 'green',
                                        style: { backgroundColor: '#fff', padding: 15, borderRadius: 10 }
                                    }} placeholder="Gợi ý"
                                    style={styles.actionButtonItem}
                                    typeText="defaultSemiBold"
                                    lightColor="transparent"
                                    darkColor="transparent"
                                    onPress={OnPressButton}
                                />
                                <IconButton
                                    icon={{
                                        render: ({ color, size, style }) => <FontAwesome name="line-chart" size={size} color={color} style={style} />,
                                        size: 20,
                                        color: 'green',
                                        style: { backgroundColor: '#fff', padding: 15, borderRadius: 10 }
                                    }} placeholder="Thống kê"
                                    style={styles.actionButtonItem}
                                    typeText="defaultSemiBold"
                                    lightColor="transparent"
                                    darkColor="transparent"
                                    onPress={OnPressButton}
                                />
                            </ThemedView>

                            <ThemedView style={[{ width: '100%', paddingHorizontal: 10, marginTop: 100, paddingBottom: 24 }, styles.boxContent]}>
                                <ThemedView style={styles.quickStatsShadow}>
                                    <ThemedView style={styles.quickStatsCard}>
                                        <ThemedButton style={styles.quickStatButton} onPress={OnPressButton}>
                                            <ThemedView>
                                                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                    <MaterialCommunityIcons name="silverware-fork-knife" size={14} color="green" />
                                                    <ThemedText type="defaultSemiBold" style={{ fontSize: 14, textAlign: 'justify' }}>Công thức</ThemedText>
                                                </ThemedView>

                                                <ThemedText type="defaultSemiBold">12 <AntDesign name="right" size={12} color="green" /></ThemedText>
                                            </ThemedView>
                                        </ThemedButton>
                                        <ThemedView
                                            style={styles.quickStatsDivider}
                                            lightColor={quickStatsDividerColor.light}
                                            darkColor={quickStatsDividerColor.dark}
                                        />
                                        <ThemedButton style={styles.quickStatButton} onPress={OnPressButton}>
                                            <ThemedView>
                                                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                    <Ionicons name="heart-sharp" size={14} color="#F53C27" />
                                                    <ThemedText type="defaultSemiBold" style={{ fontSize: 14, textAlign: 'justify' }}>Yêu thích</ThemedText>
                                                </ThemedView>
                                                <ThemedText type="defaultSemiBold">6 <AntDesign name="right" size={12} color="#F53C27" /></ThemedText>
                                            </ThemedView>
                                        </ThemedButton>
                                        <ThemedView
                                            style={styles.quickStatsDivider}
                                            lightColor={quickStatsDividerColor.light}
                                            darkColor={quickStatsDividerColor.dark}
                                        />
                                        <ThemedButton style={styles.quickStatButton} onPress={OnPressButton}>
                                            <ThemedView>
                                                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                    <MaterialIcons name="local-fire-department" size={14} color="#F5A327" />
                                                    <ThemedText type="defaultSemiBold" style={{ fontSize: 14, textAlign: 'justify' }}>Calory</ThemedText>
                                                </ThemedView>
                                                <ThemedText type="defaultSemiBold">500 <AntDesign name="right" size={12} color="#F5A327" /></ThemedText>
                                            </ThemedView>
                                        </ThemedButton>
                                    </ThemedView>
                                    <ThemedView
                                        lightColor="#EAFBEE"
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: 10,
                                            borderBottomEndRadius: 18,
                                            borderBottomStartRadius: 18,
                                        }}>
                                        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'transparent' }}>
                                            <Feather style={{
                                                backgroundColor: '#C3F4D1',
                                                padding: 6,
                                                borderRadius: 10,
                                            }} name="book-open" size={24} color="green" />
                                            <ThemedText type="defaultSemiBold" lightColor="green" style={{ fontSize: 14, textAlign: 'justify' }}>Trung tâm dinh dưỡng</ThemedText>
                                        </ThemedView>
                                        <Octicons name="chevron-right" size={18} color="green" />
                                    </ThemedView>
                                </ThemedView>

                                <ServiceGrid style={{ marginTop: 40 }} items={gridItems} columns={4} gap={6} />

                                <ThemedText type="defaultSemiBold" style={{ marginTop: 30, fontSize: 20, marginBottom: 10 }}>Gợi ý cho bạn</ThemedText>
                                <ThemedScrollView flexDirection="row" horizontal showsHorizontalScrollIndicator={false}>
                                    {suggestedFunctions?.map(func => (
                                        <ThemedButton key={func.id} onPress={func.onPress}
                                            style={({ pressed }) => ({
                                                width: 100,
                                                padding: 10,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                marginRight: 5,
                                                boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: !pressed ? '#fff' : '#EDFEE7',
                                            })}>
                                            <ThemedView lightColor="transparent" darkColor="transparent" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 }}>

                                                {func.icon}

                                                <ThemedText type="defaultSemiBold" style={{ fontSize: 12 }}>{func.title}</ThemedText>
                                            </ThemedView>
                                        </ThemedButton>
                                    ))}
                                </ThemedScrollView>
                            </ThemedView>
                        </>
                    }
                    
                />
            </ImageBackground>


        </>
    );

}

const styles = StyleSheet.create({
    screenBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    headerBar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 12,
        backgroundColor: 'transparent'
    },
    searchBarWrap: {
        flex: 1,
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'transparent'
    },
    actionGroupButton: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'transparent',
    },
    actionButtonItem: {
        flex: 1,
    },
    boxContent: {
        position: 'relative',
    },
    quickStatsShadow: {
        position: 'absolute',
        top: -100,
        width: '98%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.12,
        shadowRadius: 18,
        elevation: 6,
        borderRadius: 18,
    },
    quickStatsCard: {
        borderRadius: 18,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        overflow: 'hidden',
    },
    quickStatButton: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    quickStatsDivider: {
        width: 1,
        height: '65%',
    }

});