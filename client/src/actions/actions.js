import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch ({  
        type:"GET_DOGS",
        payload: json.data
    })
    }
}

export function getNameDogs(name){ //por payload va a llegar lo que el usuario me pase
    return async function (dispatch){
        try {
            var json = await axios.get ("http://localhost:3001/dogs?name=" + name);
            return dispatch ({
                type: "GET_NAME_DOGS",
                payload: json.data //lo que devuelve la ruta, una vez que yo le asigno algo por name
            }) 
        } catch (error){
            console.log(error)
        }
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/temperaments`)
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: data
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const filterTemperament = (payload) => {
    console.log(payload)
                  return ({
                type: "FILTER_TEMPERAMENT",
                payload
            })
           }


export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export function postDog (payload){
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/dog',payload);
        console.log(response)
        return response; 
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return {
      type: 'ORDER_BY_WEIGHT',
      payload
    }
  }

  export function getDetail(id){
    return async function(dispatch){
        try {
          var json = await axios.get('http://localhost:3001/dogs/' + id)

            return dispatch({
                type : 'GET_DETAIL',
                payload : json.data
            })
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

 