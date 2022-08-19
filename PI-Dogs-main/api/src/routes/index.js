const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { APIKEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res)=>{
    const {name} = req.query;
    try {
        const breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);
    // fetch.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`).then(response => response.json())

    const mapBreedsApi= breedsApi.data.map(b => {
        return {
            name: b.name,
            id: b.id,
            height: b.height.metric,
            weight: b.weight.metric,
            life_span: b.life_span,
            image: b.image.url,
            temperament: b.temperament
        }
    })

    const dbBreeds = await Dog.findAll({include: [{model: Temperament}]});

    const allBreeds = [...mapBreedsApi, ...dbBreeds];

    if(name){
        let breedExists = await allBreeds.filter(b=> b.name.toLowerCase().includes(name.toLowerCase()));
            if (breedExists.length>0) res.json(breedExists);
            if(breedExists.length<1) res.send([{
                name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://thumbs.dreamstime.com/b/perro-con-una-lupa-75331469.jpg'
            }]);
    }
    else res.json(allBreeds);

    }catch(e){
        console.log(e)
    }
});

router.get('/dogs/:id', async (req, res)=> {
    const {id} = req.params;
    if(!id) res.status(400).json({ msg: 'Missing ID'})
    try{
        const breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);

        const mapBreedsApi= breedsApi.data.map(b => {
            return {
                name: b.name,
                id: b.id,
                height: b.height.metric,
                weight: b.weight.metric,
                life_span: b.life_span,
                image: b.image.url,
                temperament: b.temperament
            }
        });

        
    const dbBreeds = await Dog.findAll({include: [{model: Temperament}]});

    const allBreeds = [...mapBreedsApi, ...dbBreeds];

    if(id) {
        const dog = await allBreeds.filter((d) => d.id == id);
        res.json(dog);
    }
        
    }catch(e){
        console.log(e)
    }
});

router.post('/dogs', async (req, res)=>{
    const {name, height, weight, life_span, image, temperament} = req.body;
    if (!name || !height || !weight) {
        return res.status(400).json({msg: "Falta información"})
    }
    if(typeof name !== "string" || typeof height !== "string" || typeof weight !== "string"){
        return res.status(400).json({msj: "Alguno de los datos no fue introducido correctamente"})
    }
    try {
        const newDog = await Dog.create({ name, height, weight, life_span, image })
        let temper = await Temperament.findAll({
            where: { name: temperament }})
        
        await newDog.addTemperaments(temper);

        res.status(200).send("El perro fue creado correctamente");

    }catch(e){
        console.log(e)
    }
});

router.get('/temperaments', async (req, res)=>{
    try{
        const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);
        const mapTemperamentsApi = temperamentsApi.data.map(t => t.temperament).toString().split(/\s*,\s*/); // regular expression, me separa cada temperamento sacandole los espacios y las comas entre cada uno

        mapTemperamentsApi.forEach(t => {
            Temperament.findOrCreate({
                where: {name: t}
            })
        });

        const allTemperaments = await Temperament.findAll();

        res.send(allTemperaments);

    }catch(e){
        console.log(e)
    }
});

module.exports = router;
