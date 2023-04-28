export function styleConverter(raw) {
    if(!raw) return {}
    return {
        color: raw.fcolor,
        fontSize: raw.fsize + "rem",
        fontWeight: raw.bold ? "bold" : "normal",
        fontStyle: raw.italic ? "italic" : "normal",
        textDecoration: raw.underline ? "underline" : "none"
    }
}

export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}