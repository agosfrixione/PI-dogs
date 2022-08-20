import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BY_ID = "GET_BY_ID"; 
export const GET_BY_NAME = "GET_BY_NAME"
export const CREATE_DOG = 'CREATE_DOG'


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

export function getByName(name) {
    return function (dispatch) {
        axios.get('http://localhost:3001/dogs?name=' + name)
        .then((res) => {
            dispatch({
              type: GET_BY_NAME,
              payload: res.data,
            });
          })
          .catch((err) => console.log(err));
    }
}

export const createDog = (obj)=> {
    return async (dispatch)=> {
        let response = await axios.post ('http://localhost:3001/dogs', obj);
        return dispatch ({
            type: CREATE_DOG,
            payload: response.data
        })
    }
}