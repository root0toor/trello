import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
export default function ModalComponent(props) {
    const handleClose = () => props.setShow(false);
    const [cardTitle, setCardTitle] = useState("");
    const [cardDesc, setCardDesc] = useState("");
    const addToCard = () => {
        if (cardDesc !== "" && cardTitle !== "") {
            let currentCard = {
                "title": cardTitle,
                "desc": cardDesc,
                "created": new Date().toISOString(),
                "id": cardTitle + "_" + parseInt(Math.random() * 100),
                "list": props.listRefer
            }
            props.setCards([...props.cards, currentCard]);
            setCardTitle("");
            setCardDesc("");
        }
        handleClose();
    }

    const addToList = () => {
        if (cardTitle !== "") {
            let currentList = {
                "title": cardTitle,
                "created": new Date().toISOString(),
                "id": cardTitle + "_" + parseInt(Math.random() * 100)
            }
            props.setCards([...props.cards, currentList]);
            setCardTitle("");
            setCardDesc("");
        }
        handleClose();
    }
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Add {props.listRefer ? "Card" : "List"} Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label for="fname">{props.listRefer ? "Card" : "List"} Title</label>
                <input type="text" name="title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="add title..." />
                {
                    (() => {
                        if (props.listRefer) {
                            return (
                                <>
                                    <label for="lname">Description</label>
                                    <textarea type="text" name="desc" value={cardDesc} onChange={(e) => setCardDesc(e.target.value)} placeholder="add desc..." />
                                    <input type="submit" value="Submit" onClick={addToCard} />
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <input type="submit" value="Submit" onClick={addToList} />
                                </>
                            )
                        }
                    })()
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Modal
                </Button>
            </Modal.Footer>
        </Modal>
    )
}