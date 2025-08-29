import { useState, useEffect } from "react";

export default function Livello2() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("risposta fetch ricevuta");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((json) => {
        console.log("dati ricevuti", json);
        setData(json);
      })
      .catch((err) => {
        console.log("errore fetch", err.message);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>errore : {error}</div>;
  }
  if (!data) {
    return <div>Caricamento...</div>;
  }

  return (
    <ul>
      {data.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
