//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv; //hacemos el requerimiento del yargs en una carpeta nueva
const porHacer = require('./por-hacer/por-hacer'); //requerimos la carpeta donde tendremos las funciones
const color = require('./node_modules/colors'); //requerimos los colores

let comando = argv._[0]; //hacemos el array del argv que recorremos así abajo

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion); //guardamos en una variable lo que deseamos de los 2 requerimientos
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado(); //almacenamos en una variable la función que creamos

        for (let tarea of listado) { //recorremos los datos guardados en la función que se almacenó en la variable
            console.log('========Por Hacer========='.green); //impimimos con color
            console.log(tarea.descripcion); //mostramos la descripción y estado de los datos
            console.log('Estado:', tarea.completado);
            console.log('=========================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado); //almacenamos en una variable 
        //la función creada recibiendo los datos que deseamos mostrar del yargs y su base de datos
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido parce');
        break;
}