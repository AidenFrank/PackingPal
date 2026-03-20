export function renderLocation(layout, location) {
  if (!location || location.length === 0) return;

  const { addHeader, addText } = layout;

  addHeader("Location Information");

  if (location.name) {
    addText(`Name: ${location.name}`);
  }
  if (location.address) {
    addText(`Address: ${location.address}`);
  }
}
