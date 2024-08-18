import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";

export function Table({ locais }) {
  const navigate = useNavigate();

    const handleRowClick = (id) => {
      navigate(`tabelaLocais`);
    };
  return (
    <table className="table table-borderless table-success table-hover table-container">
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Nome do Local</th>
          {/* <th>Cidade</th>
          <th>Estado</th> */}
          <th>Descrição</th>
          {/* <th>Latitude</th>
          <th>Longitude</th> */}
          {/* <th>Ações</th> */}
        </tr>
      </thead>
      <tbody>
        {locais.map((item) => (
          <tr
            key={item.id}
            onClick={() => handleRowClick(item.id)}
            style={{ cursor: "pointer" }}
          >
            {/* <td>{item.id}</td> */}
            <td>{item.local}</td>
            {/* <td>{item.cidade}</td>
            <td>{item.estado}</td> */}
            <td>{item.descricao}</td>
            {/* <td>{item.latitude}</td>
            <td>{item.longitude}</td> */}
            {/* <td>
              <Link to={`locais/${item.id}`}>
                <PenBox size={28} className="penbox" />
              </Link>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
{
  /* <table className="table table-success table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome do Local</th>
      <th>Cidade</th>
      <th>Estado</th>
      <th>Descrição</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    {Locais.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.local}</td>
        <td>{item.cidade}</td>
        <td>{item.estado}</td>
        <td>{item.descricao}</td>
        <td>{item.latitude}</td>
        <td>{item.longitude}</td>
        <td>
          <Link to={`locais/${item.id}`}>Editar</Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>; */
}
