const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { YOUR_API_KEY } = process.env;


const { Dog ,  Temperament }= require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`) 
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id: el.id,
            image: el.image.url,
            name: el.name,
            temperament: el.temperament,
            weightMin: Number(el.weight.metric.slice(0,2)),
            weightMax: Number(el.weight.metric.slice(4)),
            heightMin: Number(el.height.metric.slice(0,2)),
            heightMax: Number(el.height.metric.slice(4)),
            life_span: el.life_span,
        }
    })
    return apiInfo

}

const getDbInfo = async () => {
    return await Dog.findAll({  
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
    
          attributes: [],
        },
      },
    });
  };

 
 const getAllDogs  = async () => {
    const apiInfo = await getApiInfo(); //ejecuto la llamada a la api
    const dbInfo = await getDbInfo(); //ejecuto la llamada a la db 
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  };

  router.get("/dogs", async (req, res) => {
    const name = req.query.name 
    let dogsTotal = await getAllDogs();
    if(name){
        let dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) 
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send( "No se encuentra esa raza");
    } else{
        res.status(200).send(dogsTotal)
    
    }
  })

  router.get("/temperaments", async (req, res) => {
    const temperamentsApi = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const temperamentsBd = temperamentsApi.data.map((e) => e.temperament)//muchos arrelos
   .toString()//Devuelve una cadena de caracteres (texto)
   .trim()// eliminar espacios en blanco y tablulaciones
   .split(/\s*,\s*/);//Esto imprime dos líneas; la primera línea imprime la cadena original, y la segunda línea imprime el array resultante.
   
   const filtrado = temperamentsBd.filter(e => e); 
   const filtradoEach =[... new Set (filtrado)];
   console.log(filtradoEach)
   filtradoEach.forEach(el =>{
      Temperament.findOrCreate({// se fija si esta y si no esta lo crea 
         where: {name: el},
      })
   })
   const allTemperaments = await Temperament.findAll();
   res.json(allTemperaments);


})

router.post("/dog", async (req, res) => {
    const {
      name,
      heightMax,
      heightMin,
      weightMax,
      weightMin,
      life_span,
      image,
      createdInDb,
      temperament
  
    } = req.body;
  
    const dogCreated = await Dog.create({
      name,
      heightMax,
      heightMin,
      weightMax,
      weightMin,
      life_span,
      image,
      createdInDb
    });

    let temperamentDb = await Temperament.findAll({
        where: {name : temperament  }
    })
    dogCreated.addTemperament(temperamentDb)

    
      res.send("Creaste una nueva raza");
   
  });

  router.get("/dogs/:id", async (req, res) => {
    const id = req.params.id;
    const razas = await getAllDogs();
    if (id){
      const filtrados = await razas.filter((e) => e.id == id);
      filtrados.length
        ? res.status(200).json(filtrados)
        : res.status(404).send("Raza no encontrada por ID");
    }
  });
  


module.exports = router;
