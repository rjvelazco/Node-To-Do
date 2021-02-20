const inquirer = require('inquirer');
require('colors');


const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {   
                value: '1',
                name: `${'1.'.green} Crear una tarea`,
            },
            {   
                value: '2',
                name: `${'2.'.green} Listar tareas`,
            },
            {   
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`,
            },
            {   
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`,
            },
            {   
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`,
            },
            {   
                value: '6',
                name: `${'6.'.green} Borrar tarea`,
            },
            {   
                value: '0',
                name: `${'0.'.green} Salir \n`,
            },
        ],
        pageSize: 8
    }
]


const inquirerMenu = async()=>{

    console.clear();

    console.log('==========================='.green);
    console.log('   Seleccione una opcion   '.white);
    console.log('===========================\n'.green);

    const { option } = await inquirer.prompt(menuOpts);

    return option;

}

const pause = async ()=>{

    const question = [
        {
            name: 'pause',
            type: 'input',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async( message ) =>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ){
                if(value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    
    return desc;

}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}`.green;
        return { 
            value: tarea.id, 
            name: `${idx}. ${tarea.desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
            pageSize: choices.length
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) =>{

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

}

const mostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}`.green;
        return { 
            value: tarea.id, 
            name: `${idx}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Borrar',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    pause,
}