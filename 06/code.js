import { promises as fs } from 'fs';  // Usa `import` invece di `require`
import { exit } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import { Console } from 'console';


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


//array bidimensionale, y,x
const matrice = righe.map(riga => riga.split(""));
const lx = matrice.length;
const ly = matrice[0].length;

function return_position_gardian(a = [[]]){
  let px_iniziale = 0;
  let py_iniziale = 0;
  for(let x = 0; x<lx; x++){
    for(let y=0; y<ly; y++){
      if(matrice[x][y]=="^"){
        px_iniziale = x; py_iniziale = y;
      }
    }
  }
 return [px_iniziale, py_iniziale]; 
}
var pos_guardia = return_position_gardian(matrice);

// La guardia si sposta di un passo avanti e, ad ostacolo trovato gira a destra.
// Spostandosi poi sempre di un passo avanti. 
/**
 * La seguente funzione restituisce una matrice con tutti i punti in cui è passata la guardia contrassegnati con X
 * Parametri:
 * @param array matrice
 * @param string direzione (0 -> Up; 1 -> Right; 2 -> Down; 3 -> Left) 
 * @param int posx -> posizione iniziale x  
 * @param int posy -> posizione iniziale y  
 */
function mappa_matrice(mappa, direzione = 0, posx = 0, posy = 0){
  if(direzione < 0 || direzione > 3) return false; 
  // Gestisco lo spostamento,
  // ogni qual volta trovo un ostacolo vado in una posizione successiva dell'array spostamenti. 
  // La posizione prevede lo spostamento sempre verso destra.  
  let spostamenti = [[-1, 0],[0, 1],[1, 0], [0, -1]];
  //quando esco dalla mappa posso concludere il tutto
  let exit = false;  
  do{  
    //setto le posizioni successive in base allo spostamento sancito dalla direzione
    mappa[posx][posy] = (mappa[posx][posy] == "#") ? "#" : "X";
    let m_posx = posx + spostamenti[direzione][0];
    let m_posy = posy + spostamenti[direzione][1];
    if(m_posx < 0 || m_posx > (lx - 1) || m_posy < 0 || m_posy > (ly - 1)) {
        exit = true;
        break;
    }
    if(mappa[m_posx][m_posy]=="#") direzione++;
    else{ posx = m_posx; posy = m_posy;}
    direzione = direzione > 3 ? 0 : direzione;
  }while(!exit);
  
  return mappa || [[]];
}
let mappa = mappa_matrice(matrice, 0, pos_guardia[0], pos_guardia[1]); 
// console.log(mappa);
let count = 0;
mappa.map(riga => {
  for(let i = 0; i<riga.length; i++){
    if(riga[i]=="X") count++;
  }
});
console.log(count);