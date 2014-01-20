/**
 * Expose `around`
 */

exports = module.exports = around;

/**
 * Word separator
 */

var rseparator = exports.separator = /\s+/;

/**
 * Look around the `node`'s `offset` for a particular
 * string or pattern.
 *
 * Examples:
 *
 *   around('lol')
 *   around(/abc/)
 *
 * @param {String|Number|RegExp|Array} pattern
 * @param {String} text
 * @param {Number} offset
 * @return {Array|null}
 * @api public
 */

function around(pattern, text, offset) {
  // get the number of spaces in string
  var spaces = count(pattern.source || pattern);

  // convert string to regexp
  pattern = ('string' == typeof pattern) ? new RegExp('^' + pattern + '$') : pattern;

  // get the substring to search on
  var lstr = text.slice(0, offset).split(rseparator).slice(-(spaces + 1)).join(' ');
  var rstr = text.slice(offset).split(rseparator).slice(0, spaces + 1).join(' ');

  // diagonally advance
  var i = 1;
  var j;

  var llen = lstr.length;
  var rlen = rstr.length;

  var str;

  // loop until both sides have been traversed
  while(llen > 0 || rlen > 0) {

    // test for match
    if (match(str = at(i, i)) && largest(str, i, i)) return str.match(pattern);

    // traverse left
    for (j = i - 1; j >= 0; j--) {
      if (match(str = at(j, i)) && largest(str, j, i)) return str.match(pattern);
    }

    // traverse up
    for (j = i - 1; j >= 0; j--) {
      if (match(str = at(i, j)) && largest(str, i, j)) return str.match(pattern);
    }

    i++;
    llen--;
    rlen--;
  }

  return null;

  /**
   * Check if there's a match
   *
   * @param {String} str
   * @return {Boolean}
   */

  function match(str) {
    return pattern.test(str);
  }

  /**
   * Check the surrounding boxes to see
   * if there's a larger value
   *
   * @param {Number} l
   * @param {Number} r
   * @return {Boolean}
   */

  function largest(str, l, r) {
    var len = str.length;
    var m;

    return !(match(m = at(l + 1, r + 1)) && m.length > len)
      && !(match(m = at(l + 1, r)) && m.length > len)
      && !(match(m = at(l, r + 1)) && m.length > len);
  }

  /**
   * Get the substring at a particular coordinate
   *
   * @param {Number} l
   * @param {Number} r
   */

  function at(l, r) {
    return (l ? lstr.slice(-l) : '') + rstr.slice(0, r);
  }
}

/**
 * Count the number of spaces in `str`
 *
 * @param {String} str
 * @return {Number}
 */

function count(str) {
  return str.split(rseparator).length - 1;
}
