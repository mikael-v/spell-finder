import { getAllSpells } from "../api";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function Spells() {
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllSpells().then((result) => {
      setIsLoading(false);
      setSpells(result);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return spells.map((spell) => {
    return (
      <li key={spell.index}>
        <Card style={{ width: "18rem" }}>
          <Card.Body id="card-body">
            <Card.Title>
              <h2>{spell.name}</h2>
            </Card.Title>
          </Card.Body>
        </Card>
      </li>
    );
  });
}

export default Spells;
