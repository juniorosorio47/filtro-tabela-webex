import React, { Component } from 'react';
import Table from './components/Table'
import './App.css';

var resultados = []

//Classe principal
class App extends Component {
  constructor(){
    super()
    this.state={
      filtrado: false,
      listaTabela:[]
    }
  }

  fileHandler(e){
      const input = document.querySelector('input[type="file"]')
      
      if(input!= null){
        let reader = new FileReader()
        reader.readAsText(input.files[0])
        reader.onload = ()=>{
          const lines = reader.result.split('\n').map((line)=>{
              if(typeof line != undefined){
                  return { 
                      usuario:line.split(';')[0],
                      data:new Date(this.convertDate((line.split(';')[1])))
                  }
              }else{
                return 0
              }
          })
          this.filterUser(lines)
        }
      }
  }
    
  filterUser(lines){
      lines.forEach((obj)=>{
        if(obj !== ''){
        if(obj.usuario in resultados){
              if(resultados[obj.usuario].getTime() < obj.data.getTime()){
                  resultados[obj.usuario] = obj.data
              }
          }else{
              resultados[obj.usuario] = obj.data
          } 
        }
      })
      this.setState({filtrado: true})
      for(var key in resultados) {
        if (resultados.hasOwnProperty(key)) {
            if(key!=='')
            this.setState({listaTabela:[...this.state.listaTabela, {name:key, data: resultados[key]}]})
        }
      }
  }

  convertDate(string){
      //Padrão de entrada = dd/mm/yyyy
      if(string){
          let dia = string.split('/')[0]
          let mes = string.split('/')[1]
          let ano = string.split('/')[2]

          return [mes, dia, ano];
      }
  }

  render() {
    return (
      <div className="App">
        <input type="file" id="input-file" onChange={(e)=>this.fileHandler(e)}></input>
        {this.state.filtrado ? <Table lista ={this.state.listaTabela}/> : null}
      </div>
    )
  }
}

export default App;
