import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Card.css';

export default function Card({id, name, image, temperament, weightMin, weightMax}){
    const params = useParams();
    return (
        <div key={params.id} className='cardContainer'>
            <div className='imageContainer'>
                <img src={image} alt='not found'/>
            </div>
            <div className='textContainer'>
                <h2 className='text'>{name}</h2>
                <h4 className='textTemper'>Temperament: <br/>
                { function (temperament) {
            if (typeof (temperament) === 'string') {
                return temperament
            }
            if (Array.isArray(temperament)) {
                let temps = temperament.map(e => e.name)
                return temps.join(', ')
            }
        }(temperament)}</h4>
                <h4 className='text'>Weight: <br/> From {weightMin} to {weightMax} pounds</h4>

                <Link to={'dogs/' + id } className='linkBtn'><button className='btnInfo'>More information</button></Link>
            </div>
        </div>
    );
}