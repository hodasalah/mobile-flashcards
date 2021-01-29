import {
    RECEIVE_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD,
    RESET_STORE,
} from "../actions";
import { decks } from "../utils/_DATA";

export default function decksReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            const { title } = action;
            return {
                ...state,
                [title]: {
                    title,
                    questions: [],
                },
            };
        case REMOVE_DECK:
            let updatedstate = { ...state };
            delete updatedstate[action.id];
            return updatedstate;
        case ADD_CARD:
            let { card } = action;
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    questions: [...state[action.id].questions].concat(card),
                },
            };
        case RESET_STORE:
            return decks;
        default:
            return state;
    }
}
