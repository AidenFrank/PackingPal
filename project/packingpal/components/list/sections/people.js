export function renderPeople(layout, people) {
  if (!people || people.length === 0) return false;

  const validPeople = people.filter((p) => p?.name?.toString().trim());

  if (validPeople.length === 0) return false;

  const { addHeader, addText } = layout;

  addHeader(`People (${validPeople.length})`);

  validPeople.forEach((p) => {
    const roleText = p.role ? ` (${p.role})` : "";
    addText(`- ${p.name}${roleText}`);
  });

  return true;
}
