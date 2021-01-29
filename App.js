import React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import reducer from "./reducers/index";
import middleware from "./middleware/index";
import AppContent from "./components/AppContent";

export default function App() {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: "tomato",
            accent: "yellow",
        },
    };
    const store = createStore(reducer, middleware);

    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <AppContent />
            </PaperProvider>
        </Provider>
    );
}
