import React from "react";
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDogs, getTemperaments, filterTemperament, filterCreated, orderByName,orderByWeight }  from "../actions/actions.js";
import {Link} from "react-router-dom";
import Card from "./Card"; 
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector ((state) => state.dogs)
    //
    const allTemperaments= useSelector((state)=> state.temperament)
    //
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1) // pagina que se renderiza
    const [dogsPerPage, setDogsPerPage] = useState(8) // cantidad de personajes que quiero por pagina 
    const indexOfLastDogs = currentPage * dogsPerPage 
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs) 
// el slice toma un arreglo y lo corta dependiendo lo que le paso por parametro
// ejemplo e este caso desde  el indice del primer personaje hasta el indice del ultimo 
    const paginated = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }   

    useEffect (() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
  
    }, [dispatch])



    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());

    }


    function handleFilterTemperaments(e){
        dispatch(filterTemperament(e.target.value))
      }

    function handleFilterCreated (e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
      }

   

    return (
        <div>
            <Link to = "/dog"> Crea tu perro</Link>
            <h1 className= "letters2"> WIKI PERROS </h1>
            <button onClick= {e=> {handleClick(e)}}>
            Volver a cargar todos los personajes 
        </button>
        <div>
            <select onChange={e=> handleSort(e)}>
                <option value = 'asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </select>

            <select onChange={(e) => handleOrderByWeight(e)}>
                <option value="weightMin">Tamaño pequeño</option>
                <option value="weightMax">Tamaño grande </option>
            </select>
             <select onChange={e=> handleFilterTemperaments(e)}>
                <option value="Temperaments">
                    Todos los temperamentos
                </option>
                {allTemperaments && allTemperaments.map((e) => (
                    <option key={e.id} value={e.name}> {e.name} </option>
                ))}
              
            </select>
           
            <select onChange={e => handleFilterCreated(e)}>
                <option value= 'all'> Todos </option>
                <option value= 'created' > Creados </option>
                <option value= 'api'> Existente </option>
            </select>
            <Paginado
            dogsPerPage= {dogsPerPage}
            allDogs={allDogs.length}
            paginated = {paginated}
            />

<SearchBar />

        { currentDogs?.map((e) =>{
            console.log("este es el id" , e.id)
            return (
              <div key={e.id} className= "dog_map">
               
                  <Link  to={"/home/detail/" + e.id}>
                    <Card  name={e.name} image={e.image} temperament={e.temperament} weightMin={e.weightMin} weightMax={e.weightMax} />
                  </Link>
                  </div>
               
              );
            })} 
 
         {/* {currentDogs?.map((d) => (
        <Card
          key={d.id}
          id={d.id}
          name={d.name}
          image={d.image}
          temperament={d.temperament}
          minWeight={d.minWeight}
          maxWeight={d.maxWeight}
        />
      ))}   */}
            </div>
            </div>
    )}
        