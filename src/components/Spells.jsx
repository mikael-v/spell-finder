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

  return (
    <ul className="spells-list">
      {spells.map((spell) => (
        <li key={spell.index} className="spell-item">
          <Card>
            <Card.Body>
              <Card.Title>
                <h2>{spell.name}</h2>
                <p>
                  {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}{" "}
                  {spell.school.name}
                </p>
              </Card.Title>

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
              {spell.higher_level && spell.higher_level.length > 0 && (
                <p>
                  <b>Higher Levels: </b> {spell.higher_level.join(" ")}
                </p>
              )}
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default Spells;
