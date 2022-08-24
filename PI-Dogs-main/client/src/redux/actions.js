import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_NAME = "GET_NAME"; 
export const GET_BY_NAME = "GET_BY_NAME";
export const CREATE_DOG = 'CREATE_DOG';
export const GET_BY_TEMPERAMENT = "GET_BY_TEMPERAMENT";
export const GET_BY_ORIGIN = "GET_BY_ORIGIN";
export const GET_BY_WEIGHT = "GET_BY_WEIGHT";
export const CLEAN_DOG = "CLEAN_DOG"


export const getDogs = ()=> {
    return async (dispatch) => {
        let response = await axios.get('http://localhost:3001/dogs');
        dispatch ({
            type: GET_DOGS,
            payload: response.data
        })
    }
}

export const getTemperaments = ()=> {
    return async (dispatch)=> {
        let response = await axios.get('http://localhost:3001/temperaments');
        return dispatch ({
            type: GET_TEMPERAMENTS,
            payload: response.data
        })
    }
}

export const getByID = (id)=> {
    return async (dispatch)=> {
        let response = await axios.get ('http://localhost:3001/dogs/' + id);
        return dispatch ({
            type: GET_BY_ID,
            payload: response.data
        })
    }
}

export function getName(name) {
    return function (dispatch) {
        axios.get('http://localhost:3001/dogs?name=' + name)
        .then((res) => {
            dispatch({
              type: GET_NAME,
              payload: res.data,
            });
          })
          .catch((err) => console.log(err));
    }
}

export const createDog = (payload)=> {
    return async function (dispatch) {
        try {
        let response = await axios.post ('http://localhost:3001/dogs', payload);
        return dispatch ({
            type: CREATE_DOG,
            payload: response.data
        })
    }catch(e) {
            return e;
        }
    }
}

export const filterDogByTemperament = (payload)=>{
    return{
        type: GET_BY_TEMPERAMENT,
        payload
    }
}

export const filterByOrigin = (payload)=>{
    return {
        type: GET_BY_ORIGIN,
        payload
    }
}

export const filterByName = (payload)=>{
    return {
        type: GET_BY_NAME,
        payload
    }
}

export const filterByWeight = (payload)=>{
    return {
        type: GET_BY_WEIGHT,
        payload
    }
}

export function cleanDogs(){
    return{
        type: CLEAN_DOG
    }
  }