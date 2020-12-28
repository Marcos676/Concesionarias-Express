const fs = require('fs')

let leerJSON = ()=>JSON.parse(fs.readFileSync('./data/concesionarias.json'))

module.exports={
    marcas: (req,res)=>{
        let lista = []
        leerJSON().forEach(list=>{
            list.autos.forEach(auto => {
                lista.push(auto)
            });
        })
        let marcas = []
        lista.forEach(auto => {
            if(marcas.includes(auto.marca) == false){
                marcas.push(auto.marca)
            }
        });
        
        res.render('marcas', {
            titulo: 'Digital House motors',
            subtitulo: 'Marcas',
            marcas: marcas
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
                mensaje: 'Las marcas disponibles son: -volkswagen - peugeot - chevrolet - nissan - renault - audi - fiat - ford - toyota - citroen - chery - honda'
            })   
        } else {
            res.render('marca',{
                titulo: 'Digital House motors',
                subtitulo: 'Marca: '+ marca,
                cantidad: 'Autos disponibles: ' + autos.length,
                autos: autos
            })
        }
    }
}