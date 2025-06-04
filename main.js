const planta = require('./clases');
const nuevoJardin = new Jardin();
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

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
        console.log('MENÚ GESTOR DE VIDEOJUEGOS');
        console.log('1. Agregar un nuevo videojuego')
        console.log('2. Listar todos')
        console.log('3. Filtrar por género')
        console.log('4. Ordenar por rating')
        console.log('5. Buscar por título')
        console.log('6. Mostrar solo retro')
        console.log('7. Salir y guardar cambios')
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