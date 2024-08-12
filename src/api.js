import axios from "axios";

const api = axios.create({ baseURL: "https://www.dnd5eapi.co/api" });

export const getAllSpells = () => {
  return api.get("/spells").then((result) => {
    return result.data.results;
  });
};
