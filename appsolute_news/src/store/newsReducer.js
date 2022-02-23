import {LOADING, NEWS_LIST, SINGLE_NEWS_DETAILS, ERROR} from "./actions";

const initialState = {
    newsList: [],
    loading: false,
    error: false,
}

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                // get previous state
                ...state,
                // return new state
                loading: action.payload
            }
        case NEWS_LIST:
            return {
                ...state,
                newsList: [action.payload]
                // newsList: [...state.newsList, action.payload] // we write this if we need to stock the previous states in the array of states
            }
        case SINGLE_NEWS_DETAILS:
            return {
                ...state,
                singleNewsDetails: [action.payload]
                // userInfos: [...state.singleNewsDetails, action.payload]
            }
        case ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
};