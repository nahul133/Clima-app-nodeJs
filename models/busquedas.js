const fs = require('fs')
const axios = require('axios')


class Busquedas {


    constructor() {
        
        this.historial = []
        this.dbPath = './db/database.json';
        this.leerDB()
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')

        })
    }

    async ciudad( lugar = '' ) {

        try {


            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit':5,
                    'language': 'es'
                }
            })

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({

                id: lugar.id,
                nombre: lugar.place_name,
                long: lugar.center[0],
                lat: lugar.center[1],

            }));


        } catch (error) {

            console.log('hubo un error!')
            return []

        }


    }

    async climaLugar( lat, long ) {

        try {
            
            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${'lat='+lat}&${'lon='+long}&appid=${process.env.OPENWEATHER_KEY}`)
            const { weather, main } = resp.data;
            
            return {

                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp

            }

        } catch (error) {
            console.log('Ocurrio un Error'.red)
            return []
        }

    }


    agregarHistorial(lugar = '') {

        if( this.historial.includes( lugar.toLocaleLowerCase()) ) {
            return
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLocaleLowerCase() )

        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify( payload ));

    }

    leerDB() {

        if(!fs.existsSync(this.dbPath))  {
            return;
        }


        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse( info )

        this.historial = data.historial

    }

}



module.exports = Busquedas;