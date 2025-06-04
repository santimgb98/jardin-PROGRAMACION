const luxon = require('luxon');

let dateTime = luxon.DateTime;

let today = dateTime.local();

console.log(hoy.toISODate());

let a = today.get('isWeekend');
let b = today.get('daysInMonth');
let c = today.get('daysInYear');

// console.log('Hoy es fin de semana?:',a);
// console.log('Días del mes actual: ',b);
// console.log('Días del año actual: ',c);

let min = today.get('minute');
let hora = today.get('hour');
let mes = today.get('month');
let año = today.get('year');
let dia = today.get('day');
let fecha = today.get('toISOWeekDate');
console.log(fecha)
// console.log(`Son las ${hora}:${min}`);
// console.log(`del es día ${dia}/${mes}/${año}`);

let inicio = 2018
let resultado = año - inicio;
console.log(`Desde el año ${inicio} hasta ahora han pasado ${resultado} años`)