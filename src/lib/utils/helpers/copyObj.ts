/**
 * The copyObj function is used to make deep copy of an object.
 * @param {Object} target - the object to copy
 * @returns {Object} copy - copy of the object
 */
export function copyObj<T>(target: T): T {
  if (!target) {
    console.trace ("[copyObj]: target is undefined or null, target: ", target)
    return target
  }

  if (typeof target !== 'object') return target

  if (typeof structuredClone === "function") {
    return structuredClone(target)
  }

  return JSON.parse(JSON.stringify(target))
}
