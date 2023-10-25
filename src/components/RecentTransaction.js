import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Carousel from 'react-native-snap-carousel';

// const listTransations = [
//   {
//     type: "Spotify",
//     icon: require("../../assets/ic_spotify.png"),
//     date: "Jun 12, 12:30",
//     payment: "+ $12",
//   },
//   {
//     type: "Paypal",
//     icon: require("../../assets/ic_paypal.png"),
//     date: "Jun 12, 12:30",
//     payment: "+ $12",
//   },
//   {
//     type: "Dribble",
//     icon: require("../../assets/ic_dribble.png"),
//     date: "Jun 12, 12:30",
//     payment: "+ $14",
//   },
// ];

// const renderTransactionItem = (item) => (
//   <View key={item.type} style={styles.items}>
//     <View style={styles.icon}>
//       <Image source={item.icon} />
//     </View>
//     <View style={styles.itemBody}>
//       <Text style={styles.type}>{item.type}</Text>
//       <Text style={styles.date}>{item.date}</Text>
//     </View>
//     <View>
//       <Text style={styles.payment}>{item.payment}</Text>
//     </View>
//   </View>
// );

const RecentTransaction = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headText}>
        <Text style={{ fontWeight: 500, fontSize: 16 }}>Transactions</Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#8b5cf6",
            fontSize: 18,
          }}
        >
          See All
        </Text>
      </View>
      <View style={styles.list}>
        <View style={{ marginBottom: 40 }}>
          <View
            style={{
              backgroundColor: "#9c9c9c",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://static.news.bitcoin.com/wp-content/uploads/2023/01/etherssdd.jpg",
              }}
              resizeMode="cover"
              style={{ padding: 20, borderRadius: 15 }}
              imageStyle={styles.imageBg}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>New feature</Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 25 }}
              >
                Crypto Account
              </Text>
              <TouchableOpacity style={styles.createBtn}>
                <Text
                  style={{ color: "#fff", textAlign: "center", fontSize: 14 }}
                >
                  Create
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: 20 }}>
            Net worth
          </Text>
          <View
            style={{
              padding: 20,
              backgroundColor: "rgb(247,247,247)",
              borderRadius: 15,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
              >
                € 0,00
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#9c9c9c",
                }}
              >
                Current value
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
              >
                <FontAwesome5
                  name="coins"
                  style={{ color: "#8b5cf6", fontSize: 20 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginBottom: 5,
                    }}
                  >
                    Cash balance
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#9c9c9c",
                    }}
                  >
                    4 accounts
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: 400, marginBottom: 5 }}
                >
                  € 0,00
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#9c9c9c",
                  }}
                >
                  100%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({
  headText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  containerBg: {
    padding: 20,
  },

  createBtn: {
    width: 70,
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 7,
    borderRadius: 30,
    backgroundColor: "#8b5cf6",
  },
});
