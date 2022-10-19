import React from "react"; 
import {Link} from "react-router-dom";
import styles from './LandingPage.css'

export default function LandingPage () {
    return (
        <div >
            <div >
            <h1>¿Cuál es tu raza favorita?</h1>
            <p>Elegí la que más te guste, o crea una nueva!</p>
            <Link to='/home'>
                <button className="button">Inicio</button>
            </Link>
            </div>
            <div >

            </div>
        </div>
    )
}