
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

export function getExistingProperties(obj){
    const trueObj = {}
    for (const key in obj){
        const val = obj[key]
        if ( val || typeof val === 'boolean')
            trueObj[key] = val
    }
    return trueObj
}

export function debounce( func , time ){
    let timeoutId
    return ( ...args ) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout( () => {
            func( ...args)
        }, time )
    }
}