const prompts = require('prompts');

function checkHashLength(text) {
    textLength = text.length

    //  If 32 characters, remove all but MD5, NTLM (MD4), argon2
	// - If 64 characters, it may be SHA-256
	// - If 96 characters, it may be SHA-384
	// - If 128 characters, it may be SHA-512

    if (textLength == 32) {
        return "MD5 or NTLM"
    } else if (textLength == 64){
        return "SHA-256"
    } else if (textLength == 96){
        return "SHA-384"
    } else if (textLength == 128){
        return "SHA-512"
    } else {
        return "Other"
    }
}

function checkHashCharacters(text) {
    const textArr = text.split('')

    for (let index = 0; index < textArr.length; index++) {
        const element = textArr[index];

        if (["%", "/", ".", "$"].includes(element)) {
            return "bcrypt or argon2"
        } else {
            return "other"
        }
        
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

}

main();

