import React from 'react';
export default function CardComponent(props) {
    let onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }
    const deleteCard = (id) => {
        let tempCards = [...props.cards];
        for (let i in tempCards) {
            if (tempCards[i]["id"] === id) {
                tempCards.splice(i, 1);
                break;
            }
        }
        props.setCards(tempCards);
    }
    return (
        <>
            {
                props.cards.map(cardElement => {
                    if (props.listId === cardElement.list) {
                        return (
                            <div key={cardElement.id}
                                onDragStart={(e) => onDragStart(e, cardElement.id)}
                                draggable
                                className="draggable">
                                <div className="card-title">
                                    <span>{cardElement.title}</span>
                                    <span className="align-right" onClick={(e) => deleteCard(cardElement.id)}>x</span>
                                </div>
                                <div className="card-content">
                                    {cardElement.desc}
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <>
                            </>
                        )
                    }
                })
            }
        </>
    )
}