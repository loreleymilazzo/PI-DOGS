import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom' ;
import {postDog, getTemperaments} from '../actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';


export default function DogCreate (){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state) => state.temperament)


    const [input, setInput] = useState({
        name: "",
        temperament: [],
        heightMax: "0",
        heightMin: "0",
        weightMax: "0",
        weightMin: "0",
        life_span: "",
        image:"",


    })

    useEffect(() =>{
        dispatch(getTemperaments())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.type, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Raza creada")
        setInput({
            name: "",
            temperament: [],
            heightMax: 0,
            heightMin: 0,
            weightMax: 0,
            weightMin: 0,
            life_span: 0,
            image:"",
        })
        history.push('/home')
    }
    
    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(te => te !== el)
        })
    }


    return (
        <div>   
            <Link to= '/home'> <button> Volver </button></Link>
            <h1>Crea tu raza de perro</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Nombre: </label>
                <input
                type= "text" 
                value= {input.name}
                name= "name"
                onChange={(e)=>handleChange(e)}

                />
            </div>
            <div>
                <label>Altura Maxima: </label>
                <input 
                 type= "number" 
                 value= {input.heightMax}
                 name= "heightMax"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label>Altura Minima: </label>
                <input 
                 type= "number" 
                 value= {input.heightMin}
                 name= "heightMin"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label>Peso Maximo: </label>
                <input 
                 type= "number" 
                 value= {input.weightMax}
                 name= "weightMax"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label>Peso Minimo: </label>
                <input 
                 type= "number" 
                 value= {input.weightMin}
                 name= "weightMin"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label>Años de vida: </label>
                <input 
                 type= "number" 
                 value= {input.life_span}
                 name= "life_span"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label>Imagen: </label>
                <input 
                 type= "text" 
                 value= {input.image}
                 name= "image"
                 onChange={(e)=>handleChange(e)}
                />
            </div>
            <select onChange={(e)=> handleSelect(e)}>
                    {temperament.map((tempe) => (
                        <option key={tempe.name} value= {tempe.name}> {tempe.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
                <button type= 'submit'>Crear raza</button>

            </form>

            {input.temperament.map(el=>
                <div >
                    <p>{el}</p>
                    <button className="btn" onClick= {()=> handleDelete(el)}>x</button>
                    </div>
                    )}
        </div>
    )

}