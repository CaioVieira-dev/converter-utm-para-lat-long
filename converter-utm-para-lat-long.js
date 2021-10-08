const yargs = require('yargs');
const utm = require('utm')
const fs = require('fs');
const parseCSV = require('./parse-csv')

// const res = parseCSV('./csv/TesteLatLon_1.csv',';')
// console.log(res)
//node converter-utm-to-lat-long.js --path='./meuArquivo.csv' --out='./lat-long.csv'

const {path,out,help,zoneNumber,zoneLetter} = yargs.argv

console.log(path,out,help,zoneNumber,zoneLetter)

if(!path) {
    console.log('Por favor digite o caminho para o arquivo csv na variavel path \n\nnode converter-utm-para-lat-long.js --path=arquivo.csv')
    return;
}

const lines = parseCSV(path,';')

// console.log(lines)

let convertedLines =[]

for(let i=1;i<lines.length;i++) {// a primeira linha é texto
//utm.toLatLon(easting, northing, zoneNum, zoneLetter, northern, strict = true)
const E =Number(lines[i][0])
const N = Number(lines[i][1])
const zoneNumber= 23;
const zoneLetter = ''
const northern = false
convertedLines.push(utm.toLatLon(E,N,zoneNumber,zoneLetter,northern))
}
// console.log(convertedLines)

let csvData = ["Lat;Lon\n"]
for(let coord of convertedLines) {
    csvData.push(coord.latitude,';',coord.longitude,'\n')
}
const csvFormatted = csvData.join("")


fs.writeFile(`./files/${out?out:'latlon.csv'}`,csvFormatted,function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Arquivo convertido com sucesso");
}); 