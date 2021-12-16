const store = {};

module.exports = {
  set: (key, value) => {
    store[key] = value;
  },
  get: (key) => {
    return store[key];
  }
}