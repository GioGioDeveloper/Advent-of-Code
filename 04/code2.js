import { promises as fs } from 'fs';  // Usa `import` invece di `require`
import { exit } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import { count } from 'console';


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


let counts = {};


function addPair(pair) {
  const key = `${pair[0]},${pair[1]}`; // Concatena la coppia per creare una chiave unica
  counts[key] = (counts[key] || 0) + 1; // Incrementa il conteggio, inizializzandolo a 1 se non esiste
}
function ricerca_diagonale(righe, pattern){  
  let occorenze = 0; 
  let l = righe.length;
  let l_larghezza = righe[0].length;
  let l_pattern = pattern.length;
  let limit_ordinate = l - l_pattern;
  let check_ordinate = limit_ordinate < 0 ? 0 : 1;
  let char_centrale = pattern[1];
  //controllo che la parola possa essere cercata sull'asse delle ordinate (verticale) => quindi count righe - lunghezza parola 
  //lim_ordinate mi indica il numero di riga massimo entro cui non mi serve controllare.  
  
  let limit_ascisse = l_larghezza - l_pattern;
  //controllo che la parola possa essere cercata sull'asse delle ascisse, verso destra  (orizzontale) => quindi count caratteri riga - lunghezza parola (questo posso farlo perchè le righe sono tutte nella stessa quantità di caratteri)
  //lim_ascisse mi indica il carattere finale massimo oltre cui non mi serve controllare
  let check_ascisse = limit_ascisse < 0 ? 0 : 1;  
  
  //parola troppo corta per i caratteri e le righe a disposizione
  if(!check_ascisse && !check_ordinate) return 0;

  let char = pattern[0];
  righe.forEach((riga, index) => {
    //  if(index <= limit){
    if(index <= limit_ordinate){
      let i = -1;
      do{
        i = riga.indexOf(char, i + 1);
        if(i !== - 1){

          //controllo da sinistra verso destra (obliquo) - quindi con controllo spostandomi per verso il successivo di +1 sia verso il basso che verso destra
          if(i<=limit_ascisse){
            //carattere trovato, controllo se è presente il pattern nella riga verticale
            let j = 1;
            let ok = false;
            let posizione_char_centrale = [];
            while(j<l_pattern){
                if(righe[index+j][i+j] == pattern[j]){
                    ok = true;
                    if(pattern[j] == char_centrale) posizione_char_centrale = [index+j, i+j];
                }else{
                    ok = false;
                    break;
                }
                j++;
            }
            if(ok){
              occorenze ++;
              addPair(posizione_char_centrale)
              posizione_char_centrale = [];
            } 
          }
          if(i>=(l_pattern - 1)){
            //carattere trovato, controllo se è presente il pattern nella riga verticale
            let j = 1;
            let ok = false;
            let posizione_char_centrale = [];
            while(j<l_pattern){
                if(righe[index+j][i-j] == pattern[j]){
                    ok = true;
                    if(pattern[j] == char_centrale) posizione_char_centrale = [index+j, i-j];
                }else{
                    ok = false;
                    break;
                }
                j++;
            }
            if(ok){
              occorenze ++;
              addPair(posizione_char_centrale)
              posizione_char_centrale = [];
            } 
          }
        }
      }while(i !== -1);
    }
  });
  return occorenze;
}
// let xmas_o = ricerca_orizzontale(righe, "XMAS");
// console.log(xmas_o); //
// let samx_o = ricerca_orizzontale(righe, "SAMX");
// console.log(samx_o); //
// let xmas_v = ricerca_verticale(righe, "XMAS");
// console.log(xmas_v); //
// let samx_v = ricerca_verticale(righe, "SAMX");
// console.log(samx_v); //
let xmas_d = ricerca_diagonale(righe, "MAS");
// console.log(xmas_d); //
let samx_d = ricerca_diagonale(righe, "SAM");
// console.log(samx_d); //

// let totali = xmas_d + samx_d;
// console.log(totali);
// console.log(counts)
//se array_x presenta almeno 2 coppie uguali, allora si è disegnata una x
let x_mas_count = 0;
for (const key in counts) {
    if (counts[key] > 1) {
        x_mas_count++;
    }
  }
  
console.log(x_mas_count);