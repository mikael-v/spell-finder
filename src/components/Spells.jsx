import { getSpellDetails, getFilteredSpells } from "../api";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ReactMarkdown from "react-markdown";

function Spells() {
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spellOrder, setSpellOrder] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getFilteredSpells(selectedLevel, spellOrder).then((result) => {
      setSpells(result);
      setIsLoading(false);
    });
  }, [spellOrder, selectedLevel]);

  const handleSpellOrder = (event) => {
    setSpellOrder(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <label htmlFor="orderBy">
        Order By:{" "}
        <select id="orderBy" onChange={handleSpellOrder} value={spellOrder}>
          <option value="">Default (Alphabetical)</option>
          <option value="Level">Level</option>
          <option value="School">Spell School</option>
        </select>
      </label>
      <label htmlFor="levelFilter">
        Filter By Level:{" "}
        <select
          id="levelFilter"
          onChange={handleLevelChange}
          value={selectedLevel}
        >
          <option value="">All Levels</option>
          <option value="0">Cantrips</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
        </select>
      </label>
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
