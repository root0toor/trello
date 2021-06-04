import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../css/app.css';
import ModalComponent from "./ModalComponent";
import CardComponent from "./CardComponent";

export default function Trello() {
    let cardsData;
    let listData;
    try {
        cardsData = localStorage.getItem('cardsData');
        cardsData = cardsData ? JSON.parse(cardsData) : [];
        listData = localStorage.getItem('listData');
        listData = listData ? JSON.parse(listData) : [];
    } catch {
        console.log("error");
    }
    let [cards, setCards] = useState(cardsData);
    let [list, setList] = useState(listData);
    let onDragOver = (ev) => {
        ev.preventDefault();
    }

    let onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");
        let tempCards = [...cards];
        for (let i in tempCards) {
            if (tempCards[i]["id"] === id) {
                tempCards[i]["list"] = cat;
            }
        }
        setCards(tempCards);
    }

    const [showCard, setCardShow] = useState(false);
    const [showList, setListShow] = useState(false);
    const [listRefer, setListRefer] = useState(null);

    const deleteList = (id) => {
        let tempList = [...list];
        let tempCards = [...cards];
        for (let i in tempList) {
            if (tempList[i]["id"] === id) {
                tempList.splice(i, 1);
                for(let j in tempCards){
                    if(tempCards[j]["list"] === id){
                        tempCards.splice(j, 1);
                    }
                }
                break;
            }
        }
        setList(tempList);
        setCards(tempCards);
    }

    useEffect(() => {
        localStorage.setItem('cardsData', JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        localStorage.setItem('listData', JSON.stringify(list));
    }, [list]);

    return (
        <>
            <div className="container-drag">
                <div className="header">
                    <h2>Trello</h2>
                    <div onClick={(e) => { setListShow(true);}}>
                        <img src="https://img.icons8.com/carbon-copy/50/000000/add--v1.png" alt="none" />
                    </div>
                </div>
                <div className="local-row">
                    {
                        list.map(listElement => {
                            return (
                                <div className="list"
                                    onDragOver={(e) => onDragOver(e)}
                                    onDrop={(e) => { onDrop(e, listElement.id) }}>
                                    <span className="task-header">
                                        <span className="header-left">
                                            {listElement.title}
                                        </span>
                                        <span className="header-right" onClick={(e) => deleteList(listElement.id)}>X</span>
                                    </span>
                                    <CardComponent cards={cards} listId={listElement.id} setCards={setCards}/>
                                    <div className="add-button" onClick={(e) => { setCardShow(true); setListRefer(listElement.id); }}>
                                        <img src="https://img.icons8.com/carbon-copy/50/000000/add--v1.png" alt="none" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ModalComponent show={showCard} setShow={setCardShow} cards={cards} setCards={setCards} listRefer={listRefer} />
            <ModalComponent show={showList} setShow={setListShow} cards={list} setCards={setList} />
        </>
    )
}