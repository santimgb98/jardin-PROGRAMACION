const prompt = require('prompt-sync')();
const luxon = require('luxon');
const fs = require('fs');
let fecha_hora = luxon.DateTime;
let hoy = fecha_hora.local();

const plantasBDjson = JSON.parse(fs.readFileSync("./data.json", "utf8"));


// Función asíncrona para regar la planta que lo necesite
/**/    async function regarPlanta(nombre_planta) {
/**/        return new Promise(() => {
/**/            for(const planta of plantasBDjson){
/**/                if (planta.nombre == nombre_planta){
/**/                    planta.ultima_fecha_riego = hoy.toISODate();
/**/                    let resultado =(`${planta.nombre} ha sido regado exitosamente!`);
/**/                    return resultado;
/**/                }
/**/            }
/**/        });
/**/    }

// Función asíncrona para guardar cada registro
/**/    async function guardarRegistro(){}
/**/
/**/
/**/

// Función asíncrona para revisar si hace falta regar la
// planta especificada mediante parámetro
/**/    async function revisarSiNecesitaRiego(planta_){
/**/
/**/       // fecha_hoy = fecha escrita (fecha de hoy)
/**/       const fecha_hoy = fecha_hora.fromISO(hoy.toISODate());
/**/       const ultima_fecha_riego = fecha_hora.fromISO(planta_.ultima_fecha_riego);
/**/
/**/       // diferencia = diferencia entre fechas en formato "días"
/**/       const diferencia = fecha_hoy.diff(ultima_fecha_riego, 'days');
/**/
/**/       if(diferencia > planta_.frecuencia_riego)return true;
/**/       if(diferencia <= planta_.frecuencia_riego)return false;
/**/                
/**/    }

// Función asíncrona para crear log de riego por fecha
/**/    async function crearLog_de_RiegoPorFecha(){}
/**/
/**/
/**/


class Jardin{
     constructor(nombre, tipo, frecuencia_riego, ultima_fecha_riego){
        this.nombre = nombre;
        this.tipo = tipo;
        this.frecuencia_riego = frecuencia_riego;
        this.ultima_fecha_riego = ultima_fecha_riego;
    }
    // Método añadir planta
    async addPlanta(){
        console.clear();
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

        console.clear();
        console.log(`${this.nombre} añadido exitosamente!`);
    }
    async listarPlantas(){
        console.clear();
        // Recorre el JSON seleccionando nombre y tipo de cada planta y devuelve un mensaje
        for(const planta of plantasBDjson){
            console.log(`La planta ${planta.nombre} es de tipo ${planta.tipo}`);
        }
    }
    async calcularTiempoUltimoRiego(){
        console.clear();
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
                console.clear();
                // si la diferencia > 0  \ si la diferencia <= 0
                if(diferencia ==0)console.log(`${opcion} se ha regado hoy`)
                if(diferencia !=0)console.log(`Han pasado ${diferencia.days} días desde el último riego de ${opcion}`)
            }
        }
    }
    async necesarioRiegoSiNo(){
        console.clear();
        for(const planta of plantasBDjson){
            let riego = revisarSiNecesitaRiego(planta);
            if(riego == true)console.log(`${planta.nombre} necesita ser regada ${planta.frecuencia_riego}`);
            if(riego == false)console.log(`${planta.nombre} NO necesita riego ${planta.frecuencia_riego}`);
        }
    }
    async salir(){
        console.clear();
        console.log('Saliendo...');
        setTimeout(()=>{
            process.exit();
        })
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




       
    
