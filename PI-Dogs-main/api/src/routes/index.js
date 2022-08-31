const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { APIKEY } = process.env;
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

    // Esta función mapea todos los perros de la api y por cada uno me trae nombre, id, altura minima y maxima, peso minimo
    // y máximo, esperanza de vida, imagen y temperamento. 
    const mapBreedsApi= breedsApi.data.map(b => {
        return {
            name: b.name,
            id: b.id,
            heightMin: parseInt(b.height.imperial.slice(0, 2).trim()),
            heightMax: parseInt(b.height.imperial.slice(4).trim()),
            weightMin: parseInt(b.weight.imperial.slice(0, 2).trim()),
            weightMax: parseInt(b.weight.imperial.slice(4).trim()),
            life_span: b.life_span,
            image: b.image.url,
            temperament: b.temperament? b.temperament.split(', ') : []
        }
    })

    const dbBreeds = await Dog.findAll({include: Temperament });
    let tempsString = [];
    const mapDBbreeds = dbBreeds.map(d=> {
        d = d.toJSON()
        d.temperaments.map((temp) => {
        tempsString.push(temp.name);
        });
        return {
            name: d.name,
            id: d.id,
            heightMin: d.heightMin,
            heightMax: d.heightMax,
            weightMin: d.weightMin,
            weightMax: d.weightMax,
            life_span: d.life_span,
            image: d.image,
            created: d.created,
            temperament: tempsString
        }
    })

    const allBreeds = [...mapBreedsApi, ...mapDBbreeds];

    if(name){
        let breedExists = await allBreeds.filter(b=> b.name.toLowerCase().includes(name.toLowerCase()));
            if (breedExists.length>0) res.json(breedExists);
            if(breedExists.length<1) res.send([{
                name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperament: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://thumbs.dreamstime.com/b/perro-con-una-lupa-75331469.jpg'
            }]);
    }
    else res.json(allBreeds);

    }catch(e){
        console.log(e)
    }
});

router.get('/dogs/:id', async (req, res)=> {
    const {id} = req.params;
    // if(!id) res.status(400).json({ msg: 'Missing ID'})
    try{
        const breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);

        const mapBreedsApi= breedsApi.data.map(b => {

            return {
                name: b.name,
                id: b.id,
                heightMin: parseInt(b.height.imperial.slice(0, 2).trim()),
                heightMax: parseInt(b.height.imperial.slice(4).trim()),
                weightMin: parseInt(b.weight.imperial.slice(0, 2).trim()),
                weightMax: parseInt(b.weight.imperial.slice(4).trim()),
                life_span: b.life_span,
                image: b.image.url,
                temperament: (b.temperament ? b.temperament.split(",") : ["n/a"]).map((b)=> b.trim())
            }
        });

        
    const dbBreeds = await Dog.findAll({include: Temperament });
    const mapDBbreeds = dbBreeds.map(d=> { let tempsString = [];
        d.temperaments.map((temp) => {
            console.log(temp.name)
        tempsString.push(temp.name);
        });
        return {
            name: d.name,
            id: d.id,
            heightMin: d.heightMin,
            heightMax: d.heightMax,
            weightMin: d.weightMin,
            weightMax: d.weightMax,
            life_span: d.life_span,
            image: d.image,
            created: d.created,
            temperament: tempsString
        }
    })

    const allBreeds = [...mapBreedsApi, ...mapDBbreeds];


    if(id) {
        const dog = await allBreeds.filter((d) => d.id == id);
        res.json(dog);
    }
        
    }catch(e){
        res.status(400).json({ msg: 'Missing ID'})
    }
});

router.post('/dogs', async (req, res)=>{
    const {name, heightMin, heightMax, weightMin, weightMax, life_span, temperament} = req.body;
    let {image} = req.body;
    if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
        return res.status(400).json({msg: "Falta información"})
    }
    if(typeof name !== "string" || typeof heightMin !== "string" || typeof heightMax !== "string" || typeof weightMin !== "string" || typeof weightMax !== "string"){
        return res.status(400).json({msg: "Alguno de los datos no fue introducido correctamente"})
    }
    if(parseInt(heightMin)>parseInt(heightMax)){
        return res.status(400).json({msg:'La autra mínima no puede ser mayor a la máxima'})
    }
    if(parseInt(weightMin)>parseInt(weightMax)){
        return res.status(400).json({msg:'El peso mínimo no puede ser mayor al peso máximo'})
    }
    try {
        if (image === '' || !image) {
            image = 'https://st2.depositphotos.com/2166845/5890/i/450/depositphotos_58906929-stock-photo-cairn-terrier-puppy.jpg'
        } 
        const newDog = await Dog.create({ name, heightMin , heightMax, weightMin, weightMax, life_span, image })
        let temper = await Temperament.findAll({
            where: { name: temperament }})
        
        await newDog.addTemperament(temper);
        res.status(200).send(newDog);

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
