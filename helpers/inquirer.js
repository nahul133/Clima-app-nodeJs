const inquirer = require('inquirer');
require('colors');


const preguntas = [{

    type: 'list',
    name: 'opcion',
    message: 'Que Desea Hacer?\n',
    choices: [
         {
            value: 1,
            name:`${'1'.green}. Buscar Ciudad`
         },
       
         {
            value: 2,
            name:`${'2'.green}. Historial`
        }, 

        {
            value: 0,
            name:`${'0'.green}. Salir`
        }, 
]

}]


const inquirerMenu = async () => {

   
    console.log('========================'.green)
    console.log(' Seleccione una opcion'.white)
    console.log('========================\n'.green)

   const { opcion } = await inquirer.prompt(preguntas);

   return opcion;


}


const Pausa = async() => {


    const question = [
        {
            type: 'input',
            name:'enter',
            message: `\nPresione ${ 'ENTER'.green } Para Continuar`
        }
    ]


    await inquirer.prompt(question)

    console.clear()

}

const leerInput = async( message ) => {

    const questions = [

        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor Ingrese un Valor!';
                }
                return true;
            }
        }

    ];

    const {desc} = await inquirer.prompt(questions)
    return desc;

}


const ListarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (obj, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: obj.id,
            name:  ` ${ idx } ${ obj.nombre }`    
        }

    } );

    choices.unshift({
        value: 0,
        name: ' 0.'.green + ' Cancelar'.yellow
    });

    const preguntas = [
        {
            type:'list',
            name: 'id',
            message: 'Seleccione Lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;

}


const confirmar = async(message) => {

    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}



const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (obj, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: obj.id,
            name:  ` ${ idx } ${ obj.nombre }`,    
            checked: obj.completadoEn ? true : false 
        }

    } );

    const preguntas = [
        {
            type:'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;

}


module.exports = {
    inquirerMenu, Pausa, leerInput, confirmar, mostrarListadoCheckList, ListarLugares
}