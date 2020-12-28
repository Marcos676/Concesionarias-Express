const fs = require('fs')

let leerJSON = ()=>JSON.parse(fs.readFileSync('./data/concesionarias.json'))

module.exports={
    autos: (req,res)=>{
        let lista = []
        leerJSON().forEach(list=>{
             list.autos.forEach(auto => {
                lista.push(auto)
            });
        })

        let autos = lista.map(auto=>{
            return auto
        })

        autos.sort((prev, next)=>(prev.marca > next.marca) ? 1 : (prev.marca< next.marca) ? -1 : 0)

        res.render('autos',{
            titulo: 'Digital House motors',
            subtitulo: 'Autos',
            cantidad : `Autos disponibles: ${autos.length}`,
            autos: autos
        })
    },
    marca: (req, res)=>{
        let marca = req.params.marca
        
        let lista = []
        leerJSON().forEach(list=>{
            list.autos.forEach(auto => {
                lista.push(auto)
            });
        })
        let autos = []
        lista.forEach(auto => {
            if(auto.marca.includes(marca)){
                autos.push(auto)
            }
        });
        
        if (autos.length == 0) {
            res.render('tipoError',{
                titulo: 'Esta marca no existe',
                mensaje: 'Las marcas disponibles son: volkswagen - peugeot - chevrolet - nissan - renault - audi - fiat - ford - toyota - citroen - chery - honda'
            })   
        } else {
            res.render('marca',{
                titulo: 'Digital House motors',
                subtitulo: 'Vehículos de marca: '+ marca,
                cantidad: 'Autos disponibles: ' + autos.length,
                autos: autos
            })
        }
    },
    dato: (req,res)=>{
        let marca = req.params.marca
        let dato = req.params.dato
        
        let lista = []
        leerJSON().forEach(list=>{
            list.autos.forEach(auto => {
                lista.push(auto)
            });
        })
        let autos = []
        lista.forEach(auto => {
            if( auto.marca.includes(marca) && (auto.modelo.includes(dato) || auto.anio.toString().includes(dato) || auto.color.includes(dato)) ){
                autos.push(auto)
            }
        });

        if (autos.length == 0) {
            res.render('tipoError',{
                titulo: 'No hay resultados para este filtro',
                mensaje: `Puede filtrar por: Modelo - Año - Color `
            })   
        } else {
            res.render('marca',{
                titulo: 'Digital House motors',
                subtitulo: `Resultados de: ${marca} y ${dato}`,
                cantidad: 'Autos disponibles: ' + autos.length,
                autos: autos
            })
        }
    }
}