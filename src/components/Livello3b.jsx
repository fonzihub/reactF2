import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Livello3b() {
  const [postId, setPostId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postId) {
      setError("Inserisci un ID valido");
      setData(null);

      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response.ok) {
          console.log("chiamata ricevuta");
          return response.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((data) => {
        console.log("risposta ok", data);
        if (Object.keys(data).length === 0) {
          throw new Error("Post non trovato");
        }
        setError(null);
        setData(data);
      })
      .catch((err) => {
        console.log("errore risposta", err);
        setError(err.message);
        setData(null);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Numero post</Form.Label>
          <Form.Control
            type="number"
            placeholder="numero post"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            min={0}
            max={100}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {error && <p>error: {error}</p>}
      {data && (
        <div>
          <p>{data.title}</p>
          <p>{data.id}</p>
        </div>
      )}
    </>
  );
}
