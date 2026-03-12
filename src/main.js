const prompts = require('prompts');

function calculateHash() {
    // Get hash from input
    var hash = document.getElementById("hashForm").value;

    console.log(hash)

    // Check if hash has non-alphanumeric characters
    for (let index = 0; index < hash.length; index++) {

        // console.log(hash[index])

        if ( hash[index] in ["!?#[]*/\\$£"]) {
            console.log("Non-Alpha Numeric Character")
        } else {
            console.log(hash[index])
        }
        
    }

    

    alert(hash);
}

async function main() {
    const result = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter Hash: '

    })

    console.log(result.value)

}

main();

