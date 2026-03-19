import { mergeDeep } from "@/app/lib/mergeDeep";

export const tool = {
  name: "updateLocation",

  definition: {
    type: "function",
    function: {
      name: "updateLocation",
      description: "Updates the location of the trip",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The location of the trip",
          },
        },
        required: ["location"],
      },
    },
  },

  handler: (args, packingList) => {
    mergeDeep(packingList.basicDetails, {
      location: args.location,
    });
    return packingList;
  },
};
