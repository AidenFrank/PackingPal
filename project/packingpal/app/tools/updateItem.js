import { mergeDeep } from "@/app/lib/mergeDeep";

export const tool = {
  name: "updateItem",

  definition: {
    type: "function",
    function: {
      name: "updateItem",
      description: "Updates an item in the packing list",
      parameters: {
        type: "object",
        properties: {
          item: {
            type: "object",
            properties: {
              name: { type: "string" },
              category: {
                type: "string",
                enum: [
                  "clothing",
                  "campinggear",
                  "foodcooking",
                  "healthsafety",
                  "personalitems",
                  "miscellaneous",
                ],
                description: "Must be one of the predefined packing categories",
              },
              quantity: { type: "number" },
            },
          },
        },
        required: ["item"],
      },
    },
  },

  handler: (args, campingList) => {
    const { name, category, quantity } = args.item;

    let normalizedCategory = category.toLowerCase().replace(/\s+/g, "");

    const existingItems = campingList.packingList[normalizedCategory] || [];

    // Check if item already exists
    const index = existingItems.findIndex(
      (i) => i.name.toLowerCase() === name.toLowerCase(),
    );

    let updatedItems;

    if (index !== -1) {
      // Update existing item
      updatedItems = [...existingItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantity ?? updatedItems[index].quantity,
      };
    } else {
      // Add new item
      updatedItems = [
        ...existingItems,
        {
          name,
          quantity: quantity ?? 1,
        },
      ];
    }

    mergeDeep(campingList.packingList, {
      [normalizedCategory]: updatedItems,
    });

    return campingList;
  },
};
