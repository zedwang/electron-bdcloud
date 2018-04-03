
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