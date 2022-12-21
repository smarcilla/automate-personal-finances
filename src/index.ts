import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as moment from "moment";


// Definimos la ruta del directorio Descargas
const downloadsPath = '/Users/sergio/Downloads';

// Leemos todos los archivos del directorio Descargas
const files = fs.readdirSync(downloadsPath);

// Filtramos los archivos por extensión .xlsx y por la palabra "movimientos" en el nombre
const xlsxFiles = files.filter((file) => file.endsWith('.xlsx') && file.includes('movimientos'));

// Define una clase Transaction con los campos que deseas almacenar
class Transaction {
  date: Date;
  concept: string;
  movement: string;
  amount: number;
  constructor(date: Date, concept: string, movement: string, amount: number) {
    this.date = date;
    this.concept = concept;
    this.movement = movement;
    this.amount = amount;
  }

  static build(row: string[]):Transaction{

    return new Transaction(moment(row[0],"DD/MM/YYYY").toDate(), row[2],row[3], parseFloat(row[4]))
  }
}
// Recorremos los archivos filtrados y los leemos con xlsx
for (const file of xlsxFiles) {
  const filePath = `${downloadsPath}/${file}`;
  const workbook = xlsx.readFile(filePath); 
  // Aquí puedes procesar la información del archivo como desee  

  // Selecciona la primera hoja del libro de trabajo
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convierte la hoja de cálculo en una matriz de objetos
  const [title,title2,header, c, c1, ...data] = xlsx.utils.sheet_to_json(sheet, {raw:false, header:1});

  // Crea una matriz para almacenar los objetos Transaction
  const transactions:Transaction[] = [];

  // Recorre la matriz de objetos y muestra cada fila en consola
  data.forEach((row) => {
      const transaction = Transaction.build(<string[]>row);
      transactions.push(transaction);
      console.log(row)
  });

  // Muestra la matriz de objetos Transaction en consola
  console.log(transactions);
}


