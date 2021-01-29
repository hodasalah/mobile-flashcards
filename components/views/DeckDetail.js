import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Colors } from "react-native-paper";
import { connect } from "react-redux";
import { handleRemoveDeck } from "../../actions/index";
import Main from "../Main";

class DeckDetail extends Component {
    onAddCardPress(id) {
        this.props.navigation.navigate("AddCard", {
            deckId: id,
        });
    }
    onStartQuizPress(id) {
        this.props.navigation.navigate("Quiz", {
            deckId: id,
        });
    }
    onDeleteDeckPress(id) {
        this.props.dispatch(handleRemoveDeck(id));
        this.props.navigation.goBack(null);
    }
    render() {
        const { deck, id } = this.props;

        console.log(this.props);
        return (
            <Main>
                {deck && (
                    <View style={styles.container}>
                        <Text style={styles.deckTitle}>{deck.title}</Text>
                        <Text style={styles.deckCardCount}>
                            {deck.questions.length}{" "}
                            {deck.questions.length <= 1 ? "Card" : "Cards"}
                        </Text>
                        <Button
                            style={[
                                styles.btn,
                                {
                                    backgroundColor:
                                        deck.questions.length === 0
                                            ? "#ccc"
                                            : "#7f74eb",
                                },
                            ]}
                            mode="contained"
                            disabled={deck.questions.length === 0}
                            onPress={() => this.onStartQuizPress(id)}
                        >
                            <Text style={[styles.text]}>Start Quiz</Text>
                        </Button>

                        <Button
                            style={[styles.btn, { backgroundColor: "#00c9b5" }]}
                            mode="contained"
                            onPress={() => this.onAddCardPress(id)}
                        >
                            <Text style={styles.text}>Add New Card</Text>
                        </Button>

                        <Button
                            style={styles.buttonDeleteDeck}
                            labelStyle={styles.buttonDeleteDeckLabel}
                            mode="text"
                            onPress={() => this.onDeleteDeckPress(id)}
                        >
                            Delete Deck
                        </Button>
                    </View>
                )}
            </Main>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#333",
        marginVertical: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#fff",
    },
    buttonDeleteDeckLabel: {
        color: Colors.red900,
        textTransform: "none",
        fontSize: 18,
    },
    deckTitle: {
        fontSize: 40,
        color: "#222",
        fontWeight: "bold",
        paddingTop: 16,
        paddingBottom: 4,
    },
    deckCardCount: {
        fontSize: 20,
        lineHeight: 26,
        color: "#7f74eb",
        textAlign: "center",
        marginBottom: 14,
    },
});
function mapStateToProps(state, props) {
    const { deckId } = props.route.params;
    return {
        deck: state[deckId],
        id: deckId,
    };
}
export default connect(mapStateToProps)(DeckDetail);
