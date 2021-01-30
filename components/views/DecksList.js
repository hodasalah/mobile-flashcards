import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Avatar, Card, Divider, Colors } from "react-native-paper";
import Main from "../Main";

class DecksList extends Component {
    onDeckCardPress(deck) {
        this.props.navigation.navigate("DeckDetail", {
            deckId: deck.title,
            title: deck.title,
        });
    }
    render() {
        const { decks } = this.props;
        
        return (
            <Main>
                <ScrollView>
                    {decks &&
                        Object.keys(decks).map((id) => {
                            return (
                                decks[id] && (
                                    <TouchableOpacity
                                        key={id}
                                        onPress={() =>
                                            this.onDeckCardPress(decks[id])
                                        }
                                    >
                                        <Card.Title
                                            title={decks[id].title}
                                            left={(props) => (
                                                <Avatar.Icon
                                                    {...props}
                                                    style={styles.avatarIcon}
                                                    icon="folder"
                                                    color={Colors.white}
                                                />
                                            )}
                                            right={(props) => (
                                                <Avatar.Text
                                                    size={30}
                                                    style={styles.avatarText}
                                                    label={
                                                        decks[id].questions
                                                            .length
                                                    }
                                                />
                                            )}
                                        />
                                        <Divider />
                                    </TouchableOpacity>
                                )
                            );
                        })}
                </ScrollView>
                {/*  <FAB
                    style={styles.fab}
                    color={Colors.white}
                    icon="plus"
                    onPress={() => console.log("fab pressed")}
                /> */}
            </Main>
        );
    }
}
const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#7f74eb",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "500",
    },
    avatarIcon: {
        backgroundColor: "#00c9b5",
    },
    avatarText: {
        marginRight: 16,
        backgroundColor: "#ffb955",
    },
});

const mapStateToProps = (state) => ({
    decks: state,
});

export default connect(mapStateToProps)(DecksList);
