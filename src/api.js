import axios from "axios";

const api = axios.create({ baseURL: "https://www.dnd5eapi.co" });

export const getAllSpells = () => {
  return api.get("/api/spells").then((result) => {
    return result.data.results;
  });
};

// Fetch all spell details
export const getSpellDetails = async () => {
  try {
    const spells = await getAllSpells();

    const spellDetailsPromises = spells.map((spell) => {
      return api.get(spell.url).then((response) => response.data);
    });

    const allSpellDetails = await Promise.all(spellDetailsPromises);

    return allSpellDetails;
  } catch (error) {
    console.error("Error fetching spell details:", error);
  }
};

// Fetch all spell details and sort by level
export const getSpellsOrderedByLevel = async () => {
  try {
    const spells = await getAllSpells();

    const spellDetailsPromises = spells.map((spell) => {
      return api.get(spell.url).then((response) => response.data);
    });

    const allSpellDetails = await Promise.all(spellDetailsPromises);
    allSpellDetails.sort((a, b) => a.level - b.level);

    return allSpellDetails;
  } catch (error) {
    console.error("Error fetching and ordering spell details:", error);
  }
};
