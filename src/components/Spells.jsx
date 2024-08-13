import { getFilteredSpells } from "../api";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ReactMarkdown from "react-markdown";

function Spells() {
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spellOrder, setSpellOrder] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFilteredSpells(selectedLevel, selectedSchool, selectedClass, spellOrder)
      .then((result) => {
        setSpells(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spells:", error);
        setIsLoading(false);
      });
  }, [spellOrder, selectedSchool, selectedLevel, selectedClass]);

  const handleSpellOrder = (event) => {
    setSpellOrder(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="dropdown-container">
        <label htmlFor="orderBy">
          Order By:{" "}
          <select id="orderBy" onChange={handleSpellOrder} value={spellOrder}>
            <option value="">Default (Alphabetical)</option>
            <option value="Level">Level</option>
            <option value="School">Spell School</option>
          </select>
        </label>
        <button onClick={toggleFilters} style={{ margin: "10px 0" }}>
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </button>
        {filtersVisible && (
          <div id="filters">
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
            <label htmlFor="schoolFilter">
              Filter By School:{" "}
              <select
                id="schoolFilter"
                onChange={handleSchoolChange}
                value={selectedSchool}
              >
                <option value="">All Schools</option>
                <option value="Abjuration">Abjuration</option>
                <option value="Conjuration">Conjuration</option>
                <option value="Divination">Divination</option>
                <option value="Enchantment">Enchantment</option>
                <option value="Evocation">Evocation</option>
                <option value="Illusion">Illusion</option>
                <option value="Necromancy">Necromancy</option>
                <option value="Transmutation">Transmutation</option>
              </select>
            </label>
            <label htmlFor="classFilter">
              Filter By Class:{" "}
              <select
                id="classFilter"
                onChange={handleClassChange}
                value={selectedClass}
              >
                <option value="">All Classes</option>
                <option value="Artificer">Artificer</option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
              </select>
            </label>
          </div>
        )}
      </div>
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
