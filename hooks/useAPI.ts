import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // Android emulator: sử dụng 10.0.2.2 để trỏ tới host machine
    // Nếu dùng thiết bị vật lý, thay bằng IP của máy tính
    return "http://10.0.2.2:5181";
    // Hoặc sử dụng IP thực: "http://192.168.1.100:5181"
  } else if (Platform.OS === 'ios') {
    // iOS simulator: sử dụng localhost
    return "http://localhost:5181";
  } else {
    // Web hoặc platform khác
    return "http://localhost:5181";
  }
};

const BASE_URL = getBaseURL();

export const apiClient = {
    async get(endPoint: string) {
        try {
            const url = `${BASE_URL}/${endPoint}`;
      
            const res = await fetch(url, {
                headers: { 
                    'Authorization': `Bearer ${SecureStore.getItem('accesstoken') ?? null}` 
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('❌ Lỗi khi gọi API GET:', error);
            throw error;
        }

    },

    async post(endPoint: string, body: object){
        try {
            const url = `${BASE_URL}/${endPoint}`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SecureStore.getItem('accesstoken') ?? null}`
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('❌ Lỗi khi gọi API POST:', error);
            throw error;
        }
    }
}
