import type { ImageSourcePropType } from "react-native";

export type Recipe = {
    id: number;
    title: string;
    nation: string;
    cookingTime: number;
    rating: number;
    imageSrc: ImageSourcePropType;
}