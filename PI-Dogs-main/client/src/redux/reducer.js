import { GET_DOGS , GET_TEMPERAMENTS, GET_BY_ID, GET_NAME, GET_BY_TEMPERAMENT, GET_BY_NAME, GET_BY_ORIGIN, GET_BY_WEIGHT, CLEAN_DOG, SET_PAGE } from "./actions"; 

let initialState = {
    dogs: [],
    temperaments: [],
    createdDog: [],
    dogDetail: [],
    loader: true,
    currentPage: 1
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
        case GET_NAME:
            return {
                ...state,
                createdDog: action.payload
            }
            case GET_BY_TEMPERAMENT:
                return {
                ...state,
                createdDog: [...state.dogs].filter((t)=> t.temperament && t.temperament.includes(action.payload)),
            }
            case GET_BY_ORIGIN:
                return {
                    ...state,
                    createdDog: action.payload,
                }
            case GET_BY_NAME:
            const filteredBreedByName = action.payload === 'A-Z' ? [...state.createdDog].sort(function (a,b){
                if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
                if(a.name<b.name) return -1;
                else return 0;
            }) :
            [...state.createdDog].sort(function (a,b){
                if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
                else return 0;
            })
            return {
                ...state,
                createdDog: [...filteredBreedByName]
            };
            case GET_BY_WEIGHT:        
            const filteredByWeight = action.payload === 'less' ? 
            [...state.createdDog].sort(function (a,b){
                return parseInt(a.weightMin) - parseInt(b.weightMin)
            })
             : 
             [...state.createdDog].sort(function(a,b){
                return parseInt(b.weightMin) - parseInt(a.weightMin)
            })
            return {
                ...state,
                createdDog: filteredByWeight
            };
            case CLEAN_DOG:
            return{
                ...state,
                dogDetail: action.payload
            };
            case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}