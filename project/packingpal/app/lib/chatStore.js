let listeners = [];
let currentMessages = [];

export function updateChat(messages) {
  currentMessages = messages;
  listeners.forEach((cb) => cb(currentMessages));
}

export function subscribeToChat(callback) {
  listeners.push(callback);

  // Immediately send current state
  callback(currentMessages);

  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}
