import { getSpellDetails } from "../api";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function Spells() {
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSpellDetails().then((result) => {
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
              <h3>
                Level {spell.level} {spell.school.name}
              </h3>
              <p>
                <b>Casting Time: </b> {spell.casting_time}
              </p>
              <p>
                <b>Range: </b> {spell.range}
              </p>

              <p>
                <b>Components: </b> {spell.components.join(", ")}
              </p>
              <p>
                <b>Duration: </b> {spell.duration}
              </p>
              <p>{spell.desc}</p>
              <p>
                <b>Higher Levels: </b> {spell.higher_level}
              </p>
            </Card.Title>
          </Card.Body>
        </Card>
      </li>
    );
  });
}

export default Spells;
