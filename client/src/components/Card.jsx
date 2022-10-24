import React from "react";
import"./Card.css"

export default function Card({ name, image, temperament, temperaments, weightMin, weightMax}){
    console.log (temperament) 
    console.log (temperaments) 
    return (

       
        <div className="card"> 
        <h3 className="name"> {name}</h3>

        <img className="image" src={image} alt="img not found" width="200px" height= "250px" />

        
        <h3> Weight Min:{weightMin} </h3>
        <h3> Weight Max: {weightMax}</h3>
        
            <h3 className="t"> Temperament: {temperament} </h3> 


           
           
        {/* llegan tanto temperaments como temperament ver como hacer para que filtre cual llega */}
       
    </div>

   

    )
}