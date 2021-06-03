import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import axios from 'axios';

function Testhttp() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('react');

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
      if (!ignore) setData(result.data);
      console.log(data.hits.length)
    }

    fetchData();
    return () => { ignore = true; }
  }, [query]);

  return (
    <div className="row">
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {
        data.hits.map(item => {
          <div className="column">
            <ul>
              {data.hits.map(item => (
                <li key={item.objectID} className="card">
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        })
      }
      <div className="column">
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID} className="card">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Testhttp;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<SearchResults />, rootElement);