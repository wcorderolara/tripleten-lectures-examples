function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isValidString(value) {
    /*
        {hello: "world"} -> false
        "   " -> false
        "hello" -> true
    */
    return typeof value === 'string' && value.trim().length > 0;
}

function parseJson(jsonString) {
    try {
        return { data: JSON.parse(jsonString), error: null };
    } catch (error) {
        return { data: null, error: error.message };        
    }
}

module.exports = {
    generateId,
    isValidString,
    parseJson
}