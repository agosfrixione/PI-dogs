import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments } from "../redux/actions";
import './Form.css';

export default function Form(){
    let temperamentsState = useSelector(state=> state.temperaments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const [dog, setDog] = useState({
        name:"",
        image:"",
        weightMin:"",
        weightMax:"",
        heightMin:"",
        heightMax: "",
        life_span:"",
        temperaments:[]
    });

    const [formError, setFormError] = useState(true);

    const [isSubmit, setisSubmit] = useState(true);

    function exists(str){
        if (!str) return true;
        return false;
    }

    function validName(str){
        if(str.length < 1 || str.length > 30) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validWeight(str){
        if(str.length < 1 || str.length > 10) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validHeight(str){
        if(str.length < 1 || str.length > 5) return true;
        if(typeof str !== "string") return true;
        return false;
    }


    function validLife(str){
        if(str.length < 1 || typeof str !== "string") return true;
        return false;
    }
    
    function longLife(str){
        if(str.length > 5) return true;
        return false;
    }

    function validation(data) {
        let errors = {}

        if(exists(data.name) === true) errors.name = "You need to provide a breed name";

        if(exists(data.weightMin) === true) errors.weightMin = "You need to provide a minimum weight";

        if(exists(data.weightMax) === true) errors.weightMax = "You need to provide a maximum weight";

        if(validName(data.name) === true) errors.name = "The name is not valid";

        if(validWeight(data.weightMax) === true) errors.weightMax = "The weight is not valid";

        if(validWeight(data.weightMin) === true) errors.weightMin = "The weight is not valid";

        if(validHeight(data.heightMin) === true) errors.heightMin = "The height is not valid";

        if(validHeight(data.heightMax) === true) errors.heightMax = "The height is not valid";

        if(parseInt(data.heightMin)>parseInt(data.heightMax)) errors.heightMin = "The minimum height cannot be greater than the maximum height"
        
        if(parseInt(data.heightMin)>parseInt(data.heightMax)) errors.heightMax = "The minimum height cannot be greater than the maximum height"

        if(validLife(data.life_span) === true) errors.life_span = "The life span is not valid";
        
        if(longLife(data.life_span) === true) errors.life_span = "Nos gustaría que sean eternos pero debemos disfrutarlos mientras estén con nosotors";

        if ((Object.keys(errors).length) === 0){
            setisSubmit(false)
          };
        
        return errors;
    }

    let handleChange = (e) =>{
        setDog({
            ...dog,
            [e.target.name] : e.target.value //Los [] son para establecer una variable como propiedad.
        });

        setFormError(validation(dog));
    }

    let handleSubmit = async (e) =>{
        e.preventDefault()
        setFormError(validation(dog))
        
        await axios.post("/dogs", dog)
        console.log(dog);
        setDog({
            name:"",
            image:"",
            weightMin:"",
            weightMax:"",
            height:"",
            life_span:"",
            tempers:[]
        }); //Reinicio el formulario
        alert("La raza ya fué creada")
    }

    let handleTemperament = (e) =>{
        setDog({
            ...dog,
            temperaments: [...new Set([...dog.temperaments, e.target.value])] //con el set se borran elementos repetidos.
        })

        console.log("Handle temperamentos:", dog.temperaments )
    }

    return(
        <div className="formContainer">
            <div className="textTitle">
                <h2>Creat your own dog</h2>
                <h3>Recordá que siempre es mejor adoptar que comprar, hay muchos pichichus que necesitan de nuestro amor y cariño</h3>
            </div>
            
            <form className="form">
                <div className="container">
                    <label>Breed</label>
                    <input name={'name'} value={dog.name}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4 className="error"><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Imagen</label>
                    <input  name={'image'} value={dog.image}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.image ? (<h4 className="error"><small>{formError.image}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Minimum weight <small>(Please enter a single number)</small></label>
                    <input  name={'weightMin'} value={dog.weightMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.weightMin ? (<h4 className="error"><small>{formError.weightMin}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Maximum weight <small>(Please enter a single number)</small></label>
                    <input name={'weightMax'} value={dog.weightMax}
                    onChange={(e) => handleChange(e)}></input>
                    <div className="errorContainer">
                    {
                        formError.weightMax ? (<h4 className="error"><small>{formError.weightMax}</small></h4>) : false
                    }
                    </div>
                </div>

                <div className="container">
                    <label>Minimum height <small>(Please enter a single number)</small></label>
                    <input name={'heightMin'} value={dog.heightMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.heightMin ? (<h4 className="error"><small>{formError.heightMin}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Maximum height <small>(Please enter a single number)</small></label>
                    <input name={'heightMax'} value={dog.heightMax}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.heightMax ? (<h4 className="error"><small>{formError.heightMax}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Life span</label>
                    <input name={'life_span'} value={dog.life_span}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.life_span ? (<h4 className="error"><small>{formError.life_span}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Temperament 1</label>
                    <select name={'temperaments'}
                      onChange={(e) => handleTemperament(e)}>
                        <option value="selected" hidden >Choose a temperament</option>
                       {
                            temperamentsState?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div className="container">
                    <label>Temperament 2</label>
                    <select name={'temperaments'}
                      onChange={(e) => handleTemperament(e)}>
                      <option value="selected" hidden >Choose a temperament</option>
                       {
                            temperamentsState?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div className="container">
                    <label>Temperament 3</label>
                    <select name={'temperaments'}
                      onChange={(e) => handleTemperament(e)}>
                      <option value="selected" hidden >Choose a temperament</option>
                       {
                            temperamentsState?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div>
                    <button className="btn" type="submit" disabled={isSubmit} id="btn" onClick={(e) => handleSubmit(e)}> Create dog </button>
                </div>

            </form>
        </div>
    )
}