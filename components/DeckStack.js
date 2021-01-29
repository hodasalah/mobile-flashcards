import React from "react";
import DeckDetail from "./views/DeckDetail";
import AddCard from "./views/AddCard";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DecksList from "./views/DecksList";
import Quiz from "./views/Quiz";

const DeckStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="flashCards">
            <Stack.Screen name="flashCards" component={DecksList} />
            <Stack.Screen name="DeckDetail" component={DeckDetail} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
    );
};

export default DeckStack;
