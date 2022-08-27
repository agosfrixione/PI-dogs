import { useEffect, useState } from "react";
import { getName } from "../redux/actions";
import { useDispatch } from 'react-redux';
import './SearchBar.css';
import { useParams } from "react-router-dom";

export default function SearchBar(){
    const params = useParams();
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getName(search))
    }, [dispatch, search]);

    function onSubmit(e){
        e.preventDefault();
        const searchedName = getName(search)
        console.log("getName", getName(search))
        // console.log(search)
        dispatch(searchedName)
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        // console.log(e.target.value)
    }

    return(
    <div key={params.id}>
        <input
            type='text' 
            placeholder='Find your favorite breed'
            onChange={e => onInputChange(e)}
            value={search}
            className='inputSearch'
            onKeyPress={e=> e.key === 'Enter' && onSubmit(e)}
        />
        <button
        type='submit'
        onClick={e=> onSubmit(e)}
        className='btnSearch'
        >
            <strong>Search</strong>
        </button>
    </div>
    )
}