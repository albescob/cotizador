import React, { Component } from 'react';
import Header from "./Header";
import Formulario from "./Formulario";
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './Resumen';

class App extends Component {

  state = {
    resultado:'',
    datos:{}
  }
  cotizarSeguro = (datos) => {
    const {marca, plan, year} = datos;
    // Agregar una base de 2000,
    let resultado = 2000;

    //obtener diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);
    //restar 3% por cada año al valor del seguro
    resultado -= ((diferencia * 3) * resultado ) / 100;
    //americano 15% , asiatico 5% y europeo 30%
    resultado = calcularMarca(marca) * resultado;

    //plan basico incrementa 20% y completo 50%
    let incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado: resultado,
      datos: datosAuto

    })

  }
  render() {
    return (
      <div className='contenedor'>
        <Header titulo='Cotizador de seguro de auto'/>
        <div className='contenedor-formulario'>
          <Formulario cotizarSeguro={this.cotizarSeguro} />
          <Resumen datos={this.state.datos} resultado={this.state.resultado}/>
        </div>

      </div>
    );
  }
}

export default App;
