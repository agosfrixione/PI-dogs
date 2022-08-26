import React from "react";
import './Paginate.css'

export default function Paginate ({dogsPerPage, totalDogs, paginate, currentPage}) {
    const pageNum = [];

    for ( let i=1; i<=Math.ceil(totalDogs/dogsPerPage); i++) {
        pageNum.push(i);
    }

    //Del map salen los números que después se renderizan en el home para poder navegar a través de las páginas
    return (
        <nav className="paginateContainer">
            <ul className="paginate">
                {
                    pageNum && pageNum.map(n => (
                        <li key={n}>
                            <button disabled= {currentPage === n? true : false} onClick={()=> paginate(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}