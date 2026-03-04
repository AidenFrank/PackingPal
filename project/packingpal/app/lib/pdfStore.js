let listeners = [];
let currentData = null;

// Update JSON and notify subscribers
export function updatePDF(newData) {
  currentData = newData;
  listeners.forEach((listener) => {
    try {
      listener(currentData);
    } catch (err) {
      console.error("PDF listener error:", err);
    }
  });
}

// Subscribe to updates
export function subscribeToPDF(listener) {
  listeners.push(listener);

  // Immediately send current data if it exists
  if (currentData) {
    listener(currentData);
  }

  // Return unsubscribe function
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
