import {React , useEffect} from "react";
import {Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getDetail } from "../actions/actions.js";
import "./Detail.css";

export default function Detail(props){
  console.log(props)

  const dispatch = useDispatch()

  useEffect(()=> {
      dispatch(getDetail(props.match.params.id))
  },[dispatch])

  const myDog = useSelector ((state) => state.detail)

    return (
      
      <div className= "cardContainer">
      {
             myDog.length>0 ?
             <div  >
        
         
         
                 
                 
                 <div  >
                 {/* <h3>Id: {myDog[0].id}</h3> */}

                 <h1 className="cardTitle" >{myDog[0].name}</h1>

                 <img  className= "imagdetalle" src={myDog[0].image} alt="img dog" width="550px" height="350px"/>
                 
                 <h2 >Weight:</h2><p >{myDog[0].weightMin} kgs -  {myDog[0].weightMax} kgs </p>

                 <h2 > Height: </h2> <p > {myDog[0].heightMin} cm - {myDog[0].heightMax} cm   </p> 
                 
                 <h3>Temperament: {!myDog[0].createdInDb? myDog[0].temperament + ' ' : myDog[0].temperament} </h3>

                 <h3>Life span: {myDog[0].life_span}</h3> 
                 <br/>
                 </div>
             </div>: <p> Loading...</p> 
              
          }

<Link to= '/home'>
              <button className= "boton">Home</button>
          </Link>
      </div>
     
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
//                       : e.
//                       ? e.temperaments.join(", ")
//                       : "No temperaments"}
//                   </p>
//                 </div>
//                 </div> : <p> ... Loading </p>
          
           
//             }  
           
//             </div>

    
//     )
// } 