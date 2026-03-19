import { mergeDeep } from "@/app/lib/mergeDeep";

export const tool = {
  name: "updatePeople",

  definition: {
    type: "function",
    function: {
      name: "updatePeople",
      description: "Updates the people on the trip",
      parameters: {
        type: "object",
        properties: {
          people: {
            type: "array",
            description: "The names and roles of people on the trip",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                role: { type: "string" },
              },
              required: ["name"],
            },
          },
        },
        required: ["people"],
      },
    },
  },

  handler: (args, packingList) => {
    mergeDeep(packingList.basicDetails, {
      people: args.people.map((p) => ({
        name: p.name,
        role: p.role || "",
      })),
    });

    console.log("People updated:", packingList.basicDetails.people);
    return packingList;
  },
};
