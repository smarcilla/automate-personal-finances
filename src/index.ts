import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as moment from 'moment';

// Definimos la ruta del directorio Descargas
const downloadsPath = '/Users/sergio/Downloads';
//const fileExtension = '.xlsx';
const fileExtension = '.numbers';

// Leemos todos los archivos del directorio Descargas
const files = fs.readdirSync(downloadsPath);

// Filtramos los archivos por extensión .xlsx y por la palabra "movimientos" en el nombre
const xlsxFiles = files.filter(
  file => file.endsWith(fileExtension) && file.includes('movimientos')
);

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

  static build(row: string[]): Transaction {
    const sanitizeIndex = (index: number) =>
      fileExtension === '.numbers' ? index + 1 : index;
    const sanitizeDate = (date: string) =>
      fileExtension === '.numbers'
        ? new Date(date)
        : moment(date, 'DD/MM/YYYY').toDate();

    return new Transaction(
      sanitizeDate(row[sanitizeIndex(0)]),
      row[sanitizeIndex(2)],
      row[sanitizeIndex(3)],
      parseFloat(row[sanitizeIndex(4)])
    );
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
  const [, , , , , ...data] = xlsx.utils.sheet_to_json(sheet, {
    raw: false,
    header: 1
  });

  // Crea una matriz para almacenar los objetos Transaction
  const transactions: Transaction[] = [];

  // Recorre la matriz de objetos y muestra cada fila en consola
  data.forEach(row => {
    const transaction = Transaction.build(<string[]>row);
    transactions.push(transaction);
    console.log(row);
  });

  // Muestra la matriz de objetos Transaction en consola
  console.log(transactions);
}
