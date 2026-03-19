import { mergeDeep } from "@/app/lib/mergeDeep";

export const tool = {
  name: "updateTravel",

  definition: {
    type: "function",
    function: {
      name: "updateTravel",
      description: "Updates the travel information",
      parameters: {
        type: "object",
        properties: {
          travel: {
            type: "object",
            properties: {
              method: { type: "string" },
              distanceMiles: { type: "number" },
              estimatedTravelTime: { type: "string" },
              vehicle: { type: "string" },
            },
          },
        },
        required: ["travel"],
      },
    },
  },

  handler: (args, packingList) => {
    if (!packingList.basicDetails.travel) {
      packingList.basicDetails.travel = {};
    }

    mergeDeep(packingList.basicDetails.travel, args.travel);

    return packingList;
  },
};
