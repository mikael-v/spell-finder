import { getSpellDetails, getSpellsOrderedByLevel } from "../api";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ReactMarkdown from "react-markdown";

function Spells() {
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spellOrder, setSpellOrder] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (spellOrder === "Level") {
      getSpellsOrderedByLevel().then((result) => {
        setIsLoading(false);
        setSpells(result);
      });
    } else {
      getSpellDetails().then((result) => {
        setIsLoading(false);
        setSpells(result);
      });
    }
  }, [spellOrder]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSpellChange = (event) => {
    setSpellOrder(event.target.value);
  };

  return (
    <>
      <select onChange={handleSpellChange}>
        <option value="">Select Order</option>
        <option value="Level">Level</option>
      </select>
      <ul className="spells-list">
        {spells.map((spell) => (
          <li key={spell.index} className="spell-item">
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2>{spell.name}</h2>
                  <h3>
                    <b>
                      {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}
                    </b>{" "}
                    {spell.school.name}
                  </h3>
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
                <ReactMarkdown>
                  {Array.isArray(spell.desc)
                    ? spell.desc.join(" ")
                    : spell.desc}
                </ReactMarkdown>
                {spell.higher_level && spell.higher_level.length > 0 && (
                  <p>
                    <b>Higher Levels: </b>
                    <ReactMarkdown>
                      {spell.higher_level.join(" ")}
                    </ReactMarkdown>
                  </p>
                )}
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Spells;
