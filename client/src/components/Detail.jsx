import {React , useEffect} from "react";
import {Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getDetail } from "../actions/actions.js";

export default function Detail(props){
  console.log(props)

  const dispatch = useDispatch()

  useEffect(()=> {
      dispatch(getDetail(props.match.params.id))
  },[dispatch])

  const myDog = useSelector ((state) => state.detail)

    return (
      <body className= "body">
      <div>
      {
             myDog.length>0 ?
             <div >
                 <h1 className= "nombreDetail">{myDog[0].name}</h1>
                 <img src={myDog[0].image}/>
                 <div className="infoDetail">
                 {/* <h3>Id: {myDog[0].id}</h3> */}
                 
                 <h2 >Weight:</h2><p >{myDog[0].minWeight} kgs -  {myDog[0].maxWeight} kgs </p>

                 <h2 > Height: </h2> <p > {myDog[0].minHeight} cm - {myDog[0].maxHeight} cm   </p> 
                 
                 <h3>Temperament: {!myDog[0].createdInDb? myDog[0].temperament + ' ' : myDog[0].temperament} </h3>

                 <h3>Life span: {myDog[0].life_span}</h3> 
                 <br/>
                 </div>
             </div>: <p> Loading...</p> 
              
          }

           <Link to= '/home'>
              <button className= "buttonDetail">Home</button>
          </Link>
      </div>
      </body>
      )

      };



//         <div>
//             <Link to = '/home'>
//                 <button>Volver</button>
//             </Link>

//             { myDog.length > 0 ? 
//             <div>

//                 <h1> {myDog[0].name}</h1> 
//                 <h1> {<img src={myDog[0].image} alt="img not found" width='500px' height='500px'/>}</h1>
//                 <div>
//                   <p>
//                     <strong>Height</strong> <br /> Min. {e.heightMin} cm - Max.{" "}
//                     {e.heightMax} cm{" "}
//                   </p>
//                   <p >
//                     <strong>Weight</strong> <br /> Min. {e.weightMin} kg - Max.{" "}
//                     {e.weightMax} kg
//                   </p>
//                   <p >
//                     {" "}
//                     <strong>Life Span</strong> <br /> {e.life_span}
//                   </p>
//                   <p >
//                     <strong>Temperament</strong> <br />
//                     {e.temperament
//                       ? e.temperament.join(", ")
//                       : e.temperaments
//                       ? e.temperaments.join(", ")
//                       : "No temperaments"}
//                   </p>
//                 </div>
//                 </div> : <p> ... Loading </p>
          
           
//             }  
           
//             </div>

    
//     )
// } 