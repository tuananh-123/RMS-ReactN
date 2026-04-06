import type { ReactNode } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import ThemedButton from "../theme-button";
import ThemedText from "../Theme-text";
import ThemedView from "../theme-view";

export type ServiceGridItem = {
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
}

type ServiceGridProps = {
    items: ServiceGridItem[];
    columns?: number;
    gap?: number;
    style?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
}

export default function ServiceGrid({
    items,
    columns = 4,
    gap = 6,
    style,
    itemStyle,
}: ServiceGridProps) {
    const safeColumns = Math.max(1, columns);
    const itemWidth = `${100 / safeColumns}%` as const;

    return (
        <ThemedView style={[styles.grid, { paddingHorizontal: gap / 2 }, style]}>
            {items.map((item) => (
                <ThemedView
                    key={item.id}
                    style={[
                        styles.gridItem,
                        {
                            width: itemWidth,
                            paddingHorizontal: gap / 2,
                            marginBottom: gap ,
                        },
                    ]}
                    lightColor="transparent"
                    darkColor="transparent"
                >
                    <ThemedButton
                        onPress={item.onPress}
                        style={[styles.card, itemStyle]}
                        lightColor={item.lightColor}
                        darkColor={item.darkColor}
                    >
                        {item.icon ? (
                            <ThemedView style={styles.iconWrap} lightColor="transparent" darkColor="transparent">
                                {item.icon}
                            </ThemedView>
                        ) : null}
                        <ThemedText style={styles.title} type="defaultSemiBold">{item.title}</ThemedText>
                        {item.description ? (
                            <ThemedText style={styles.description}>{item.description}</ThemedText>
                        ) : null}
                    </ThemedButton>
                </ThemedView>
            ))}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    gridItem: {
        backgroundColor: 'transparent',
    },
    card: {
        minHeight: 70,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
    },
    iconWrap: {
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'center',
    },
    description: {
        opacity: 0.7,
        lineHeight: 18,
        textAlign: 'center',
    },
});

