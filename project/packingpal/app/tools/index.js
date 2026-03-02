import { tool as updateLocation } from "./updateLocation";
import { tool as updateTitle } from "./updateTitle";
import { tool as updatePeople } from "./updatePeople";
import { tool as updateTimeFrame } from "./updateTimeFrame";

export const toolRegistry = {
  [updateLocation.name]: updateLocation,
  [updateTitle.name]: updateTitle,
  [updatePeople.name]: updatePeople,
  [updateTimeFrame.name]: updateTimeFrame,
};
