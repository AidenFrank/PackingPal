/*
export default function updateLocation(args, packingList) {
  packingList.basicDetails.location = args.location;
  console.log("Location updated to :", args.location);
  return packingList;
}
*/
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
    packingList.basicDetails.location = args.location;
    console.log("Location updated to :", packingList.basicDetails.location);
    return packingList;
  },
};
