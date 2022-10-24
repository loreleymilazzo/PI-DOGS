import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postDog, getTemperaments } from '../actions/actions.js';
import { useDispatch, useSelector } from "react-redux";
import "./DogCreate.css";

function validate(input) {
    let errors = {};                             //genero un objeto errores
    if (!input.name) {                           //input es mi estado local, si en mi estadolocal.name no hay nada
        errors.name = "Debe colocar un nombre";        //entonces en mi objeto.name pongo un string que diga se requiere un nombre
    }  else if (!input.heightMax) {
        errors.heightMax = "Debe colocar altura máxima";
    } else if (input.heightMax <= 0) {
        errors.heightMax = "La altura máxima no puede ser menor a 0";
    }else if (!input.heightMin) {
      errors.heightMin = "Debe colocar altura mínima";
    } else if (input.heightMin <= 0) {
       errors.heightMin = "La altura mínima no puede ser menor a 0";
    } else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {      //convierto el peso que me viene en string en un entero para compararlo
         errors.heightMax = "La altura máxima debe ser mayor que la altura mínima";
    }else if (!input.weightMax) {
            errors.weightMax = "Debe colocar peso máximo";
       } else if (input.weightMax <= 0) {
             errors.weightMax = "El peso máximo no puede ser menor a 0";}
     else if (!input.weightMin) {
        errors.weightMin = "Debe colocar peso mínimo";
    } else if (input.weightMin <= 0) {
         errors.weightMin = "El peso mínimo no puede ser menor a 0";
       }  else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {      //convierto el peso que me viene en string en un entero para compararlo
         errors.weightMax = "El peso máximo debe ser mayor que el peso mínimo";
     }  else if (!input.life_span) {
         errors.life_span = "Tiempo estimado de vida debe estar completo";
     } else if (input.life_span <= 0) {
        errors.life_span  = "Tiempo estimado de vida debe ser mayor a 0";
     } else if (input.life_span > 20) {
         errors.life_span  = "Tiempo estimado de vida debe ser menor que 20";
     } else if (!input.image) {
        errors.image = "Debe ingresar el URL de la imagen";
     } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
       ) {
         errors.image = "Please insert a valid image URL";
     }
    return errors;
};



export default function DogCreate(){

    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state)=>state.temperament)
    const [errors, setErrors] = useState({});  //genero un estado local errors y setErrors que va ser un objeto vacío  

   

    const [input, setInput] = useState({
        name: "",
        image: "",
        heightMax: "",
        heightMin: "",
        weightMax: "" ,
        weightMin: "" ,
        life_span: "",
        temperament: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({                 //seteame mi estado errores, pasándole la función validate de más arriba,
            ...input,                        //con el estado input y el e.target.name en el e.target.value
            [e.target.name] : e.target.value
        }));
        console.log(input)
     };

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Perro creado")
        setInput({
        name: "",
        image: "",
        heightMax: "",
        heightMin: "",
        weightMax: "" ,
        weightMin: "" ,
        life_span: "",
        temperament: [],
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            type: input.type.filter(typ => typ !== el)
        })
    }

    useEffect(()=>{
        dispatch(getTemperaments())
    },[])

    
    return(
        
        <div className= "create-form">

        <Link to= '/Home'><button className= "button-form">Volver</button></Link>
            
            <h1 >Crea tu perro</h1>
           
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <label>Nombre: </label>
                <input
                className="inputs"
                type= "text" 
                value= {input.name}
                name= "name"
                onChange={(e)=>handleChange(e)}
                />
                {errors.name && (    //si está mi estado errors.name renderiza un párrafo con ese error
                                    <p >{errors.name}</p>
                                )}    
                    
                </div>
                <div >
                <label>Altura Maxima: </label>
                <input 
                className="inputs"
                 type= "number" 
                 value= {input.heightMax}
                 name= "heightMax"
                 onChange={(e)=>handleChange(e)}
                />
                {errors.heightMax && (
                                    <p >{errors.heightMax}</p>
                                )} 
                </div>
                <div >
                <label>Altura Minima: </label>
                <input 
                className="inputs"
                 type= "number" 
                 value= {input.heightMin}
                 name= "heightMin"
                 onChange={(e)=>handleChange(e)}
                />
               {errors.heightMin && (
                                    <p>{errors.heightMin}</p>
                                )} 
                </div>
                <div >
                <label>Peso Maximo: </label>
                <input 
                className="inputs"
                 type= "number" 
                 value= {input.weightMax}
                 name= "weightMax"
                 onChange={(e)=>handleChange(e)}
                />
                {errors.weightMax && (
                                    <p >{errors.weightMax}</p>
                                )}
                </div>
                <div >
                <label>Peso Minimo: </label>
                <input 
                className="inputs"
                 type= "number" 
                 value= {input.weightMin}
                 name= "weightMin"
                 onChange={(e)=>handleChange(e)}
                />
                {errors.weightMin && (
                                    <p >{errors.weightMin}</p>
                                )} 
                  
                </div>
                <div>
                <label>Años de vida: </label>
                <input 
                className="inputs"
                 type= "number" 
                 value= {input.life_span}
                 name= "life_span"
                 onChange={(e)=>handleChange(e)}
                />
                 {errors.life_span && (
                                    <p >{errors.life_span}</p>
                                )} 
                </div>
                <div >
                <label>Imagen: </label>
                <input 
                className="inputs"
                 type= "url" 
                 value= {input.image}
                 name= "image"
                 onChange={(e)=>handleChange(e)}
                />
                {errors.image && <p >{errors.image}</p>}
                </div>

                <select onChange={(e)=> handleSelect(e)}>
                    {temperament.map((temp) => (
                        <option value= {temp.name} key={temp.id}> {temp.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
                <button className="button-crear" type= 'submit'>Crear Personaje</button>
            </form>
            {input.temperament.map(el=>
                <div className= 'typeDiv'>
                    <p>{el}</p>
                    <button className="btn" onClick= {()=> handleDelete(el)}>x</button>
                    </div>
                    )}
        </div>
    )
}