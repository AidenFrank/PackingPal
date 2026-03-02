export const tool = {
  name: "updateDays",

  definition: {
    type: "function",
    function: {
      name: "updateDays",

      description: "Updates the number of days for the trip",
      parameters: {
        type: "object",
        properties: {
          days: {
            type: "number",
            description: "The number of days for the trip",
          },
        },
        required: ["days"],
      },
    },
  },

  handler: (args, packingList) => {
    packingList.basicDetails.durationDays = args.days;
    console.log("Days updated to :", packingList.basicDetails.durationDays);
    return packingList;
  },
};
