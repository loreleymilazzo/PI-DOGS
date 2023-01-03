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
                 
                 <h2 >Weight:</h2><p >{myDog[0].weightMin} kg -  {myDog[0].weightMax} kgs </p>

                 <h2 > Height: </h2> <p > {myDog[0].heightMin} cm - {myDog[0].heightMax} cm   </p> 
                 
                 <h3>Temperament: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))} </h3>

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


