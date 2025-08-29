import { useEffect, useState } from "react";

export default function Livello1() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => {
        console.log("risposta fetch ricevuta");
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((json) => {
        console.log("dati json ricevuti", json);
        setData(json);
      })
      .catch((err) => {
        console.log("errore nella fetch", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Errore: {error}</div>;
  if (!data) return <div>Caricamento...</div>;

  return (
    <div className="bg-info">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
