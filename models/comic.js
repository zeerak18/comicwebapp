//require nodes node-fetch library for requests
const fetch = require("node-fetch");

class Comic {

    static async get(num) {

        const lastComic = await fetch(`http://xkcd.com/info.0.json`).then(response => response.json());

        if (num && num > lastComic.num) {
            return null;
        } else {

            const param = num ? num : '';
            const comic = await fetch(`http://xkcd.com/${param}/info.0.json`).then(response => response.json());

            return {
                title: comic.title,
                img: comic.img,
                month: comic.month,
                year: comic.year,
                transcript: comic.transcript,
                prevNum: Comic.getPrev(comic.num),
                nextNum: Comic.getNext(comic.num, lastComic.num),
                randomNum: Comic.getRandom(lastComic.num),
                isFirst: comic.num === Comic.getPrev(comic.num),
                isLast: comic.num === Comic.getNext(comic.num, lastComic.num)
            }

        }

    }
// for previous
    static getPrev(num) {
        if (num === 1) {
            return num;
        } else {
            return num - 1;
        }
    }

// for next
    static getNext(num, lastNum) {
        if (num === lastNum) {
            return num;
        } else {
            return num + 1;
        }
    }

// functionality to get random comic strip
    static getRandom(lastNum) {
        const min = Math.ceil(1);
        const max = Math.floor(lastNum);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

module.exports = Comic;
