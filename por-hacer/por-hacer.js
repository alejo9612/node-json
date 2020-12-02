const fs = require('fs'); //realizamos el requerimiento del file system/archivo de sistema

let listadoPorHacer = []; //creamosuna variable que almacene un array

const guardarDB = () => { //Creamos una función que me almaene todo en un JSON redireccionando a su respectiva carpeta
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, function(err) {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => { //creamos una funcion que retorne un objeto y lo guarde en el array

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer); //llamamos al array y el objeto a ingresar dentro de el

    guardarDB(); //llamamos la función JSON

    return porHacer;

}

const getListado = () => { //creamos laffunción que nos va a retornar los datos que necesitamos de las otras funciones
    cargarDB(); //aqui encontramos ya todo los datos
    return listadoPorHacer; //retornamos lalista que guarda el array
}

const actualizar = (descripcion, completado = true) => {
    //creamos la función con los argumentos a recibir, tener en cuenta que se deben de llamar igual a los command del yargs
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //creamos una variable que me recorra la base de datos por index en los puntos claves de su retorno en función
    if (index >= 0) { //realizamos la condición para mostrar el completado
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => { //creamos la función con retorno y el parametro a recibir del yargs(descripcion del yargs)
    cargarDB(); //cargamos nuestra base de datos
    let BDborrar = listadoPorHacer.filter(tarea => { // guardamos en una variable  la función filter para poder eliminar
        //los datos que no queremos tener ya en la tarea
        return tarea.descripcion !== descripcion //si no concide con lo que tenemos en la base retorna false
    });
    if (listadoPorHacer.length === BDborrar.length) { //hacemos la condición para que evalue el alrgo de cada 
        //Caracter que se tiene en la lista por si coincide o no en este caso.
        return false;
    } else {
        listadoPorHacer = BDborrar;
        guardarDB();
        return true;
    }

}

module.exports = { //exportamos la funcion para poder utilizarla en el app.js
    crear,
    getListado,
    actualizar,
    borrar
}