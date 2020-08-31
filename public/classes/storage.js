class Storage {
  push = function (key, value) {
    let records = this.get(key);

    if (!records.includes(value)) {
      records.push(value);
    }

    localStorage.setItem(key, JSON.stringify(records));
  };

  get = function (key) {
    let records = localStorage.getItem(key);

    return records ? JSON.parse(records) : [];
  };

  remove = function (key) {
    localStorage.removeItem(key);
  };
}

export { Storage };
