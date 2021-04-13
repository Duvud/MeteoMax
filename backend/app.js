//Url de ejemplo para conseguir datos de una baliza en específico https://www.euskalmet.euskadi.eus/vamet/stations/readings/C054/2021/01/18/readingsData.json
const fetch = require('node-fetch')
const express = require('express');
const app = express();
const port = 20000;
let arListaBalizas = [];
let arDatosBalizas = [];


//Esta función devuelve la fecha de hoy YYYY-MM-DD
const montarFechaActual = () => {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth !== 10 ? mes = "0" +  new Date().getMonth : mes = new Date().getMonth;
    let dia = new Date().getDay !== 10 ? dia = "0" +  new Date().getDay : dia = new Date().getDay;
    return ano + "/" + mes + "/" + dia;
}


const cargarListaBalizas = () => {
    let auxArListaBalizas = [];
    //Con esta url podemos conseguir la lista de estaciónes con diferentes datos
    fetch("https://www.euskalmet.euskadi.eus/vamet/stations/stationList/stationList.json")
    .then(response => response.json())
    .then(data => 
        {
            //Solo necesitamos las estaciones que sean meteorológicas
            if(data.stationType === "METEOROLOGICAL"){
                auxArListaBalizas.push(data);
            }
        });
    return auxLista;   
}

const cargarDatosBalizas = () => {
    auxArDatosBalizas = []
    objRawData = {}
    arListaBalizas = cargarListaBalizas();
    strFechaActual = montarFechaActual();
    arListaBalizas.forEach(Baliza => {
        url = `https://www.euskalmet.euskadi.eus/vamet/stations/readings/C054/${strFechaActual}/readingsData.json`
        fetch(url)
        .then(response => response.json())
        .then(data => objRawData = data)
    });
}

app.get('/stationList', (req, res) => {
    cargarListaBalizas()
    let str = "";
    ListaBalizas.forEach(baliza => {str += JSON.stringify(baliza)})
    res.end(str);
});

app.listen(port, () => {
    console.log(`MeteoMax listening at http://localhost:${port}`);
});