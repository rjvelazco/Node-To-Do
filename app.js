require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const {
    confirmar,
    inquirerMenu, 
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    pause, 
} = require('./helpers/inquirer');

// Models 
const Tareas = require('./models/tareas');

console.clear();

const main = async ()=>{

    
    let opt = '';
    const tareas = new Tareas();


    const tareasDB = leerDB();

    if(tareasDB ){
        tareas.cargarTareasFromArray(tareasDB);    
    }
    
    do{

        // Imprimir el menu
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                // Crear tarea
                let desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );

                if(id !== '0'){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('\n¡Tarea borrada!'.green);
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr );

        await pause();

    }while( opt !== '0');

}


main();








