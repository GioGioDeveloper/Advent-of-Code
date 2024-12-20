import { promises as fs } from 'fs';  // Usa `import` invece di `require`
import { exit } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';


// Ottieni il percorso assoluto del file corrente (code.js)
const __filename = fileURLToPath(import.meta.url);

// Ottieni la directory corrente (dove si trova code.js)
const __dirname = path.dirname(__filename);

// Costruisci il percorso assoluto di input.txt
const filePath = path.join(__dirname, 'file.txt');

var righe = [];
var data = "";
async function leggiFile() {
    try {
        data = await fs.readFile(filePath, 'utf8');
        righe = data.split('\r\n'); // Dividi il contenuto del file in righe
    } catch (err) {
        console.error('Errore durante la lettura del file:', err);
    }
}
await leggiFile(); // Chiamata alla funzione per leggere il file
console.log(data);




function somma_prodotti_mul(stringa){
    var somma_prodotti = 0;
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    // Trova tutte le occorrenze
    const matches = stringa.match(regex);
    matches.forEach(el => {
        el = el.slice(4, -1);
        var fattori = el.split(",");
        let prodotto = fattori[0] * fattori[1];
        somma_prodotti+= prodotto;
    }); 
    return somma_prodotti;  
}

var somma_prodotti_do = 0;
var stringhe = data.split("do()");
stringhe.forEach(stringa => {
    var stringa_estratta = stringa.split("don't()");
    // console.log(stringa_estratta);
    somma_prodotti_do += somma_prodotti_mul(stringa_estratta[0]);
});
console.log(somma_prodotti_do);