function generateRandomColors(numColors:number):string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {

        const color = "#" + Math.floor(Math.random()*16777215).toString(16);
        colors.push(color);
    }
    return colors;
}

export default generateRandomColors;