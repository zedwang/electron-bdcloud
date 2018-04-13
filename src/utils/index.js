
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

export function icon(type) {
  const res = type.match(/image|zip|word|xls|mp3|folder/);
  if (res) {
    return type.match(res)[0];
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