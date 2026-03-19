import { mergeDeep } from "@/app/lib/mergeDeep";

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
    mergeDeep(packingList.basicDetails, {
      title: args.title,
    });
    return packingList;
  },
};
