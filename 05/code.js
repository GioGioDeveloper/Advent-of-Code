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

let x = [];
let y = [];
let aggiornamenti = [];
let aggiorna = false;

function check_aggiornamento(a = []){
    if(a.length == 0) return false;
    // console.log(a);
    for(let i = 0; i<a.length; i++){
      // console.log(e + " => " + i);
      //cerco il valore e nell'array y. Se presente controllo che le restanti pagine dell'aggiornamento 
      //non siano presenti nell'array parallelo x. 
      for(let iy = 0; iy<y.length; iy++){
          if(a[i] == y[iy]){
            // console.log(e + " trovato in " + py + " alla posizione "+ iy)
            //pagina trovata in y, controllo se nella posizione iy dell'array x è presente una delle pagine successive presenti nell'aggiornamento ( i + 1 fino a a.lenght - 1)
            for(let ip = i+1; ip<a.length; ip++){
              // console.log(ip + " " + a[ip]);
              if(x[iy] == a[ip]) {
                // console.log("ATT " + a[ip] + " trovato nell'array x alla posizione " +iy);
                return false;
              }
            }
          }
        // console.log("esco dal foreach");
      }
    }
    return true;
}

righe.forEach(riga => {
    if(riga=="") aggiorna = true; 
    if(!aggiorna){
      let split_riga = riga.split("|"); 
      x.push(split_riga[0]);
      y.push(split_riga[1]);
    }else if(riga!=""){
      aggiornamenti.push(riga);
    }
});

let sac = 0;
aggiornamenti.forEach((a, j) =>{
  // if(j==3){
    let aggiornamento = a.split(",");
    let ic = (aggiornamento.length - 1) / 2;
    let check_a = check_aggiornamento(aggiornamento);
    // console.log(aggiornamento);
    // console.log(check_a);
  // }
  if(check_a)
    sac+= parseInt(aggiornamento[ic]);
    // console.log(ic);
});
console.log(sac);