var timeLogger = {
  _values: {},

  add: function (key) {
    if (!this._values[key]) {
      this._values[key] = {
        time: this._now(),
        isSnapped: false
      };
    }

  },

  update: function (key) {
    const value = this._values[key];
    if (value) {
      value.time = this._now();
    }
  },

  reset: function (key) {
    const value = this._values[key];
    if (value) {
      value.isSnapped = false;
    }
  },

  snapOnce: function (key) {
    const value = this._values[key];
    if (value && !value.isSnapped) {
      value.isSnapped = true;
      return this._diff(key);
    }
    return 0;
  },

  snap: function (key) {
    return this._values[key] ? this._diff(key) : 0;
  },

  remove: function (key) {
    delete this._values[key];
  },

  _now: function () {
    return performance.now();
  },

  _diff: function (key) {
    return ((this._now() - this._values[key].time) / 1000).toFixed(3);
  },
};