import { GET_DOGS , GET_TEMPERAMENTS, GET_BY_ID, GET_NAME, GET_BY_TEMPERAMENT, GET_BY_NAME, GET_BY_ORIGIN, GET_BY_WEIGHT, CLEAN_DOG, SET_PAGE} from "./actions"; 

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
                dogs: action.payload
            }
            case GET_BY_TEMPERAMENT:
                return {
                ...state,
                dogs: action.payload,
            }
            case GET_BY_ORIGIN:
            if(action.payload === 'db') {
               return {
                ...state,
                dogs: state.createdDog.filter(b => b.id.length >= 36)
            }
            }else if (action.payload === 'api') {
                return {
                    ...state,
                    dogs: state.createdDog.filter(b => typeof(b.id) === 'number')}
            }else{
                return {
                    ...state,
                    dogs: state.createdDog,
                }
            };
            case GET_BY_NAME:
            const breedsName = state.createdDog;
            const filteredBreedByName = action.payload === 'A-Z' ? breedsName.sort(function (a,b){
                if(a.name>b.name) return 1;
                if(a.name<b.name) return -1;
                else return 0;
            }) :
            breedsName.sort(function (a,b){
                if(a.name>b.name) return -1;
                if(a.name<b.name) return 1;
                else return 0;
            })
            return {
                ...state,
                dogs: filteredBreedByName
            };
            case GET_BY_WEIGHT:        
            const filteredByWeight = action.payload === 'less' ? 
            state.createdDog.sort(function(a,b){
                const itemA = parseInt(a.weightMin);
                const itemB = parseInt(b.weightMin);
                console.log(itemA);
                console.log(itemB);
                return itemA - itemB;
            }) : 
             state.createdDog.sort(function(a,b){
                const itemA = parseInt(a.weightMin);
                const itemB = parseInt(b.weightMin);
                console.log(itemA);
                console.log(itemB);
                return itemB - itemA;
            })
            return {
                ...state,
                dogs: filteredByWeight
            };
            case CLEAN_DOG:
            return{
                ...state,
                dogDetail: []
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