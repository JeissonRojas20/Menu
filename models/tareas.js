const Tarea = require('./tarea');

class Tareas {

    // Variable global
    _listado = {};

    // Obtener todas las tareas
    get listadoArreglo(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {

            const tarea = this._listado[key];
            listado.push(tarea);

        })

        return listado;
    }

    get listadoTareasCompletadas(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {

            const tarea = this._listado[key];
            if (tarea.completadoEn === true) {
                
                listado.push(tarea);

            }
        });

        return listado;
    }

    get listadoTareasPendientes(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {

            const tarea = this._listado[key];
            if (tarea.completadoEn !== true) {
                
                listado.push(tarea);

            }
        });

        return listado;
    }

    constructor(){

        this._listado = {};

    }

    // Se añade la descripcion de la tarea en la posicion del id
    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    // Método para listar tareas con checkbox
    listarTareasParaCompletar() {
        // Se retorna la lista de tareas existentes, tareas es el elemento actual del arreglo y i es la posicion
        return this.listadoArreglo.map((tarea, i) => ({
            // Es el valor que se va a mandar al momento de darle enter
            value: tarea.id,
            // Esto es lo que vera el usuario, en donde si completadoEn tiene como valor true se mostrara completada con un color verde, de lo contrario se mostrara pendiente en un color rojo
            name: `${(i + 1 + '.').green} ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`,
            // Si completadoEn es true saldra chequeado de lo contrario tendra la opcion de chequearlo
            checked: tarea.completadoEn
        }));
    }
}

module.exports = Tareas;