import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Constants from "expo-constants";
import Welcome from "./views/Welcome";
import AppTabs from "./AppTabs";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


function AppStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

export class AppContent extends Component {
    render() {
        const Tab = createBottomTabNavigator();
        return (
            <View style={styles.container}>
                <AppStatusBar
                    backgroundColor="#7f74eb"
                    barStyle="light-content"
                />
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="Welcome"
                        tabBar={() => null}
                    >
                        <Tab.Screen name="Welcome" component={Welcome} />
                        <Tab.Screen name="AppTabs" component={AppTabs} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
export default AppContent;
