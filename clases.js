const prompt = require('prompt-sync')();
const luxon = require('luxon');
const fs = require('fs');
let fecha_hora = luxon.DateTime;
let hoy = fecha_hora.local();

const plantasBDjson = JSON.parse(fs.readFileSync("./data.json", "utf8"));



async function regarPlanta(nombre_planta) {
    return new Promise(() => {
        for(const planta of plantasBDjson){
            if (planta.nombre == nombre_planta){
                planta.ultima_fecha_riego = hoy.toISODate();
                let resultado =(`${planta.nombre} ha sido regado exitosamente!`);
                return resultado;
            }
        }
    });
}
 
async function guardarRegistro(){}
async function revisarSiNecesitaRiego(){}
async function crearLog_de_RiegoPorFecha(){}


class Jardin{
     constructor(nombre, tipo, frecuencia_riego, ultima_fecha_riego){
        this.nombre = nombre;
        this.tipo = tipo;
        this.frecuencia_riego = frecuencia_riego;
        this.ultima_fecha_riego = ultima_fecha_riego;
    }
    // Método añadir planta
    addPlanta(){
        this.nombre = prompt('Nombre de la nueva planta: ').toUpperCase();
        console.log('TIPOS (Selecciona su orden):');
        console.log('1. Flor');
        console.log('2. Árbol');
        console.log('3. Arbusto');
        this.tipo = prompt('Tipo de la nueva planta: ');
            while(this.tipo > 3 || this.tipo < 1 || isNaN(this.tipo)===true){
                this.tipo = prompt('Tipo de la nueva planta (TIPO VÁLIDO): ');
            }
            switch(this.tipo){
                case "1":{
                    this.tipo = "FLOR";
                }break;
                case "2":{
                    this.tipo = "ÁRBOL";
                }break;
                case "3":{
                    this.tipo = "ARBUSTO";
                }break;
            }
        this.frecuencia_riego = Number(prompt(`Cada cuantos días se riega ${this.nombre}: `));
        // Selecciona el día de su creación (HOY) como el primero y último que se ha regado
        this.ultima_fecha_riego = hoy.toISODate();

        // Creación de la nueva planta
        let nueva_planta = new Planta(this.nombre, this.tipo, this.frecuencia_riego, this.ultima_fecha_riego);

        // Añadir la nueva planta al JSON
        plantasBDjson.push(nueva_planta);
        const datosparseados = JSON.stringify(plantasBDjson, null, 2);
        fs.writeFileSync("./data.json", datosparseados, 'utf8');
    }
    listarPlantas(){
        // Recorre el JSON seleccionando nombre y tipo de cada planta y devuelve un mensaje
        for(const planta of plantasBDjson){
            console.log(`La planta ${planta.nombre} es de tipo ${planta.tipo}`);
        }
    }
    calcularTiempoUltimoRiego(){

        for(const planta of plantasBDjson){
            console.log(planta.nombre);
        }
        let opcion = prompt('Selecciona alguna planta de la lista: ').toUpperCase();

        for(const planta of plantasBDjson){
            // fecha_hoy = fecha escrita (fecha de hoy)
            const fecha_hoy = fecha_hora.fromISO(hoy.toISODate());
            const ultima_fecha_riego = fecha_hora.fromISO(planta.ultima_fecha_riego);

            // diferencia = diferencia entre fechas en formato "días"
            const diferencia = fecha_hoy.diff(ultima_fecha_riego, 'days');

            // Si el nombre de planta == objeto elegido
            if(planta.nombre == opcion){
                console.log(`Han pasado ${diferencia.days} días desde el último riego`)
            }

        }

    }
    necesarioRiegoSiNo(){
      for(const planta of plantasBDjson){
            console.log(planta.nombre);
        }
        let opcion = prompt('Selecciona algún objeto de la lista: ').toUpperCase();

        for(const planta of plantasBDjson){
            const fecha_hoy = fecha_hora.fromISO("2025-06-02");
            const ultima_fecha_riego = fecha_hora.fromISO(planta.ultima_fecha_riego);

            const diferencia = fecha_hoy.diff(ultima_fecha_riego, 'days');

            if(planta.nombre == opcion){
                console.log(`Han pasado ${diferencia.days} días desde el último riego`);
                if(diferencia.days > planta.frecuencia_riego){
                regarPlanta(planta.nombre);
            }
            }
            

        }
    }


}
class Planta extends Jardin{
    super(nombre, tipo, frecuencia_riego, ultima_fecha_riego){
        this.nombre = nombre;
        this.tipo = tipo;
        this.frecuencia_riego = frecuencia_riego;
        this.ultima_fecha_riego = ultima_fecha_riego;
    }
}



module.exports = Jardin;
module.exports = Planta;




       
    
