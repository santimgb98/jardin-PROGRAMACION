const prompt = require("prompt-sync")();
const xlsx = require("xlsx");
const luxon = require("luxon");
const fs = require("fs");
let fecha_hora = luxon.DateTime;
let hoy = fecha_hora.local();

const plantasBDjson = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// Función asíncrona para regar la planta que lo necesite
async function regarPlanta(nombre_planta) {
  return new Promise((resolve) => {
    for (let i = 0; i < plantasBDjson.length; i++) {
      // Planta de la lista = planta del parámetro
      if (plantasBDjson[i].nombre == nombre_planta) {
        // Última fecha de riego se iguala a hoy
        plantasBDjson[i].ultima_fecha_riego = hoy.toISODate();
      }
    }
    // Reescribe el contenido del JSON
    resolve(
      fs.writeFileSync(
        "./data.json",
        JSON.stringify(plantasBDjson, null, 2),
        "utf8"
      )
    );
  });
}

// Función asíncrona para revisar si hace falta regar la
// planta especificada mediante parámetro
function revisarSiNecesitaRiego(planta_) {
  // fecha_hoy = fecha escrita (fecha de hoy)
  const fecha_hoy = fecha_hora.fromISO(hoy.toISODate());

  // Pasa a formato fecha la última fecha de riego
  const ultima_fecha_riego = fecha_hora.fromISO(planta_.ultima_fecha_riego);

  // diferencia = diferencia entre fechas en formato "días"
  const diferencia = fecha_hoy.diff(ultima_fecha_riego, "days");

  // diferencia.days para ponerlo en formato número
  if (diferencia.days > planta_.frecuencia_riego) return true; //Necesita riego
  if (diferencia.days <= planta_.frecuencia_riego) return false; //No necesita riego
}

