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
    try {
        const {name} = req.query;
        const breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);
    // fetch.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`).then(response => response.json())

    const mapBreedsApi= breedsApi.data.map(b => {
        return {
            name: b.name,
            id: b.id,
            heightMin: b.height.imperial.split(/\s*-\s*/)[0] && b.height.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
            b.height.imperial.split(/\s*-\s*/)[0] :
            (b.height.metric.split(/\s*-\s*/)[0] && b.height.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                Math.round(b.height.metric.split(/\s*-\s*/)[0] / 2.205).toString() :
                (b.height.imperial.split(/\s*-\s*/)[1] && b.height.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                    Math.round(b.height.imperial.split(/\s*-\s*/)[1] * 0.6).toString() :
                    (b.height.metric.split(/\s*-\s*/)[1] && b.height.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                        Math.round(b.height.imperial.split(/\s*-\s*/)[1] * 0.6 / 2.205).toString() :
                        'No tenemos Altura Minima para ese Perro')))
        ,
            heightMax: b.height.imperial.split(/\s*-\s*/)[1] && b.height.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
            b.height.imperial.split(/\s*-\s*/)[1] :
            (b.height.metric.split(/\s*-\s*/)[1] && b.height.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                Math.round(b.height.metric.split(/\s*-\s*/)[1] / 2.205).toString() :
                (b.height.imperial.split(/\s*-\s*/)[0] && b.height.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                    Math.round(b.height.imperial.split(/\s*-\s*/)[0] * 1.1).toString() :
                    (b.height.metric.split(/\s*-\s*/)[0] && b.height.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                        Math.round(b.height.imperial.split(/\s*-\s*/)[0] * 1.1 / 2.205).toString() :
                        'No tenemos Altura Maxima para ese Perro'))),
                        weightMin: b.weight.imperial.split(/\s*-\s*/)[0] && b.weight.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                        b.weight.imperial.split(/\s*-\s*/)[0] :
                        (b.weight.metric.split(/\s*-\s*/)[0] && b.weight.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                            Math.round(b.weight.metric.split(/\s*-\s*/)[0] / 2.205).toString() :
                            (b.weight.imperial.split(/\s*-\s*/)[1] && b.weight.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                                Math.round(b.weight.imperial.split(/\s*-\s*/)[1] * 0.6).toString() :
                                (b.weight.metric.split(/\s*-\s*/)[1] && b.weight.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                                    Math.round(b.weight.imperial.split(/\s*-\s*/)[1] * 0.6 / 2.205).toString() :
                                    'No tenemos Peso Minimo para ese Perro')))
                    ,
            weightMax: b.weight.imperial.split(/\s*-\s*/)[1] && b.weight.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                        b.weight.imperial.split(/\s*-\s*/)[1] :
                        (b.weight.metric.split(/\s*-\s*/)[1] && b.weight.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                            Math.round(b.weight.imperial.split(/\s*-\s*/)[1] / 2.205).toString() :
                            (b.weight.imperial.split(/\s*-\s*/)[0] && b.weight.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                                Math.round(b.weight.imperial.split(/\s*-\s*/)[0] * 1.1).toString() :
                                (b.weight.metric.split(/\s*-\s*/)[0] && b.weight.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                                    Math.round(b.weight.imperial.split(/\s*-\s*/)[0] * 1.1 / 2.205).toString() :
                                    'No tenemos Peso Maximo para ese Perro')))
                        ,
            
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
            heightMin: b.height.metric.split(/\s*-\s*/)[0] && b.height.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
            b.height.metric.split(/\s*-\s*/)[0] :
            (b.height.imperial.split(/\s*-\s*/)[0] && b.height.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                Math.round(b.height.imperial.split(/\s*-\s*/)[0] / 2.205).toString() :
                (b.height.metric.split(/\s*-\s*/)[1] && b.height.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                    Math.round(b.height.metric.split(/\s*-\s*/)[1] * 0.6).toString() :
                    (b.height.imperial.split(/\s*-\s*/)[1] && b.height.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                        Math.round(b.height.metric.split(/\s*-\s*/)[1] * 0.6 / 2.205).toString() :
                        'No tenemos Altura Minima para ese Perro')))
        ,
            heightMax: b.height.metric.split(/\s*-\s*/)[1] && b.height.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
            b.height.metric.split(/\s*-\s*/)[1] :
            (b.height.imperial.split(/\s*-\s*/)[1] && b.height.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                Math.round(b.height.imperial.split(/\s*-\s*/)[1] / 2.205).toString() :
                (b.height.metric.split(/\s*-\s*/)[0] && b.height.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                    Math.round(b.height.metric.split(/\s*-\s*/)[0] * 1.1).toString() :
                    (b.height.imperial.split(/\s*-\s*/)[0] && b.height.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                        Math.round(b.height.metric.split(/\s*-\s*/)[0] * 1.1 / 2.205).toString() :
                        'No tenemos Altura Maxima para ese Perro'))),
                        weightMin: b.weight.metric.split(/\s*-\s*/)[0] && b.weight.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                        b.weight.metric.split(/\s*-\s*/)[0] :
                        (b.weight.imperial.split(/\s*-\s*/)[0] && b.weight.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                            Math.round(b.weight.imperial.split(/\s*-\s*/)[0] / 2.205).toString() :
                            (b.weight.metric.split(/\s*-\s*/)[1] && b.weight.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                                Math.round(b.weight.metric.split(/\s*-\s*/)[1] * 0.6).toString() :
                                (b.weight.imperial.split(/\s*-\s*/)[1] && b.weight.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                                    Math.round(b.weight.metric.split(/\s*-\s*/)[1] * 0.6 / 2.205).toString() :
                                    'No tenemos Peso Minimo para ese Perro')))
                    ,
            weightMax: b.weight.metric.split(/\s*-\s*/)[1] && b.weight.metric.split(/\s*-\s*/)[1] !== 'NaN' ?
                        b.weight.metric.split(/\s*-\s*/)[1] :
                        (b.weight.imperial.split(/\s*-\s*/)[1] && b.weight.imperial.split(/\s*-\s*/)[1] !== 'NaN' ?
                            Math.round(b.weight.imperial.split(/\s*-\s*/)[1] / 2.205).toString() :
                            (b.weight.metric.split(/\s*-\s*/)[0] && b.weight.metric.split(/\s*-\s*/)[0] !== 'NaN' ?
                                Math.round(b.weight.metric.split(/\s*-\s*/)[0] * 1.1).toString() :
                                (b.weight.imperial.split(/\s*-\s*/)[0] && b.weight.imperial.split(/\s*-\s*/)[0] !== 'NaN' ?
                                    Math.round(b.weight.metric.split(/\s*-\s*/)[0] * 1.1 / 2.205).toString() :
                                    'No tenemos Peso Maximo para ese Perro')))
                        ,
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

router.post('/create', async (req, res)=>{
    const {name, heightMin, heighMax, weightMin, weightMax, life_span, image, temperament} = req.body;
    if (!name || !heightMin || !heighMax || !weightMin || !weightMax) {
        return res.status(400).json({msg: "Falta información"})
    }
    if(typeof name !== "string" || typeof heightMin !== "string" || typeof heighMax !== "string" || typeof weightMin !== "string" || typeof weightMax !== "string"){
        return res.status(400).json({msj: "Alguno de los datos no fue introducido correctamente"})
    }
    try {
        const newDog = await Dog.create({ name, heightMin, heighMax, weightMin, weightMax, life_span, image })
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
