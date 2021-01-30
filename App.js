import React, { useEffect } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import reducer from "./reducers/index";
import middleware from "./middleware/index";
import AppContent from "./components/AppContent";
import { setLocalNotification } from "./utils/helpers";

export default function App() {
    useEffect(() => {
        setLocalNotification();
    }, []);
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
