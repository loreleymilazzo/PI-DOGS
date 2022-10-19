import React from "react";

export default function Card({ name, image, temperament, minWeight, maxWeight }){
    return (
       
        <div>
        <h3>{name}</h3>
        <h3>{temperament}</h3>
        <h3>{minWeight}</h3>
        <h3>{maxWeight}</h3>

        <img src={image} alt="img not found" width="200px" height= "250px" />

    </div>

   

    )
}