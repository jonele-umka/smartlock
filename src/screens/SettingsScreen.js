import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../Store/DarkTheme/themeAction";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dark from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

// link
const Link = ({ title, onClick, icon, disabled = false }) => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  return (
    <TouchableOpacity onPress={onClick} disabled={disabled}>
      <View
        style={[
          styles.linkContainer,
          // isDarkModeEnabled && {
          //   backgroundColor: "#191a1d",
          // },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
        >
          <View
            style={[
              {
                backgroundColor: "#0268EC",
                borderRadius: 50,
                padding: 10,
              },
              // isDarkModeEnabled && { backgroundColor: "#fff" },
            ]}
          >
            <Icon name={icon} size={20} color={"#fff"} />
          </View>
          <View>
            <Text
              style={
                {
                  color: "#fff",
                }
                //   [
                //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                // ]
              }
            >
              {title}
            </Text>
          </View>
        </View>
        <View>
          <Icon name={"chevron-right"} size={20} color={"#0268EC"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  // redux
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  // button
  // const translateXValue = useRef(
  //   new Animated.Value(isDarkModeEnabled ? 40 : 0)
  // ).current;

  // const handleToggle = () => {
  //   dispatch(toggleDarkMode(!isDarkModeEnabled));

  //   Animated.timing(translateXValue, {
  //     toValue: isDarkModeEnabled ? 0 : 20,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const animatedStyle = {
  //   transform: [{ translateX: translateXValue }],
  // };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <SafeAreaWrapper
      // style={
      //   [isDarkModeEnabled && { backgroundColor: "#383838" }]
      // }
      >
        <ScrollView>
          <View
            style={[
              styles.profile,
              // isDarkModeEnabled && { backgroundColor: "#383838" },
            ]}
          >
            <Image
              source={{
                uri: "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg",
              }}
              style={styles.avatar}
            />

            <Text
              style={[
                styles.name,
                // isDarkModeEnabled && { color: "#fff" }
              ]}
            >
              Client Demo
            </Text>
          </View>
          {/* <View
          style={[
            styles.toggleButtonContainer,
            isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
          <View style={styles.toggleButtonContent}>
            <View
              style={[
                styles.toggleIconContainer,
                isDarkModeEnabled && { backgroundColor: "#fff" },
              ]}
            >
              <Dark name="ios-moon" size={20} color={"#0268EC"} />
            </View>
            <Text
              style={[
                styles.toggleButtonText,
                isDarkModeEnabled && { color: "#fff" },
              ]}
            >
              {isDarkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode"}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, isDarkModeEnabled && styles.toggleOn]}
            activeOpacity={1}
            onPress={handleToggle}
          >
            <Animated.View style={[styles.toggleHandle, animatedStyle]} />
          </TouchableOpacity>
        </View> */}

          <View
            style={[
              styles.linksContainer,
              // isDarkModeEnabled
              //   ? { backgroundColor: "#191a1d" }
              //   : { backgroundColor: "#fff" },
            ]}
          >
            <Link title={"Settings"} onClick={() => null} icon={"cog"} />

            <Link
              title={"Verify your identify"}
              onClick={() => null}
              icon={"account-multiple-check"}
            />
            <Link
              title={"My card & Bank settings"}
              onClick={() => null}
              icon={"minus-box-outline"}
              disabled
            />
            <Link
              title={"Refer & Earn"}
              onClick={() => null}
              icon={"minus-box-outline"}
              disabled
            />
            <Link
              title={"Refer & Earn"}
              onClick={() => null}
              icon={"minus-box-outline"}
              disabled
            />
            <Link
              title={"Refer & Earn"}
              onClick={() => null}
              icon={"minus-box-outline"}
              disabled
            />
            <Link
              title={"Helpdesk"}
              onClick={() => null}
              icon={"email-fast-outline"}
            />

            <Link
              title={"Logout"}
              textColor={"#cc4949"}
              onClick={() => null}
              icon={"logout"}
              textRest
            />
          </View>
        </ScrollView>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  profile: {
    height: Dimensions.get("window").height * 0.3,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
 
  },
  avatar: {
    borderRadius: 80,
    width: 150,
    height: 150,
  },
  name: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  linksContainer: {
    flex: 1,
  },
  // toggleButtonContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingVertical: 10,
  // },
  // toggleButtonContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   columnGap: 15,
  // },
  // toggleIconContainer: {
  //   backgroundColor: "#191a1d",
  //   borderRadius: 50,
  //   padding: 10,
  // },
  // toggleButtonText: {
  //   fontSize: 16,
  // },
  // toggle: {
  //   width: 50,
  //   height: 30,
  //   backgroundColor: "#e1e1e1",
  //   borderRadius: 50,
  //   position: "relative",
  // },
  // toggleOn: {
  //   backgroundColor: "#0268EC",
  // },
  // toggleHandle: {
  //   width: 24,
  //   height: 24,
  //   backgroundColor: "#fff",
  //   borderRadius: 46,
  //   position: "absolute",
  //   top: 3,
  //   left: 3,
  //   elevation: 2,
  // },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
