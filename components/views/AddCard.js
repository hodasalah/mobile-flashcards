import React, { Component } from "react";
import { ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { Card, Title, TextInput, Button, Colors } from "react-native-paper";
import { connect } from "react-redux";
import { handleAddCardToDeck } from "../../actions/index";
class AddCard extends Component {
    state = {
        question: "",
        answer: "",
    };
    _handleChangeVal = (name) => {
        return (val) => {
            this.setState({ [name]: val });
        };
    };
    onSavingCard = () => {
        const id = this.props.route.params.deckId;
        const card = this.state;
        this.props.dispatch(handleAddCardToDeck(id, card));
        this.props.navigation.goBack();
    };
    render() {
        const { question, answer } = this.state;
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <Card
                        style={{
                            margin: 10,
                        }}
                    >
                        <Card.Content>
                            <Title>ADD NEW QUESTION</Title>

                            <TextInput
                                label="Your Question"
                                value={question}
                                onChangeText={this._handleChangeVal("question")}
                                mode="outlined"
                            />
                            <TextInput
                                label="Your Answer"
                                value={answer}
                                onChangeText={this._handleChangeVal("answer")}
                                mode="outlined"
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                style={{
                                    paddingHorizontal: 40,
                                    paddingVertical: 12,
                                    backgroundColor:
                                        !question || !answer
                                            ? "#ccc"
                                            : "#7f74eb",
                                    margin: 10,
                                }}
                                onPress={this.onSavingCard}
                                disabled={!question || !answer}
                            >
                                <Text
                                    style={{
                                        color: Colors.white,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Save Question
                                </Text>
                            </Button>
                        </Card.Actions>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(null)(AddCard);
