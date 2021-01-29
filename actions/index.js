import {
    getDecks,
    removeDeckAS,
    addingCardToDeck,
    saveDeck,
    resetDecks,
} from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";
export const RESET_STORE = "RESET_STORE";

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    };
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title,
    };
}

export function removeDeck(id) {
    return {
        type: REMOVE_DECK,
        id,
    };
}

export function addCardToDeck(id, card) {
    return {
        type: ADD_CARD,
        id,
        card,
    };
}

export function resetStore() {
    return {
        type: RESET_STORE,
    };
}
export function handleInitialData() {
    return (dispatch) => {
        return getDecks().then((decks) => dispatch(receiveDecks(decks)));
    };
}
export function handleRemoveDeck(id) {
    return (dispatch) => {
        return removeDeckAS(id).then(() => dispatch(removeDeck(id)));
    };
}
export function handleAddCardToDeck(id, card) {
    return (dispatch) => {
        return addingCardToDeck(id, card).then(() =>
            dispatch(addCardToDeck(id, card))
        );
    };
}
export function handleAddingDeck(title) {
    return (dispatch) => {
        return saveDeck(title).then(() => dispatch(addDeck(title)));
    };
}
export function handleResetStore() {
    return (dispatch) => {
        return resetDecks().then(() => dispatch(resetStore()));
    };
}
