

const initialState = {
        dogs: [],
        detail: [],
        temperament:[],
        allDogs:[]
}

function rootReducer (state= initialState, action){
  
        switch (action.type){
            case "GET_DOGS":
            
            return{
                ...state, 
                dogs: action.payload,
                allDogs: action.payload 
               
            }

            case 'GET_NAME_DOGS':
                return {
                    ...state,
                    dogs: action.payload
                }
            case 'GET_TEMPERAMENTS':
            
            return{
                ...state,
                temperament: action.payload     
             }
             case "FILTER_TEMPERAMENT" :   
             const allDogs = state.allDogs;
             let filteredDogs
             if (action.payload === "Temperaments") {
               filteredDogs = allDogs
             } else {
               filteredDogs = 
              allDogs.filter((d) =>
              d.temperament?.includes(action.payload)       
              );
             } 
             return {
                 ...state,
                 dogs: filteredDogs,                 
             }

             case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "minWeight"
          ? state.dogs.sort((a, b) => {
              if (parseInt(a.minWeight) < parseInt(b.minWeight)) return -1; // si el peso de a es menor que el de b, a va antes que b
              if (parseInt(a.minWeight) > parseInt(b.minWeight)) return 1; // si el peso de a es mayor que el de b, a va despues que b
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.minWeight) > parseInt(b.minWeight)) return -1; // si el peso de a es mayor que el de b, a va antes que b
              if (parseInt(a.minWeight) < parseInt(b.minWeight)) return 1; // si el peso de a es menor que el de b, a va despues que b
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };

      case 'POST_DOG':
        return {
          ...state,
        }


       

             case 'FILTER_CREATED':
                const allDogs2 = state.allDogs
                const createdFilter = action.payload === 'created' ? allDogs2.filter(el => el.createdInDb) : allDogs2.filter( el => !el.createdInDb)
                    return {
                        ...state,
                        dogs: action.payload === 'all' ? state.allDogs : createdFilter 
                    }

                    case "ORDER_BY_NAME":
                        let  orderDogs 
                        if (action.payload === "asc") {
                            orderDogs = state.dogs.sort(function (d1, d2) {
                            if (d1.name.toLowerCase() < d2.name.toLowerCase()) {return -1; }
                             if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return 1; }
                                        return 0;
                           }) 
                        } else if (action.payload === "desc"){
                          orderDogs = state.dogs.sort(function (d1, d2) {
                         if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return -1;}
                         if (d1.name.toLowerCase() < d2.name.toLowerCase()) { return 1; }
                             return 0;
                          });
                        } 
                        else {
                          orderDogs = state.allDogs
                        }
                      
                      return {
                        ...state,
                        dogs: orderDogs,
                      };
            case "GET_DETAIL" :
              return{
                ...state,
                detail: action.payload
              }      
                      
            
            default:
                return state;
        }

}

export default rootReducer 