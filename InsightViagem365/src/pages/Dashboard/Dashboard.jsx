import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

function Dashboard() {
  const [Locais, setLocais] = useState([]);

  useEffect(() => {
    // Função para buscar Locais da API
    const fetchData = async () => {
      try {
        const response = await api("/Locais/");
        if (!response.ok) {
          throw new Error("Erro ao buscar Locais");
        }
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        console.error("Erro ao buscar Locais:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <table className="table table-success table-striped">
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
      </table>
    </div>
  );
}

export default Dashboard;