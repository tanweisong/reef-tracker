module.exports = {
  cloneDeep: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  forOwn: function(obj, fn) {
    if (!this.isNull(obj)) {
      const keys = Object.keys(obj);
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = obj[key];
        let result = fn(value, key, obj[key]);

        if (!this.isNullOrEmpty(result) && !result) break;
      }
    }
  },
  get: function(obj, path, defaultValue = null) {
    let result = defaultValue;

    if (!this.isNull(obj) && !this.isNullOrEmpty(path)) {
      let pathArray = [];

      if (!Array.isArray(path)) {
        pathArray = String(path).split(".");
      }

      for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];

        if (obj.hasOwnProperty(key)) {
          obj = obj[key];

          if (index === pathArray.length - 1) result = obj;
        } else if (Array.isArray(obj) && !isNaN(parseInt(key))) {
          obj = obj[key];

          if (index === pathArray.length - 1) result = obj;
        }
      }
    }

    return result;
  },
  has: function(obj, path) {
    let result = true;

    if (!this.isNull(obj) && !this.isNullOrEmpty(path)) {
      let pathArray = [];

      if (!Array.isArray(path)) {
        pathArray = String(path).split(".");
      }

      for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];

        if (obj.hasOwnProperty(key)) {
          obj = obj[key];
        } else {
          result = false;
          break;
        }
      }
    } else result = false;

    return result;
  },
  indexOf: function(array, value) {
    if (!this.isNull(array)) {
      return array.indexOf(value);
    } else {
      return -1;
    }
  },
  isArray: function(value) {
    return Array.isArray(value);
  },
  isEmpty: function(value) {
    if (!this.isNull(value)) {
      if (typeof value.length === "number" && value.length === 0) {
        return true;
      } else if (typeof value.size === "number" && value.size === 0) {
        return true;
      } else if (typeof value === "object" && Object.keys(value).length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  isNull: function(value) {
    return value == null;
  },
  isNullOrEmpty: function(value) {
    return this.isNull(value) || this.isEmpty(value);
  }
};
