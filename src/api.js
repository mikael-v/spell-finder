import axios from "axios";

const api = axios.create({ baseURL: "https://www.dnd5eapi.co" });

export const getAllSpells = () => {
  return api.get("/api/spells").then((result) => {
    return result.data.results;
  });
};

export const getSpellDetails = async (orderBy = null) => {
  try {
    const spells = await getAllSpells();
    const spellDetailsPromises = spells.map((spell) => {
      return api.get(spell.url).then((response) => response.data);
    });

    const allSpellDetails = await Promise.all(spellDetailsPromises);

    if (orderBy === "Level") {
      allSpellDetails.sort((a, b) => a.level - b.level);
    } else if (orderBy === "School") {
      allSpellDetails.sort((a, b) =>
        a.school.name.localeCompare(b.school.name)
      );
    }

    return allSpellDetails;
  } catch (error) {
    console.error("Error fetching spell details:", error);
  }
};

export const getFilteredSpells = async (
  level = null,
  school = null,
  className = null,
  orderBy = null
) => {
  try {
    const spells = await getAllSpells();
    const spellDetailsPromises = spells.map((spell) =>
      api.get(spell.url).then((response) => response.data)
    );

    const allSpellDetails = await Promise.all(spellDetailsPromises);

    let filteredSpells = allSpellDetails;

    if (level) {
      filteredSpells = filteredSpells.filter(
        (spell) => spell.level === parseInt(level, 10)
      );
    }

    if (school) {
      filteredSpells = filteredSpells.filter(
        (spell) => spell.school.name === school
      );
    }

    if (className) {
      filteredSpells = filteredSpells.filter((spell) =>
        spell.classes.some((cls) => cls.name === className)
      );
    }

    if (orderBy === "Level") {
      filteredSpells.sort((a, b) => a.level - b.level);
    } else if (orderBy === "School") {
      filteredSpells.sort((a, b) => a.school.name.localeCompare(b.school.name));
    }

    return filteredSpells;
  } catch (error) {
    console.error("Error fetching and filtering spell details:", error);
  }
};
