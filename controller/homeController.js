const fs = require('fs')

let leerJSON = ()=>JSON.parse(fs.readFileSync('./data/concesionarias.json'))

module.exports = {
    sucursal: (req,res)=>{
        let sucursales = leerJSON().map(sucursales=>{
            return sucursales.sucursal
        })
        
        res.render('home', {
            titulo: 'Digital House motors',
            subtitulo: 'Bienvenido a Digital House motors, la consecionaria online mas famosa del país.',
            mensaje: 'Conocé todos nuestros concesionarios :',
            sucursal: sucursales
        })
    }
}