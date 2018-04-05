const category = {
    image: 1,
    ppt: 2,
    doc: 2,
    xls: 2,
    video: 3,
    mp3: 5,
    exe: 6,
    other: 7
}
module.exports = {
    isEmpty: function(obj) {
        if (Array.isArray(obj)) {
            return Array.length === 0
        }
        let count = 0;
        for (let k in obj) {
            count++
        }
        return count === 0
    },
    signType: function(type) {
        const res = type.match(/image|ppt|doc|xls|video|exe|mp3/)
        if (res) {
            return category[res[0]]
        }
        return category['other']
    }
}