import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from "expo-image";
import ThemedText from "../Theme-text";
import type { Recipe } from "../constants/recipe";
import ThemedButton from "../theme-button";
import ThemedView from "../theme-view";

type RenderItemsProps = {
    lightColor?: string;
    darkColor?: string;
    item: Recipe;
}

export default function ThemedRenderRecipeItem({ lightColor, darkColor, item }: RenderItemsProps) {
    return (
        <ThemedView style={{
            flexDirection: 'row',
            gap: 10,
            padding: 5
        }}>
            {/* ảnh */}
            <ThemedView style={{
                position: 'relative',
                width: 150,
                height: 120,
            }}>
                <ThemedView style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    zIndex: 1,
                    padding: 5,
                    borderRadius: 20,
                    opacity: 0.8,
                }}>
                    <ThemedText type='default' style={{
                        fontSize: 12
                    }}>{item.nation}</ThemedText>
                </ThemedView>
                <Image source={item.imageSrc} style={{ flex: 1, borderRadius: 10 }} />
            </ThemedView>
            {/* thông tin */}
            <ThemedView style={{
                flex:1 
            }}>
                <ThemedText type='defaultSemiBold'>{item.title}</ThemedText>
                <ThemedView style={{
                    flexDirection: 'row',
                    gap: 20
                }}>
                    <ThemedView style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center'
                    }}>
                        <EvilIcons name="clock" size={24} color="#A8A8A8" />
                        <ThemedText lightColor='#A8A8A8'>{item.cookingTime} phút</ThemedText>
                    </ThemedView>
                    <ThemedView style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                    }}>
                        <Ionicons name="star" size={20} color="#FFBE00" />
                        <ThemedText type='defaultSemiBold' style={{ fontSize: 14 }}>{item.rating}</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <ThemedButton style={({ pressed }) => ({
                        backgroundColor: pressed ? '#CCFCBB' : '#EDFEE7',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 15,
                        alignSelf: 'flex-end',
                    })}>
                        <ThemedText lightColor='green' type='defaultSemiBold' style={{ fontSize: 14}}>Xem công thức</ThemedText>
                    </ThemedButton>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}