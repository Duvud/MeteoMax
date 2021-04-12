//Url de ejemplo para conseguir datos de una baliza en específico https://www.euskalmet.euskadi.eus/vamet/stations/readings/C054/2021/01/18/readingsData.json

const express = require('express');
const app = express();
const port = 20000;
let ListaBalizas = [];



const cargarListaBalizas = () => {
    //Con esta url podemos conseguir la lista de estaciónes con diferentes datos
    fetch("https://www.euskalmet.euskadi.eus/vamet/stations/stationList/stationList.json")
    .then(response => response.json())
    .then(data => ListaBalizas.push(data));    
}



app.get('/stationList', (req, res) => {
    cargarListaBalizas()
    res.end(ListaBalizas);
});

app.listen(port, () => {
    console.log(`MeteoMax listening at http://localhost:${port}`);
});