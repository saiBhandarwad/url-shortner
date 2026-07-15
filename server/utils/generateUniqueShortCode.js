const { nanoid } = require("nanoid");
const Link = require("../model/link");

const generateUniqueShortCode = async () => {
    let shortCode;

    do {
        shortCode = nanoid(7);
    } while (await Link.exists({ shortCode }));

    return shortCode;

}

module.exports = {
    generateUniqueShortCode
}