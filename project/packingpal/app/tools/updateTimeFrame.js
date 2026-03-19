import { mergeDeep } from "@/app/lib/mergeDeep";

export const tool = {
  name: "updateTimeFrame",

  definition: {
    type: "function",
    function: {
      name: "updateTimeFrame",
      description: "Updates the timeframe of the trip",
      parameters: {
        type: "object",
        properties: {
          timeframe: {
            type: "object",
            properties: {
              durationDays: { type: "number" },
              durationNights: { type: "number" },
              departDay: { type: "string" },
              departTime: { type: "string" },
              returnDay: { type: "string" },
              returnTime: { type: "string" },
              season: { type: "string" },
              flexible: { type: "boolean" },
            },
          },
        },
        required: ["timeframe"],
      },
    },
  },

  handler: (args, packingList) => {
    if (!packingList.basicDetails.timeframe) {
      packingList.basicDetails.timeframe = {};
    }

    mergeDeep(packingList.basicDetails.timeframe, args.timeframe);

    return packingList;
  },
};
