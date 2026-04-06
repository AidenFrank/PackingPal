export function renderLocation(layout, location) {
  if (!location) return;

  const hasData = location.name?.trim() || location.address?.trim();

  if (!hasData) return false;

  const { addHeader, addText } = layout;

  addHeader("Location Information");

  if (location.name) addText(location.name);
  if (location.address) addText(`Address: ${location.address}`);

  return true;
}
