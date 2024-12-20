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
    for(let i = 0; i<a.length; i++){
      //cerco il valore e nell'array y. Se presente controllo che le restanti pagine dell'aggiornamento 
      //non siano presenti nell'array parallelo x. 
      for(let iy = 0; iy<y.length; iy++){
          if(a[i] == y[iy]){
            //pagina trovata in y, controllo se nella posizione iy dell'array x è presente una delle pagine successive presenti nell'aggiornamento ( i + 1 fino a a.lenght - 1)
            for(let ip = i+1; ip<a.length; ip++){
              if(x[iy] == a[ip]) {
                return false;
              }
            }
          }
      }
    }
    return true;
}
function ordina_aggiornamento(a = []){
  if(a.length == 0) return false;
  for(let i = 0; i<a.length; i++){
    //cerco il valore e nell'array y. Se presente controllo che le restanti pagine dell'aggiornamento 
    //non siano presenti nell'array parallelo x. 
    for(let iy = 0; iy<y.length; iy++){
        if(a[i] == y[iy]){
          //pagina trovata in y, controllo se nella posizione iy dell'array x è presente una delle pagine successive presenti nell'aggiornamento ( i + 1 fino a a.lenght - 1)
          for(let ip = i+1; ip<a.length; ip++){
            if(x[iy] == a[ip]){
              let pagina = a[ip];
              a[ip] = a[i];
              a[i] = pagina;
              //ho fatto il controllo riparto dalla stessa posizione
              i = Math.max(0, i - 1);
            }
          }
        }
    }
  }
  return a;
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
    let aggiornamento = a.split(",");
    let ic = (aggiornamento.length - 1) / 2;
    let check_a = check_aggiornamento(aggiornamento);
    if(!check_a){
      console.log(aggiornamento);
      let a_ordinato = ordina_aggiornamento(aggiornamento);
      if(a_ordinato){
         console.log(a_ordinato);
         sac += parseInt(aggiornamento[ic]);
       }
    }                                                                           
});
console.log(sac);