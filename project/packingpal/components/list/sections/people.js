export function renderPeople(layout, people) {
  if (!people || people.length === 0) return;

  const { addHeader, addText } = layout;

  addHeader("People");

  people.forEach((p) => {
    const roleText = p.role ? ` (${p.role})` : "";
    addText(`- ${p.name}${roleText}`, 5);
  });
}
