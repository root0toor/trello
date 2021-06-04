import React, { useState } from 'react';
import './css/app.css';
import ListElement from './components/ListElement';
import CardElement from './components/CardElement';

function App() {
  const listArray = [
    {
      "title": "Teams"
    },
    {
      "title": "Products"
    },
    {
      "title": "Sprint"
    }
  ]
  const [lists, setList] = useState(listArray);
  const [cards, setCards] = useState([]);
  return (
    <div>
      <h1 className="center-align">Trello Board</h1>
      <hr />
      <div className="row">
        {
          lists.map(element => {
            return <ListElement title={element["title"]} cardsData={cards} />
          })
        }
      </div>
    </div>
  )
}

export default App;
