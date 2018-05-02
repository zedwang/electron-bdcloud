
export function formatSize(size) {
  let volume  = Math.round(size / (1024*1024*1024));
  let unit = 'G';
  if (volume >= 1024) {
    volume = Math.round(volume / 1024);
    unit = 'T';
    return volume + unit;
  }
  return volume + unit;
}

export function iconType(type) {
  const types = {
    video: /video|mp4|mkv/,
    image: /image|jpg|jpeg|gif|png/,
    zip: /zip/,
    word: /word/,
    xls: /xls/,
    app: /exe|ms|dmg/,
    folder: /folder/
  };
  for (const [key, value] of Object.entries(types)) {
    const res = type.match(value);
    if (res) {
      return key; 
    }
  }
  return 'other';
}

export function queryParams(params) {
  const keys = Object.keys(params);
  if (keys.length) {
    return '?' + keys
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }
  return '';
   
}