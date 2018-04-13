const category = {
  image: 1,
  ppt: 2,
  doc: 2,
  xls: 2,
  video: 3,
  mp3: 5,
  exe: 6,
  other: 7
};
module.exports = {
  isNotEmpty: function(obj) {
    if (!obj) return false;
    if ( typeof obj === 'string') {
      return Boolean(obj.length);
    }
    if (Array.isArray(obj)) {
      return Boolean(Array.length);
    }
    return Boolean(Object.keys(obj).length);
  },
  signType: function(type) {
    const res = type.match(/image|ppt|doc|xls|video|exe|mp3/);
    if (res) {
      return category[res[0]];
    }
    return category['other'];
  }
};