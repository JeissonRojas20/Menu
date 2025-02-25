const { menu, pausa, leerInput, completarTareas } = require('./helpers/menu');
const Tareas = require('./models/tareas');

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                console.log('\nTarea creada correctamente');
                break;

            case '2':
                console.log(tareas.listadoArreglo);

                break;
            case '3':
                console.log(tareas.listadoTareasCompletadas);

                break;
            case '4':
                console.log(tareas.listadoTareasPendientes);

                break;
            case '5':
                const ids = await completarTareas(tareas);
                tareas.listadoArreglo.forEach(tarea => {
                    if (ids.includes(tarea.id)) {
                        if (!tarea.completadoEn) {
                            tarea.completadoEn = true;
                        }
                    } else {
                        tarea.completadoEn = false;
                    }
                });
                console.log('\nTareas actualizadas'.green);
                break;
            default:
                break;
        }

        await pausa();
    } while (opt !== '0');

}

principal();