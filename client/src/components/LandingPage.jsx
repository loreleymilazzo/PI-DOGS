import React from "react"; 
import {Link} from "react-router-dom";
import './LandingPage.css'

export default function LandingPage () {
    return (
        <div >
            <div >
                <br/>
                <br/>
                <br/>
            <h1 className= "letters">¿Cuál es tu raza favorita?</h1>
            <p> Elegí la que más te guste o creá una nueva</p>
        
            <Link to='/home'>
                <button className="button">Inicio</button>
            </Link>
            </div>
            <div >

            </div>
        </div>
    )
}