
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
    const res = type.match(/image|zip|word|xls|mp3/)
    if (res) {
        return type.match(res)[0]
    }
    return 'other'

}