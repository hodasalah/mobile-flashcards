import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
function Welcome({ navigation }) {
    const handlePress = () => {
        navigation.navigate("AppTabs");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Welcome To</Text>
            <Text style={styles.MainTitle}>Flash Cards</Text>
            <Image
                source={require("../../assets/bg.jpg")}
                resizeMode="contain"
                style={{ width: 400, height: 400, marginVertical: 15 }}
            />
            <TouchableOpacity style={styles.btn} onPress={handlePress}>
                <Text style={styles.btnText}>Start Now</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Welcome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    subtitle: {
        color: "#777",
        fontSize: 18,
    },
    MainTitle: {
        fontSize: 40,
        color: "#7F74EB",
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: "#7F74EB",
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 5,
    },
    btnText: {
        color: "#fff",
        fontSize: 20,
    },
});
