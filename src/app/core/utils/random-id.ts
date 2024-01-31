export function generateRandomId(length = 20) {
    const values = new Uint32Array(length / 2);
    crypto.getRandomValues(values);
    return Array.from(values, dec => dec.toString(16)).join('').substr(0, length);
};