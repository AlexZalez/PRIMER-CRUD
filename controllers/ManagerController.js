'use strict'

const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const json_maquinas = fs.readFileSync('models/MAQUINAS.json', 'utf-8');
var maquinas = JSON.parse(json_maquinas);



class ManagerController {

  AgregarMaquina = (req, res) => {
    console.log('>>','ManagerController','AgregandoMaquina')
    res.render('AgregarMaquina');
  }

  RecibirMaquina = (req, res) => {
      
      const {Operador, Nmro, Funcion, Estado} = req.body;
      if(!Operador || !Nmro || !Funcion || !Estado){
        res.status(400).send('Debes colocar un Operador, Funcion y Estado validos ');
      }

      let newMaquina = {
        id: uuidv4(),
        Operador,
        Nmro,
        Funcion,
        Estado
      }

      maquinas.push(newMaquina);      

      console.log('>>','ManagerController','RecibiendoMaquina');
      const json_maquinas = JSON.stringify(maquinas);
      fs.writeFileSync('models/MAQUINAS.json', json_maquinas, 'utf-8');
      res.redirect("http://localhost:3000/");

  }

  VerMaquinas = (req, res) =>{
    console.log('>>','ManagerController','VerMaquinas')
    res.render('VerMaquinas', {maquinas});
  }
  
  MarcarMaquina = (req, res) => {
    console.log('>>','ManagerController','EditarMaquina')
    maquinas.forEach(maquinas => {
      if (maquinas.id==req.params.id) {
        
        res.render('MarcarMaquina', {
          Marca: req.params.id, 
          Operador: maquinas.Operador, 
          Funcion: maquinas.Funcion, 
          Estado: maquinas.Estado,
          Nmro: maquinas.Nmro
        });
      }
    });
  }
    
  //Para Eliminar
  EliminarMaquina = (req, res) => {
    console.log(req.params);
    maquinas = maquinas.filter(maquinas => maquinas.id != req.params.id)
    const json_maquinas = JSON.stringify(maquinas);
      fs.writeFileSync('models/MAQUINAS.json', json_maquinas, 'utf-8');
      res.redirect("http://localhost:3000/manager/VerMaquinas");
  }
  
  
    
  
  //Para editar
  EditarMaquina = (req, res) => {
    console.log('>>','ManagerController','EditandoMaquinas')
    
    maquinas.forEach(maquinas => {
      if (maquinas.id==req.body.Marca) {
        maquinas.Operador = req.body.Operador;
        maquinas.Funcion = req.body.Funcion;
        maquinas.Estado = req.body.Estado;
      }
    });
    const json_maquinas = JSON.stringify(maquinas);
    fs.writeFileSync('models/MAQUINAS.json', json_maquinas, 'utf-8');
    res.redirect("http://localhost:3000/manager/VerMaquinas");
  }
  
  BuscarMaquina = (req, res) => {
    res.render('BuscarMaquina')
  }

  MostrarMaquina = (req,res) => {
    let valor, tester;
    let OperadorId, FuncionId, EstadoId,NmroId;
    maquinas.forEach(maquinas => {
      if (maquinas.Nmro == req.body.ID) {
        OperadorId = maquinas.Operador;
        FuncionId = maquinas.Funcion;
        EstadoId = maquinas.Estado;
        NmroId= maquinas.Nmro;
        valor = maquinas.id
        tester = true;
       } 
    });
    if (tester == true) {
      res.render('MostrarMaquina', {OperadorId, FuncionId, EstadoId, NmroId, valor})
    } else {
      res.send('Error: El numero de serie no se encuentra en la base de datos <br><br> <a href="http://localhost:3000/"><button>HOME</button></a>')
      
    }
    
    
  }

}

module.exports = ManagerController;