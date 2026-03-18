const prompts = require('prompts');
var hashPatterns = []
var possibleHashes = []

function checkHashLength(text) {
    textLength = text.length

    //  If 32 characters, remove all but MD5, NTLM (MD4), argon2
	// - If 64 characters, it may be SHA-256
	// - If 96 characters, it may be SHA-384
	// - If 128 characters, it may be SHA-512

    if (textLength == 32) {
        hashPatterns.push("32 Characters long")
        possibleHashes.push(["MD5", "NTLM"])
        // return "MD5 or NTLM"
    } else if (textLength == 64){
        hashPatterns.push("64 Characters long")
        return "SHA-256"
    } else if (textLength == 96){
        hashPatterns.push("96 Characters long")
        return "SHA-384"
    } else if (textLength == 128){
        hashPatterns.push("128 Characters long")
        return "SHA-512"
    } else {
        hashPatterns.push("Variable character length")
        return "Other"
    }
}

function checkHashCharacters(text) {
    const textArr = text.split('')

    for (let index = 0; index < textArr.length; index++) {
        const element = textArr[index];

        if (["%", "/", ".", "$"].includes(element)) {
            hashPatterns.push("Contains '% / . $' ")
            return "bcrypt or argon2"
        } else {
            hashPatterns.push("Contains alphanumeric characters only")
            return "other"
        }
    }
}

function checkHashPrefix(text) {
    console.log(text.substring(0, 7))

    if (text.substring(0, 7)  == "$argon2") {
        hashPatterns.push("contains prefix 'argon2' ")
    } else {
        hashPatterns.push("no unique prefixes found")
    }
}

async function main() {
    const result = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter Hash: '

    })

    console.log("Hash: " + result.value)
    console.log("Hash length: " + checkHashLength(result.value))
    console.log("Hash characters: " + checkHashCharacters(result.value))
    console.log("Hash Prefixes: " + checkHashPrefix(result.value))

    console.log(possibleHashes)
    console.log(hashPatterns)
}

main();

