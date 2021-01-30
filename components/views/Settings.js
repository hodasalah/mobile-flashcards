import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Colors } from "react-native-paper";
import { connect } from "react-redux";
import { handleResetStore } from "../../actions/index";

export class Settings extends Component {
    handleResetDecks = () => {
        this.props.dispatch(handleResetStore());
        this.props.jumpTo("Decks");
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Settings </Text>
                <View style={styles.block}>
                    <View style={styles.blockContainer}>
                        <Text style={styles.blockText}>
                            This will reset the data back to the original data
                            set.
                        </Text>
                        <View style={{ height: 20 }} />
                        <Button
                            btnStyle={{
                                backgroundColor: Colors.red900,
                                borderColor: Colors.white,
                            }}
                            onPress={this.handleResetDecks}
                        >
                            Reset Data
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: Colors.grey900,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 16,
        color: "#fff",
    },
    block: {
        marginBottom: 20,
    },
    blockContainer: {
        borderWidth: 1,
        borderColor: "#aaa",
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 20,
    },
    blockText: {
        fontSize: 18,
        color: Colors.blueGrey500,
    },
});

export default connect(null)(Settings);
