import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, View } from 'react-native';

// Đảm bảo trình duyệt không bị đóng lại bất ngờ
WebBrowser.maybeCompleteAuthSession();

export default function Setting() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // webClientId: '546344855655-ltgk593ao5hfnjcsp1k6lk8cm6n77036.apps.googleusercontent.com',
	androidClientId: '546344855655-umchqmomsnla41sllkef8peu0d9jv4pp.apps.googleusercontent.com'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      // Đây là kho báu chúng ta cần! 
      const { id_token } = response.params;
      console.log("ID Token nhận được:", id_token);
      
      // Bước tiếp theo: Gửi id_token này lên Server của bạn để xác thực
      handleServerAuthentication(id_token);
    }
  }, [response]);

  const handleServerAuthentication = async (token: string) => {
    // Logic gọi API đến Server của bạn sẽ nằm ở đây
  };

 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        disabled={!request}
        title="Đăng nhập bằng Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}