import React, { Component } from "react";
import { ScrollView, KeyboardAvoidingView, Text } from "react-native";
import {
    Card,
    TextInput,
    Button,
    Colors,
    Title,
    Divider,
} from "react-native-paper";
import { handleAddingDeck } from "../../actions/index";
import { connect } from "react-redux";

class AddDeck extends Component {
    state = {
        title: "",
    };
    handleChangeVal = (newTitle) => {
        return this.setState({ title: newTitle });
    };
    onSavingCard = () => {
        const title = this.state.title;
        this.props.dispatch(handleAddingDeck(title));
        this.setState({ title: "" });
        this.props.jumpTo("Decks");
    };
    render() {
        const { title } = this.state;
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <Card
                        style={{
                            margin: 10,
                        }}
                    >
                        <Card.Content>
                            <Text
                                style={{
                                    fontSize: 25,
                                    color: Colors.blueGrey700,
                                    paddingBottom: 25,
                                    fontWeight: "bold",
                                }}
                            >
                                ADD NEW DECK
                            </Text>
                            <Divider />
                            <Title
                                style={{
                                    color: "#7f74eb",
                                }}
                            >
                                What Is Your New Deck's Title ?
                            </Title>
                            <TextInput
                                label="your Deck Title"
                                value={title}
                                onChangeText={this.handleChangeVal}
                                mode="flat"
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                style={{
                                    paddingHorizontal: 40,
                                    paddingVertical: 12,
                                    backgroundColor: !title
                                        ? "#ccc"
                                        : "#7f74eb",
                                    margin: 10,
                                }}
                                onPress={this.onSavingCard}
                                disabled={!title}
                            >
                                <Text
                                    style={{
                                        color: Colors.white,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Create Deck
                                </Text>
                            </Button>
                        </Card.Actions>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(null)(AddDeck);
