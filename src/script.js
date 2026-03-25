function analyzeHash() {
    const input = document.getElementById("hashInput").value.trim();
    const length = input.length;

    const charCount = document.getElementById("charCount");
    const hashType = document.getElementById("hashType");
    const description = document.getElementById("hashDescription");

    charCount.textContent = `Characters: ${length}`;

    let type = "Unknown";
    let desc = "This does not match a common hash length.";

    if (length === 32) {
        type = "MD5";
        desc = "MD5";
    }
    else if (length === 40) {
        type = "SHA-1";
        desc = "SHA-1.";
    }
    else if (length === 64) {
        type = "SHA-256";
        desc = "SHA-256 ";
    }
    else if (length === 128) {
        type = "SHA-512";
        desc = "SHA-512 ";
    }

    hashType.textContent = `Type: ${type}`;
    description.textContent = desc;
}