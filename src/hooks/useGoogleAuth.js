import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../Store/authSlice/authSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "264788540580-ke4f5lehq72cs0mimd073l9skh0qid84.apps.googleusercontent.com",
    androidClientId:
      "264788540580-c5sjqk8hndaec4c37qhnbnu85u67fv7v.apps.googleusercontent.com",
    iosClientId:
      "264788540580-kjbuapven3dos6npeni5af2adaqd7cjr.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      native: "com.joneleumka.togolock:/oauthredirect",
      useProxy: false,
    }),
    useProxy: false,
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type === "success") {
        const { authentication } = response;
        const accessToken = authentication?.accessToken;

        try {
          await AsyncStorage.setItem("googleAccessToken", accessToken);
          const userInfoRes = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          console.log(userInfoRes);
          if (!userInfoRes.ok)
            Toast.show({
              type: "error",
              position: "bottom",
              text2: failedRetrieveUserData,
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
          const userInfo = await userInfoRes.json();
          await dispatch(
            loginGoogle({ tokenGoogle: accessToken, userInfo: userInfo })
          ).unwrap();
          navigation.navigate("Главная страница");
        } catch (error) {
          console.log("❌ Ошибка при авторизации через Google:", error);
        }
      } else if (response?.type === "error") {
        console.log("❌ Ошибка авторизации:", response);
      }
    };

    handleGoogleLogin();
  }, [response]);

  return {
    request,
    promptAsync,
  };
};
