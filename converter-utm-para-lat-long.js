const yargs = require('yargs');
const utm = require('utm')
const fs = require('fs');
const parseCSV = require('./parse-csv')

const {path,out,ajuda,zoneNumber,zoneLetter, northern} = yargs.argv

if(ajuda) {
    console.group()
    console.log("Instruções:")
    console.log("   comando: node converter-utm-para-lat-long.js")
    console.log("   opções:")
    console.log('       --path: *Obrigatorio*, define o caminho para o arquivo csv de origem \n         Ex: --path="C://arquivo.csv"\n')
    console.log('       --out:  *Opcional*, define o local onde será gravado o arquivo, o valor padrão é "./files/latlon.csv"\n         Ex: --out="C://pasta/nomeDoArquivo"\n')
    console.log('       --zoneNumber: *Opcional*, define o numero da zona UTM, o valor padrão é 23\n')
    console.log('       --zoneLetter: *Opcional*, define a letra da zona UTM, o valor padrão é ""\n')
    console.log('       --northern: *Opcional*, define o hemisferio, o valor padrão é false\n')
    console.groupEnd()
    return
}

if(!path) {
    console.group()
    console.log('Por favor digite o caminho para o arquivo csv na variavel path \n')
    console.log('   node converter-utm-para-lat-long.js --path=arquivo.csv\n\n')
    console.log('Você pode ver uma ajuda com o comando:\n')
    console.log('   node converter-utm-para-lat-long.js --ajuda')
    console.groupEnd()
    return;
}

const lines = parseCSV(path,';')

let convertedLines =[]

for(let i=1;i<lines.length;i++) {// a primeira linha é texto
//utm.toLatLon(easting, northing, zoneNum, zoneLetter, northern, strict = true)
const E =Number(lines[i][0])
const N = Number(lines[i][1])
const zN= zoneNumber||23;
const zL = zoneLetter||''
const n = northern||false
convertedLines.push(utm.toLatLon(E,N,zN,zL,n))
}

let csvData = ["Lat;Lon\n"]
for(let coord of convertedLines) {
    csvData.push(coord.latitude,';',coord.longitude,'\n')
}
const csvFormatted = csvData.join("")


fs.writeFile(`${out?out+'.csv':'./files/latlon.csv'}`,csvFormatted,function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Arquivo convertido com sucesso");
    console.log(`O arquivo está em: ${out?out+'.csv':'./files/latlon.csv'}`)
}); 