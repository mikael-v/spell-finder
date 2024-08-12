import axios from "axios";

const api = axios.create({ baseURL: "https://www.dnd5eapi.co" });

export const getAllSpells = () => {
  return api.get("api/spells/").then((result) => {
    // console.log(result.data.results);
    return result.data.results;
  });
};

//spell details from spell url
export const getSpellDetails = async () => {
  try {
    const spells = await getAllSpells();

    // Map over the spells array to fetch details for each spell
    const spellDetailsPromises = spells.map((spell) => {
      return api.get(spell.url).then((response) => response.data);
    });

    // Wait for all promises to resolve
    const allSpellDetails = await Promise.all(spellDetailsPromises);

    return allSpellDetails;
  } catch (error) {
    console.error("Error fetching spell details:", error);
  }
};
