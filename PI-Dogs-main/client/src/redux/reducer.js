import { GET_DOGS , GET_TEMPERAMENTS, GET_BY_ID, GET_NAME, CREATE_DOG, GET_BY_TEMPERAMENT, GET_BY_NAME, GET_BY_ORIGIN, GET_BY_WEIGHT, CLEAN_DOG} from "./actions"; 

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
        case GET_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case CREATE_DOG:
            return {
                
            }
            case GET_BY_TEMPERAMENT:
            const breeds = state.createdDog;
            const filteredBreed = action.payload ==='all' ? breeds : breeds.filter(b =>{
                if(typeof b.temperaments === 'string'){
                    return b.temperaments.includes(action.payload);
                }
                return true;
            })
            return {
                ...state,
                breed: filteredBreed
            };
            case GET_BY_ORIGIN:
            const breedsByOrigin = state.createdDog;
            const filteredBreedByOrigin = action.payload === 'db' ? breedsByOrigin.filter(b => b.created) : breedsByOrigin.filter(b => !b.created);
            return {
                ...state,
                dogs: action.payload === 'all' ? breedsByOrigin : filteredBreedByOrigin
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
                breed: filteredBreedByName
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
                breed: filteredByWeight
            };
            case CLEAN_DOG:
            return{
                ...state,
                breedDetail: []
            };
        default:
            return state;
    }
}