class Jardin {
  constructor(nombre, tipo, frecuencia_riego, ultima_fecha_riego) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.frecuencia_riego = frecuencia_riego;
    this.ultima_fecha_riego = ultima_fecha_riego;
  }
  // Método añadir planta
  async addPlanta() {
    console.clear();
    this.nombre = prompt("Nombre de la nueva planta: ").toUpperCase();
    // ^[A-Z]+$: Determina que sea un nombre de la A-Z
    // .test(): Método que comprueba si el nombre cumple la condición
    while (!/^[A-Z]+$/.test(this.nombre)) {
      this.nombre = prompt("Nombre VÁLIDO de la nueva planta: ").toUpperCase();
    }
    console.log("TIPOS (Selecciona su orden):");
    console.log("1. Flor");
    console.log("2. Árbol");
    console.log("3. Arbusto");
    this.tipo = prompt("Tipo de la nueva planta: ");
    while (this.tipo > 3 || this.tipo < 1 || isNaN(this.tipo) === true) {
      this.tipo = prompt("Tipo de la nueva planta (TIPO VÁLIDO): ");
    }
    switch (this.tipo) {
      case "1":
        {
          this.tipo = "FLOR";
        }
        break;
      case "2":
        {
          this.tipo = "ÁRBOL";
        }
        break;
      case "3":
        {
          this.tipo = "ARBUSTO";
        }
        break;
    }
    this.frecuencia_riego = Number(
      prompt(`Cada cuantos días se riega ${this.nombre}: `)
    );
    while (isNaN(this.frecuencia_riego) === true || this.frecuencia_riego < 1) {
      this.frecuencia_riego = Number(
        prompt(`Cada cuantos días (número) se riega ${this.nombre}: `)
      );
    }
    // Selecciona el día de su creación (HOY) como el primero y último que se ha regado
    this.ultima_fecha_riego = hoy.toISODate();

    // Creación de la nueva planta
    let nueva_planta = new Planta(
      this.nombre,
      this.tipo,
      this.frecuencia_riego,
      this.ultima_fecha_riego
    );

    // Añadir la nueva planta al JSON
    plantasBDjson.push(nueva_planta);
    const datosparseados = JSON.stringify(plantasBDjson, null, 2);
    fs.writeFileSync("./data.json", datosparseados, "utf8");

    console.clear();
    console.log(`${this.nombre} añadido exitosamente!`);
  }
  async listarPlantas() {
    console.clear();

    // Si no hay plantas en JSON, devuelve este mensaje
    if (plantasBDjson.length < 1)
      console.log("Sin existencias, añade una planta tú mismo!");

    for (const planta of plantasBDjson) {
      // Si es flor utilizar el atrículo "una", sino utilizar "un"
      if (planta.tipo == "FLOR") {
        console.log(`La planta ${planta.nombre} es una ${planta.tipo}`);
      } else {
        console.log(`La planta ${planta.nombre} es un ${planta.tipo}`);
      }
    }
  }
  calcularTiempoUltimoRiego() {
    console.clear();
    let arrayPlantas = [];

    for (const planta of plantasBDjson) {
      arrayPlantas.push(planta.nombre);
    }
    console.log(arrayPlantas);
    let opcion = prompt("Selecciona alguna planta de la lista: ").toUpperCase();

    for (const planta of plantasBDjson) {
      // fecha_hoy = fecha actual a través de funciones con luxon (librería js)
      const fecha_hoy = fecha_hora.fromISO(hoy.toISODate());

      // Pasa a formato fecha la última fecha de riego
      const ultima_fecha_riego = fecha_hora.fromISO(planta.ultima_fecha_riego);

      // diferencia = diferencia entre fechas en formato "días"
      const diferencia = fecha_hoy.diff(ultima_fecha_riego, "days");

      // Si el nombre de planta == prompt elegido
      if (planta.nombre == opcion) {
        console.clear();
        // si la diferencia > 0  \ si la diferencia <= 0
        if (diferencia == 0) console.log(`${opcion} se ha regado hoy`);
        if (diferencia != 0)
          console.log(
            `Han pasado ${diferencia.days} días desde el último riego de ${opcion}`
          );
      } else {
        console.clear();
        // Si planta != prompt elegido devuelve lo siguiente
        console.log("Nombre de planta no válido");
        break; // Evita que el mensaje aparezca varias veces en terminal
      }
    }
  }
  async necesarioRiegoSiNo() {
    console.clear();
    let contador = 0;
    for (const planta of plantasBDjson) {
      let riego = revisarSiNecesitaRiego(planta);
      // Devuelve True si necesita regarse y False si No necesita
      if (riego === true) {
        contador++;
        console.log(`${planta.nombre} --> necesita ser regada`);
      }
    }
    if (contador > 0) {
      let opcion = prompt(
        "¿Quieres regar las plantas que lo necesitan? (si/no): "
      );

      console.clear();

      for (const planta of plantasBDjson) {
        let riego = revisarSiNecesitaRiego(planta);

        if (opcion == "si" && riego === true) {
          // Se riegan ÚNICAMENTE las plantas que necesiten ser regadas
          regarPlanta(planta.nombre);
          console.log("Se ha regado con éxito todo lo necesario");
        } else {
          console.clear();
        }
      }
    } else {
      console.log("No hay plantas que regar");
    }
  }

  guardarDatos() {
    console.clear();
    // Convertir JSON a xls
    const worksheet = xlsx.utils.json_to_sheet(plantasBDjson);

    // Crear un nuevo libro
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Plantas");

    const archivoXLSX = "plantas/plantas.xlsx";

    // existsSync: función de la librería fileSystem para controlar la existencia
    // de un archivo concreto, como es el caso actual.
    if (!fs.existsSync(archivoXLSX)) {
      // Si plantas.xlsx no existe lo crea
      xlsx.writeFile(workbook, archivoXLSX);
      console.log("Archivo xlsx creado con éxito en la carpeta Plantas");
    } else {
      // Si plantas.xlsx existe, lo sobreescribe actualizado
      xlsx.writeFile(workbook, archivoXLSX);
      console.log("Archivo xlsx actualizado con éxito en la carpeta Plantas");
    }
  }

  async salir() {
    console.clear();
    console.log("Saliendo...");
    setTimeout(() => {
      process.exit();
    });
  }
}

class Planta extends Jardin {
  super(nombre, tipo, frecuencia_riego, ultima_fecha_riego) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.frecuencia_riego = frecuencia_riego;
    this.ultima_fecha_riego = ultima_fecha_riego;
  }
}

module.exports = Jardin;
module.exports = Planta;
