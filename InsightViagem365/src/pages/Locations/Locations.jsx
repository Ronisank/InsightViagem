import { PenBoxIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { api } from "../../services/api";
import "./Locations.css";

function Locations() {
  const [Locais, setLocais] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  
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

  async function deleteLocation(id) {
    try {
      const response = await api(`/Locais/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newLocais = Locais.filter((item) => item.id !== id);
        setLocais(newLocais);
        alert("Local excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir local:", error);
    }
  }
  return (
    <div className="container-form">
      <div className="elements-sidebar">
        <Sidebar />
      </div>
      <div className="form-container">
        <div className="titulo">
          <h1>Lista dos locais</h1>
        </div>
        <table className="table table-borderless table-success table-hover table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Local</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Descrição</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Ações</th>
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
                <td className="table-icon">
                  <Link to={`/dashboard/locais/${item.id}`}>
                    <PenBoxIcon size={28} className="pen" id="pen"/>
                  </Link>
                  <button
                    onClick={() => deleteLocation(item.id)}
                    className="btn-delete"
                    id="btn-delete"
                  >
                    <Trash2 size={28} className="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Locations;
