import React from "react";
import { Platform, StyleSheet } from "react-native";
import DeckStack from "./DeckStack";
import AddDeck from "./views/AddDeck";
import Settings from "./views/Settings";
import * as Icon from "@expo/vector-icons";
import "react-native-gesture-handler";

import { BottomNavigation } from "react-native-paper";
function AppTabs() {
    const [index, setIndex] = React.useState(0);
    const isIOS = Platform.OS === "ios" ? true : false;
    const [routes] = React.useState([
        {
            key: "Decks",
            title: "Decks",
            icon: (props) => (
                <Icon.Ionicons
                    name={isIOS ? "ios-bookmarks" : "md-bookmarks"}
                    size={20}
                    color="#7f74eb"
                />
            ),
        },
        {
            key: "AddDeck",
            title: "AddDeck",
            icon: (props) => (
                <Icon.FontAwesome
                    name="plus-square"
                    size={20}
                    color="#7f74eb"
                />
            ),
        },
        {
            key: "Settings",
            title: "Settings",
            icon: (props) => (
                <Icon.FontAwesome name="sliders" size={20} color="#7f74eb" />
            ),
        },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        Decks: DeckStack,
        AddDeck: AddDeck,
        Settings: Settings,
    });
    return (
        <BottomNavigation
            activeColor="#7f74eb"
            inactiveColor="#555"
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: "#eee" }}
        />
    );
}

export default AppTabs;
