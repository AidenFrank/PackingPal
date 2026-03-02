export function mergeDeep(target, source, path = "") {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    const currentPath = path ? `${path}.${key}` : key;

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      if (!target[key]) {
        target[key] = {};
      }

      mergeDeep(target[key], sourceValue, currentPath);
    } else {
      console.log(
        `Updated ${currentPath}:`,
        "FROM →",
        targetValue,
        "TO →",
        sourceValue,
      );

      target[key] = sourceValue;
    }
  }
}
