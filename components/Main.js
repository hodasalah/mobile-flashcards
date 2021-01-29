import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";

export class Main extends Component {
    componentDidMount() {
        this.props.data();
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container} behavior="padding">
                    {this.props.children}
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
function mapDispatchToProps(dispatch) {
    return {
        data: () => {
            dispatch(handleInitialData());
        },
    };
}
export default connect(null, mapDispatchToProps)(Main);
