import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDogs, getByID } from "../redux/actions";
import LoadingAll from "../components/LoadingAll";
import './Detail.css';


export default function Detail(){

    // const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    let actualDog = useSelector(state => state.dogDetail);

    //Llamo a las razas con el useEffect
    useEffect(()=>{
        dispatch(getByID(params.id))
    }, [dispatch, params.id]);


    return (
        <div>
        {
            actualDog[0] ?
            <div key={params.id} className="fullContainer">
                <Link to= '/home' onClick= {(e)=> dispatch(cleanDogs)}>Atras</Link>
                <h2 className="title">Breed: {actualDog[0]?.name}</h2>
                <div className="contentContainer">
                    <div className="headerContainer">
                        <img className="imageBreed" src={actualDog[0]?.image} alt="not found"/>
                    </div>
                    <div className="detailContainer">
                         <h4 className="descriptionText">Temperaments:</h4>
                            <ul className="allTempers">
                            {actualDog[0].temperament ?
                            actualDog[0].temperament.map(e => {
                                return <li key={e}><label>{e}</label></li>
                            }) :
                            'Esta raza no posee temperamentos'
                            }
                            </ul>
                        <h4 className="descriptionText">Weight:</h4>
                        <h5>Between {actualDog[0]?.weightMin} pounds to {actualDog[0].weightMax} pounds</h5>
                        <h4 className="descriptionText">Height:</h4>
                        <h5>Between {actualDog[0]?.heightMin} feets to {actualDog[0]?.heightMax} feets</h5>
                        <h4 className="descriptionText">Life span:</h4>
                        <h5>Between {actualDog[0]?.life_span}</h5>
                    </div>
                </div>
            </div> :
            <div>
                <LoadingAll/>
            </div>

        }
        </div>
    )
}