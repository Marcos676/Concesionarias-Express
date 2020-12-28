const fs = require('fs')

let leerJSON = ()=>JSON.parse(fs.readFileSync('./data/concesionarias.json'))

module.exports = {
    sucursales: (req,res)=>{
        let sucursales = leerJSON().map(sucursales=>{
            return sucursales
        })

        res.render('sucursales', {
            titulo: 'Digital House motors',
            subtitulo: 'Sucursales',
            mensaje: 'Conocé todos nuestros concesionarios:',
            sucursal: sucursales
        })
    },
    sucursal: (req,res)=>{
        let nombre = req.params.sucursal

        let sucursal = []
        leerJSON().forEach(concesionario=>{
            if (concesionario.sucursal == nombre){
                 sucursal.push(concesionario)
            }
        })

        sucursal = sucursal [0]

        if (sucursal == undefined){
            return res.render('tipoError', {
                titulo: 'Este concesionario no existente',
                mensaje: 'Los concesionarios disponibles son: 3 de Febrero - Pilar - Lanus - Quilmes - San Miguel'
            })
        } else {
            return res.render('sucursal', {
                titulo: 'Digital House motors',
                subtitulo: 'Sucursal: '+ sucursal.sucursal,
                direccion: 'Dirección: ' + sucursal.direccion,
                telefono: 'Telefono: ' + sucursal.telefono,
                cantidad: 'Autos disponibles en esta sucursal: ' + sucursal.autos.length,
                autos: sucursal.autos
            })
        }
    }
}