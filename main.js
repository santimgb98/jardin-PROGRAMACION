const Jardin = require('./clases.js');
const nuevoJardin = new Jardin();
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const Planta = require('./clases');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function opcionMenu() {
    return new Promise((resolve) => {
        rl.question('Selecciona opción del menú: ', (respuesta) => {
            resolve(respuesta);
        });
    });
}

async function eleccion() {
    const opcion = await opcionMenu();
    return opcion;
}

async function main(){
    while(true){

        console.log("---------------------------------")
        console.log('MENÚ GESTOR DEL JARDÍN');
        console.log('1. Añadir nueva planta')
        console.log('2. Listar plantas')
        console.log('3. Calcular útlimo tiempo de riego')
        console.log('4. Necesario regar')
        console.log('7. Salir y guardar')
        console.log('---------------------------------');

        let opcion = await eleccion();

        switch(opcion){
            case '1':{
                nuevoJardin.addPlanta();
            }break;
            case '2':{
                nuevoJardin.listarPlantas();
            }break;
            case '3':{
                nuevoJardin.calcularTiempoUltimoRiego();
            }break;
            case '4':{
                nuevoJardin.necesarioRiegoSiNo();
            }break;
            case '5':{
                nuevoJardin.buscarPorTitulo();
            }break;
            case '6':{
                nuevoJardin.mostrarSoloRetro();
            }break;
            case '7':{
                nuevoJardin.salir();
            }break;
        }
    }
}

main();