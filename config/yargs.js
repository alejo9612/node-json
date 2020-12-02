const descripcion = { //creamos la constante que llamaremos en los comandos
    demand: true,
    alias: 'd',
    describe: 'Crear elementos a realizar'
};
const completado = {
    default: true,
    alias: 'c',
    describe: 'Marcar las tareas completadas'
}

const argv = require('yargs') //requerimos el yargs que necesitamos dandole como nombre el mismo argv de la app.js para no
    //haber errores
    .command('crear', 'Crear elemento por hacer', { //creamos los comandos con su objeto dentro
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    }).command('borrar', 'Elimina las tares que se realizaron o se crearon mal', {
        descripcion
    })
    .help() //declaramos la funcion ayuda
    .argv; //cerramos el argumento

module.exports = { //exportamosla sonstante requerida apra utilizarla en el app
    argv
}