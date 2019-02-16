import React from 'react'

function removeH(string){
  return string.split(' ')[0]
}

const Table = ({lista}) => (
  <table className="table table-bordered table-stripped">
  {}
    <thead>
      <th >Nome</th>
      <th>Último acesso</th>
    </thead>
    <tbody>
    {lista.sort(function(a,b){return a.data.getTime() - b.data.getTime()}).map((row)=>(
      <tr>
        <td value={row.name}>{row.name.toString()}</td>
        <td value={row.data.getTime()}>{removeH(row.data.toLocaleString("pt-BR"))}</td>
      </tr>
    ))}
    </tbody>
  </table>
)

export default Table