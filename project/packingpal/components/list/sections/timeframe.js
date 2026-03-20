export function renderTimeFrame(layout, timeframe) {
  if (!timeframe || timeframe.length === 0) return;

  const { addHeader, addText } = layout;

  addHeader("Time Frame");

  if (timeframe.durationNights) {
    addText(`Nights: ${timeframe.durationNights}`);
  }
}
