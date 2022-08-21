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
        heighthMin:"",
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


}