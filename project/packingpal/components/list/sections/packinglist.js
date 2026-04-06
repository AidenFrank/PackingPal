export function renderPackingList(layout, categories) {
  if (!categories) return false;
  console.log(categories);
  const { addHeader, addText } = layout;

  const categoryOrder = [
    "clothing",
    "campinggear",
    "foodcooking",
    "healthsafety",
    "personalitems",
    "miscellaneous",
  ];

  function formatCategoryName(key) {
    const map = {
      clothing: "Clothing",
      campinggear: "Camping Gear",
      foodcooking: "Food & Cooking",
      healthsafety: "Health & Safety",
      personalitems: "Personal Items",
      miscellaneous: "Miscellaneous",
    };

    return map[key] || key;
  }

  let renderedAnything = false;

  categoryOrder.forEach((key) => {
    const items = categories[key];

    if (!items || items.length === 0) return;

    // Filter valid items
    const validItems = items.filter((item) => item?.name?.toString().trim());

    if (validItems.length === 0) return;

    renderedAnything = true;

    // Format category name nicely
    const title = formatCategoryName(key);

    addHeader(`${title} (${validItems.length})`);

    validItems.forEach((item) => {
      const qtyText =
        item.quantity !== null && item.quantity !== undefined
          ? ` x${item.quantity}`
          : "";

      addText(`- ${item.name}${qtyText}`);
    });
  });

  return renderedAnything;
}
