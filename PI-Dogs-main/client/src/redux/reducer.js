import { GET_DOGS , GET_TEMPERAMENTS, GET_BY_ID, GET_BY_NAME, CREATE_DOG} from "./actions"; 

let initialState = {
    dogs: [],
    temperaments: [],
    createdDog: [],
    dogDetail: [],
    loader: true
};

export default function rootReducer(state= initialState, action){
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                createdDog: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_BY_ID:
            return {
                ...state,
                dogDetail: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case CREATE_DOG:
            return {
                
            }
        default:
            return state;
    }
}