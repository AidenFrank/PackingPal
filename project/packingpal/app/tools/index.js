import { tool as updateLocation } from "./updateLocation";
import { tool as updateTitle } from "./updateTitle";
import { tool as updatePeople } from "./updatePeople";
import { tool as updateDays } from "./updateDays";

export const toolRegistry = {
  [updateLocation.name]: updateLocation,
  [updateTitle.name]: updateTitle,
  [updatePeople.name]: updatePeople,
  [updateDays.name]: updateDays,
};
