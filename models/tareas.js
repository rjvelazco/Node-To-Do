const Tarea = require('./tarea');

/*
    _listado:
        { 'uuid-12312313-512412-1': {id: 12, desc: completadosEn: 92231} }
        { 'uuid-12312313-512412-2': {id: 13, desc: completadosEn: 92231} }
        { 'uuid-12312313-512412-3': {id: 14, desc: completadosEn: 92231} }
*/

class Tareas {

    _listado = {};

    constructor(){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    borrarTarea(id = ''){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        const listado = [];
        console.log();
        
        this.listadoArr.forEach((tarea, idx) =>{
            const index = `${idx + 1}.`.green;
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn)? 'Completado'.green : 'Pendiente'.red;
            // listado.push(`${index} ${desc} :: ${estado}`);
            console.log(`${index} ${desc} :: ${estado}`);
        });

    }

    listarPendientesCompletadas( completadas = true ){

        let idx = 0;

        console.log();
        this.listadoArr.forEach((tarea) =>{
            const {desc, completadoEn } = tarea;

            if(completadas && completadoEn){
                const index = `${++idx}.`.green;
                console.log(`${index} ${desc} :: ${completadoEn.green}`);
            } else if(!completadas && !completadoEn) {
                const index = `${++idx}.`.green;
                const estado = 'Pentiente'.red;
                console.log(`${index} ${desc} :: ${estado}`);
            }
        });

    }

    toggleCompletadas(ids = []){

        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                const tareaEditar = this._listado[tarea.id];
                tareaEditar.completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;