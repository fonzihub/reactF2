import { useState } from "react";

export default function Livello3() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        console.log("chiamata fetch ricevuta");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((data) => {
        console.log("dati ok", data);
        setData(data);
      })
      .catch((e) => {
        console.log("errore", e);
        setError(e.message);
      });
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Carica post
      </button>
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}

      <p></p>
    </>
  );
}
