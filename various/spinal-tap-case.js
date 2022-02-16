function spinalCase(text) {
    const camelcase = new RegExp(/([a-z])([A-Z])/)
    const separators = new RegExp(/\ |\_/)
    const words = text
        .replace(camelcase, '$1-$2')
        .replace(separators, '-')
        .toLowerCase()
    return words
}

console.log(spinalCase('areaBottom top'))