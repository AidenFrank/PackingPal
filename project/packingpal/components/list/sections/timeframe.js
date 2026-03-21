export function renderTimeFrame(layout, timeframe) {
  if (!timeframe) return false;

  const fields = [
    { key: "durationDays", label: "Days" },
    { key: "durationNights", label: "Nights" },
    { key: "departDay", label: "Departure Day" },
    { key: "departTime", label: "Departure Time" },
    { key: "returnDay", label: "Return Day" },
    { key: "returnTime", label: "Return Time" },
    { key: "month", label: "Month" },
    { key: "season", label: "Season" },
  ];

  const hasData = fields.some(({ key }) => {
    const value = timeframe[key];

    return (
      value !== null && value !== undefined && value.toString().trim() !== ""
    );
  });

  if (!hasData) return false;

  const { addHeader, addText } = layout;

  addHeader("Time Frame");

  fields.forEach(({ key, label }) => {
    const value = timeframe[key];
    if (value) {
      addText(`${label}: ${value}`);
    }
  });

  return true;
}
