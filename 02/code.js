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

// function bubbleSort(arr) {
//     let n = arr.length;
//     let scambiato;

//     // Ripeti l'operazione per tutta la lunghezza dell'array
//     do {
//         scambiato = false;

//         // Confronta gli elementi adiacenti e scambia se necessario
//         for (let i = 0; i < n - 1; i++) {
//             if (arr[i] > arr[i + 1]) {
//                 // Scambia gli elementi
//                 let temp = arr[i];
//                 arr[i] = arr[i + 1];
//                 arr[i + 1] = temp;
//                 scambiato = true;
//             }
//         }
//         // Ogni volta che si passa una volta, il numero più grande viene portato alla fine
//         n--;  // Ridurre il range di confronto per ogni passaggio
//     } while (scambiato);  // Continua finché ci sono stati scambi
//     return arr;
// }


await leggiFile(); // Chiamata alla funzione per leggere il file
var a = [];
// console.log(righe);

var report_sicuri = 0;
// righe.forEach((riga, index) =>{
//     let cleanedStr = riga.replace(/\s+/g, ' ').trim();
//     let el = cleanedStr.split(' ');
//     el = el.map(Number);
//     let i = 0;
//     let aumento = false;
//     let diminuzione = false;
//     let livello_cattivo = false;
//     while(i<el.length - 1){
//         let differenza = el[i]-el[i+1];
        
//         if(differenza > 0 && differenza < 4){
//             aumento = true;
//         }else if(Math.abs(differenza)>0 && Math.abs(differenza)<4){
//             diminuzione = true;
//         }else{
//             // if(differenza==0 || Math.abs(differenza) > 3)
//             if(i==0){
//                 aumento = false;
//                 diminuzione = false;
//             }else if(aumento != diminuzione){
//                 let diff_m = el[i-1] - el[i + 1];
//                 let aumento_m = (diff_m > 0 && diff_m < 4);
//                 let dim_m = (Math.abs(diff_m) > 0 && Math.abs(diff_m) < 4);
//                 if((aumento && !aumento_m) || (diminuzione && !dim_m)){
//                     aumento = false;
//                     diminuzione = false;
//                 }
//             }
//         }
//         if(i!=0){
//             if(aumento == diminuzione) break;
//         }
//         i++; 
//     }
//     if(aumento!=diminuzione) sicuro++;
// });

function check_safe(el){
    let i = 0;
    let aumento = false;
    let diminuzione = false;
    while(i<el.length - 1){
        let differenza = el[i]-el[i+1];
        
        if(differenza > 0 && differenza < 4){
            aumento = true;
        }else if(Math.abs(differenza)>0 && Math.abs(differenza)<4){
            diminuzione = true;
        }else{
            // if(differenza==0 || Math.abs(differenza) > 3)
            aumento = false;
            diminuzione = false;
        }
        if(aumento == diminuzione) break;
        i++; 
    }
    if(aumento!=diminuzione) return 1;

    return 0;
}
righe.forEach((riga, index) =>{
    let cleanedStr = riga.replace(/\s+/g, ' ').trim();
    let el = cleanedStr.split(' ');
    el = el.map(Number);
    var sicuro = check_safe(el);
    if(sicuro) report_sicuri++;
   
});
console.log(report_sicuri);
