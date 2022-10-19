import React from 'react';

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = []

    const totalPages = Math.ceil(allDogs / dogsPerPage);//cantidad de paginas, ceil redondea hacia arriba

    for (let i = 0 ; i < totalPages; i++){
        pageNumbers.push(i + 1);}

    return(
        <div>
            <ul >   
                {pageNumbers?.map((n) => (
                    
                    <button key={n} onClick={() => paginated(n)}>{n}
                    </button>
                   
                ))}
            </ul>
        </div>
    )
} 