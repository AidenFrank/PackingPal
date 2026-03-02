export const tool = {
  name: "updatePeople",

  definition: {
    type: "function",
    function: {
      name: "updatePeople",

      description: "Updates the number of people for the trip",
      parameters: {
        type: "object",
        properties: {
          people: {
            type: "number",
            description: "The number of people for the trip",
          },
        },
        required: ["people"],
      },
    },
  },

  handler: (args, packingList) => {
    packingList.basicDetails.people = args.people;
    console.log("People updated to :", packingList.basicDetails.people);
    return packingList;
  },
};
