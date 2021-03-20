import React from 'react'



export const CardImage = ({match}) => {
    const cardId = match.params.id
    const cards = JSON.parse(localStorage.getItem('cards'));
    const card = cards.find(card=>card.id===cardId)
    const cardImage = card.images.large
    console.log(match.param);
    return (
        <div className='imageContainer'>
            <img src={cardImage} alt={card.name}/>
        </div>
    )
}
