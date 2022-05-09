let lang;
let swears = [];
/**
 *  Constructor for contentFilter object
 *  @param {string} extraWords: A list, seperated by commas, of words to be added to the filter
 */
function ContentFilter(language, extraWords) {
    // this.extraWords = extraWords;
    // this.filter = [];
    // this.filter.push(...this.extraWords.split(','));
    if (language === undefined) {
        lang = 'en';
    } else {
        let languages = ['en', 'es', 'it', 'id'];
        lang = language.toLowerCase();
        if (languages.includes(lang)) {
            lang = language;
        } else {
            throw new Error('Language not supported, please use one of the following: ' + languages.join(', '));
        }
    }
    swears = getSwears();
    if (extraWords !== undefined && extraWords.length > 0) {
        setTimeout(() => {
            let extra = extraWords.split(',');
            for (let i = 0; i < extra.length; i++) {
                if (extra[i].substring(0, 1) === ' ') {
                    extra[i] = extra[i].substring(1);
                }
                swears.push(extra[i].toLowerCase());
            }
        }, 0);
    }
}


/**
 *  Function to get and clean the swear words for the language
 *  @return {array} The swear words
 */
function getSwears() {
    readJson("./src/swears/" + lang + '.json', function(text){
        let data = text.split(',');
        data[0] = data[0].substring(11,data[0].length-1);
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].replace(/"/g, '');
            data[i] = data[i].replace(/\[/g, '');
            data[i] = data[i].replace(/]/g, '');
            data[i] = data[i].replace(/{/g, '');
            data[i] = data[i].replace(/}/g, '');
        }
        swears = data;
    });
}

/**
 * Get the list of swear words from the json file
 * @param file The file to read
 * @param callback The callback function
 */
function readJson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        callback(rawFile.responseText);
    }
    rawFile.send(null);
}


ContentFilter.prototype.filter = function(input) {
    const data = input.split(' ')
    for (let i = 0; i < data.length; i++) {
        let check = data[i].toLowerCase();
        check = check.replace(/"/g, '');
        check = check.replace(/\[/g, '');
        check = check.replace(/]/g, '');
        check = check.replace(/{/g, '');
        check = check.replace(/}/g, '');
        check = check.replace(/,/g, '');
        check = check.replace(/\./g, '');
        check = check.replace(/\?/g, '');
        check = check.replace(/!/g, '');
        check = check.replace(/¡/g, '');
        check = check.replace(/¿/g, '');
        if(swears.includes(check)) {
            data[i] = '***';
        }
    }
    return data.join(' ')
}

export {
    ContentFilter
}