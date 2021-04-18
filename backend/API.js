//Url de ejemplo para conseguir datos de una baliza en específico https://www.euskalmet.euskadi.eus/vamet/stations/readings/C054/2021/01/18/readingsData.json
const utf8 = require('utf8');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 20000;
let arListaBalizas = [];
let arDatosBalizas = [];


//Esta función devuelve la fecha de hoy YYYY-MM-DD
const montarFechaActual = () => {
    const objDate = new Date();
    let ano = objDate.getFullYear().toString();
    let mes = objDate.getMonth().toString();
    let dia = objDate.getDate().toString();

    /**
     * Le añadimos un 0 a la hizquierda para que el formato
     * de la url de la api de euskalmet coincida
     * */
    parseInt(ano) < 10 ? ano = "0" + ano : null;
    parseInt(mes) < 10 ? mes = "0" + mes : null;
    parseInt(ano) < 10 ? mes = "0" + mes : null;

    return ano + "/" + mes + "/" + dia;
}

/**
 * Esta función devuelve la lista de balizas con datos extra para despúes
 * poder conseguir los datos de cada una de ellas 
 * (con el id y la fecha que conseguimos en la función 'montarFechaActual')
 */
const cargarListaBalizas = async () => {
    let auxArListaBalizas = [];

    //Con esta url podemos conseguir la lista de estaciónes con diferentes datos
    await fetch("https://www.euskalmet.euskadi.eus/vamet/stations/stationList/stationList.json")
    .then(async response => await response.json())
    .then(data => auxArListaBalizas.push(data));

    auxArListaBalizas = JSON.parse(utf8.decode(utf8.encode(JSON.stringify(auxArListaBalizas))));

    auxArListaBalizas = auxArListaBalizas[0].filter(Baliza => {
        console.log(Baliza)
        return Baliza.stationType === "METEOROLOGICAL" ? true: false;
    })

    return auxArListaBalizas;   
}

/**
 * Esta función carga los
 */
const cargarDatosBalizas = async () => {
    let auxArDatosBalizas = cargarListaBalizas();
    let strFechaActual = montarFechaActual();
    let objRawData = [];
    
    auxArDatosBalizas.forEach ( async (Baliza) => {
        let url = `https://www.euskalmet.euskadi.eus/vamet/stations/readings/${Baliza.id}/${strFechaActual}/readingsData.json`;
          await fetch(url)
        .then(response  => {response.json();console.log(response.json())})
        .then(data => objRawData.push(data));
    });
    
    return objRawData;
}

app.get('/Balizas', async (req, res) => {
    //let arDatosBalizas = await cargarDatosBalizas();
    //let strDatos = JSON.stringify(arDatosBalizas);
    res.json(await cargarListaBalizas());
});

app.listen(port, () => {
    console.log(`MeteoMax está escuchando en :  http://localhost:${port}`);
});