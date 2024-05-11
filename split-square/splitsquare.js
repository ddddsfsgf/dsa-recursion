function add(s1, s2) {
    if (Number.isInteger(s1) && Number.isInteger(s2)) {
      // Not || for "logical-or", but | for "bitwise-or"
      //   0|0=0  0|1=1  1|0=1  1|1=1
      return s1 | s2;
    }
  
    if (Array.isArray(s1) && !Array.isArray(s2)) {
      s2 = [s2, s2, s2, s2];
    }
  
    if (Array.isArray(s2) && !Array.isArray(s1)) {
      s1 = [s1, s1, s1, s1];
    }
  
    return [
      add(s1[0], s2[0]),
      add(s1[1], s2[1]),
      add(s1[2], s2[2]),
      add(s1[3], s2[3])
    ];
  }

  function dump(s) {
    if (s === 0 || s === 1) {
      return s.toString();
    } else {
      // Array.map(fn) - return new array of [fn(item1), fn(item2), ...]
      return s.map(dump).join(" ");
    }
  }

  function simplify(s) {
    // base case: is already just an integer  
    if (s === 0 || s === 1) return s;
  
    // recursively simplify all quadrants  
    s = s.map(simplify);  
  
    // if all four are the same integer, we can simplify  
    if (Number.isInteger(s[0]) && s.every(q => q === s[0])) return s[0];  
  
    return s;
  }

  function is_valid(s) {
    if (s === 0 || s === 1) {
      return true;
    }
  
    if (Array.isArray(s) && s.length === 4) {
      // Array.every(fn) = for every item in array, is fn(item) true?
      return s.every(is_valid);
    }
  
    return false;
  }

module.exports = {
    dump,
    is_valid,
    simplify,
    add
};