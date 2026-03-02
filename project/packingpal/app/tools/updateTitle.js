export const tool = {
  name: "updateTitle",

  definition: {
    type: "function",
    function: {
      name: "updateTitle",
      description: "Updates the title of the trip",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "The title of the trip",
          },
        },
        required: ["title"],
      },
    },
  },

  handler: (args, packingList) => {
    packingList.basicDetails.title = args.title;
    console.log("Title updated to :", packingList.basicDetails.title);
    return packingList;
  },
};
