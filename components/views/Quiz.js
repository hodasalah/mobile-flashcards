import React, { Component } from "react";
import {
    clearLocalNotification,
    setLocalNotification,
} from "../../utils/helpers";
import { Colors, FAB, Text, Button } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CardFlip from "react-native-card-flip";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { connect } from "react-redux";
import Main from "../Main";

class Quiz extends Component {
    state = {
        cardRotated: false,
        questionIndex: 0,
        correctCount: 0,
        quizCompleted: false,
        viewedAnswer: 0,
        actionsDisabled: false,
        actionsFadeValue: new Animated.Value(1),
    };

    handleAnimation = () => {
        Animated.timing(this.state.actionsFadeValue, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    handleCardFlip() {
        if (!this.state.quizCompleted) {
            this.card.flip();
            if (!this.state.cardRotated) {
                this.setState({
                    viewedAnswer: ++this.state.viewedAnswer,
                });
            }
        }
    }
    setupNotificaiton() {
        clearLocalNotification().then(setLocalNotification);
    }
    handleMarkQuestion(isCorrect) {
        if (!this.state.quizCompleted) {
            const updatedQuestionIndex = this.state.questionIndex + 1;
            this.state.viewedAnswer === 0 && this.handleCardFlip();
            this.handleAnimation();
            this.setState({
                actionsDisabled: true,
            });

            setTimeout(() => {
                if (this.props.deck.questions.length !== updatedQuestionIndex) {
                    this.handleCardFlip();
                    this.handleAnimation();
                }
                setTimeout(() => {
                    this.setState((prevstate, props) => {
                        return {
                            correctCount: isCorrect
                                ? ++prevstate.correctCount
                                : prevstate.correctCount,
                            questionIndex: updatedQuestionIndex,
                            quizCompleted:
                                props.deck.questions.length ===
                                updatedQuestionIndex,
                            viewedAnswer: 0,
                            actionsDisabled: false,
                        };
                    });
                }, 400);
            }, 1000);
        } else {
            this.setupNotificaiton();
        }
    }

    /**in Quiz completed case */
    restartQuiz() {
        this.setState({
            cardRotated: false,
            correctCount: 0,
            questionIndex: 0,
            quizCompleted: false,
            viewedAnswer: 0,
        });
        if (!this.state.cardRotated) {
            this.handleCardFlip();
        }
    }

    render() {
        const { questions } = this.props.deck;
        const { questionIndex, actionsDisabled, actionsFadeValue } = this.state;
        return (
            <Main>
                {this.state.quizCompleted ? (
                    <View style={styles.quizCompletedContainer}>
                        <Text style={styles.deckTitle}>Quiz Completed</Text>
                        <Text style={styles.deckCardCount}>
                            You have answered{" "}
                            {Math.round(
                                (this.state.correctCount /
                                    this.props.deck.questions.length) *
                                    100
                            )}
                            % correct
                        </Text>
                        <Button
                            mode="contained"
                            onPress={() => this.restartQuiz()}
                            style={[styles.btn, { backgroundColor: "#ffb955" }]}
                        >
                            <Text
                                style={{
                                    color: Colors.blueGrey900,
                                    fontWeight: "bold",
                                }}
                            >
                                Restart Quiz
                            </Text>
                        </Button>

                        <Button
                            mode="outlined"
                            style={[styles.btn, { backgroundColor: "#505c6e" }]}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                Back to Deck
                            </Text>
                        </Button>
                    </View>
                ) : (
                    <React.Fragment>
                        <View style={styles.cardContainer}>
                            <CardFlip
                                style={styles.cardFlip}
                                ref={(card) => (this.card = card)}
                            >
                                <TouchableOpacity
                                    style={[styles.card, styles.card1]}
                                    activeOpacity={0.9}
                                    onPress={() => this.handleCardFlip()}
                                >
                                    <Text style={[styles.label, styles.label1]}>
                                        {questions[questionIndex].question}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.card, styles.card2]}
                                    activeOpacity={0.9}
                                    onPress={() => this.handleCardFlip()}
                                >
                                    <Text style={[styles.label, styles.label2]}>
                                        {questions[questionIndex].answer}
                                    </Text>
                                </TouchableOpacity>
                            </CardFlip>
                            <Text style={styles.remainingQuestionText}>
                                {questions.length - questionIndex}{" "}
                                {questions.length - questionIndex > 1
                                    ? "questions "
                                    : "question "}
                                remaining
                            </Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <Button
                                style={[
                                    styles.fabCenter,
                                    actionsDisabled && {
                                        opacity: actionsFadeValue,
                                    },
                                ]}
                                disabled={actionsDisabled}
                                small
                                icon="rotate-right"
                                color={Colors.white}
                                onPress={() => this.handleCardFlip()}
                            >
                                <Text
                                    style={{
                                        color: Colors.white,
                                        fontSize: 15,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Show Answer
                                </Text>
                            </Button>
                            <FAB
                                style={[
                                    styles.fab,
                                    styles.fabLeft,
                                    actionsDisabled && {
                                        opacity: actionsFadeValue,
                                    },
                                ]}
                                disabled={actionsDisabled}
                                color={Colors.red500}
                                icon="thumb-down"
                                onPress={() => this.handleMarkQuestion(false)}
                            />
                            <FAB
                                style={[
                                    styles.fab,
                                    styles.fabRight,
                                    actionsDisabled && {
                                        opacity: actionsFadeValue,
                                    },
                                ]}
                                disabled={actionsDisabled}
                                color={Colors.green500}
                                icon="thumb-up"
                                onPress={() => this.handleMarkQuestion(true)}
                            />
                        </View>
                    </React.Fragment>
                )}
            </Main>
        );
    }
}

function mapStateToProps(state, props) {
    const { deckId } = props.route.params;
    return {
        deck: state[deckId],
    };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animatedCardContainer: { flex: 1 },
    root: {
        backgroundColor: "#4BB6F3",
    },
    cardContainer: {
        flex: 4,
        alignItems: "center",
    },
    cardFlip: {
        flex: 1,
        height: hp("100%"),
        width: wp("100%") - 45,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    actionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 2,
            height: 1,
        },
        shadowOpacity: 0.8,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginTop: 10,
    },
    card1: {
        backgroundColor: "#7f74eb",
    },
    card2: {
        backgroundColor: "#00c9b5",
    },
    label: {
        textAlign: "center",
        fontSize: 24,
        padding: 20,
        fontFamily: "System",
    },
    label1: { color: Colors.white },
    label2: { color: Colors.blueGrey900 },
    fab: {
        position: "absolute",
        marginHorizontal: 20,
        bottom: 0,
        zIndex: 9999,
        borderWidth: 5,
        borderRadius: 50,
        backgroundColor: Colors.grey200,
    },

    remainingQuestionText: {
        fontSize: 16,
        paddingVertical: 4,
        color: Colors.grey500,
    },
    fabCenter: {
        marginBottom: 50,
        borderWidth: 0,
        backgroundColor: Colors.purple500,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 50,
    },
    fabLeft: {
        left: 0,
        marginBottom: 5,
        borderColor: Colors.red500,
    },
    fabRight: {
        right: 0,
        marginBottom: 5,
        borderColor: Colors.green500,
    },
    deckTitle: {
        fontSize: 35,
        color: Colors.blueGrey500,
        textTransform: "capitalize",
    },
    deckCardCount: {
        color: Colors.blueA200,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    btn: {
        width: wp("100%") - 30,
        paddingVertical: 12,
        backgroundColor: "#7f74eb",
        marginTop: 10,
    },

    quizCompletedContainer: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});
