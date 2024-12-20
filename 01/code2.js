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

function bubbleSort(arr) {
    let n = arr.length;
    let scambiato;

    // Ripeti l'operazione per tutta la lunghezza dell'array
    do {
        scambiato = false;

        // Confronta gli elementi adiacenti e scambia se necessario
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Scambia gli elementi
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                scambiato = true;
            }
        }
        // Ogni volta che si passa una volta, il numero più grande viene portato alla fine
        n--;  // Ridurre il range di confronto per ogni passaggio
    } while (scambiato);  // Continua finché ci sono stati scambi
    return arr;
}


await leggiFile(); // Chiamata alla funzione per leggere il file
var a = [];
var b = [];
righe.forEach(riga =>{
    let cleanedStr = riga.replace(/\s+/g, ' ').trim();
    let el = cleanedStr.split(' ');
    // console.log(el);
    a.push(el[0]);
    b.push(el[1]); 
});
a = a.map(Number);
b = b.map(Number);

var i=0;
var somma_similarita = 0;
while(i<a.length){
    let j = 0;
    while(j<b.length){
        if(a[i]==b[j]){
            somma_similarita+= a[i];
        }
        j++;
    }
    i++;
}
console.log(somma_similarita);