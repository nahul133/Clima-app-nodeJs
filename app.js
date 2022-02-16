require('dotenv').config()
const { leerInput, inquirerMenu, Pausa, ListarLugares } = require("./helpers/inquirer")
const Busquedas = require("./models/busquedas")
const colors = require('colors')


const main = async() => {
  
    console.clear()

    const busquedas = new Busquedas()
    let opt;

   do {
    
     opt = await inquirerMenu()
        
     switch( opt ) {

        case 1:
            const lugar = await leerInput('Ciudad:');

            const lugares = await busquedas.ciudad( lugar );  
            const id = await ListarLugares(lugares);
            if( id === '0') continue;

            const lugarSeleccionado = lugares.find(z => z.id === id)
            busquedas.agregarHistorial( lugarSeleccionado.nombre );
 
            const clima = await busquedas.climaLugar(lugarSeleccionado.lat , lugarSeleccionado.long)

            console.log('\nInformacion de la Ciudad\n'.green)
            console.log('Ciudad:', lugarSeleccionado.nombre)
            console.log('Lat:', lugarSeleccionado.lat)
            console.log('long:', lugarSeleccionado.long)
            console.log('Temperatura:', clima.temp)
            console.log('Minima:', clima.min)
            console.log('Maxima:', clima.max)
            console.log('Como esta el Clima:', colors.blue(clima.desc) )

            
        break;

        case 2:
           busquedas.historialCapitalizado.forEach( (lugar, i) => {
                  const idx = `${i++}.`.green;
                  console.log(`${idx} ${ lugar } `);
           } ) 

        break;

     }       
        
     opt !== 0 && await Pausa();

   } while ( opt !== 0);

}

main()