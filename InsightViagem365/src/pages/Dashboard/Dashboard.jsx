import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Card } from "../../components/Cards/Card";
import { MapMarker } from "../../components/MapMarker/MapMarker";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Table } from "../../components/Table/Table";
import { api } from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [Locais, setLocais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

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
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await api("/usuario/");
        if (!response.ok) {
          throw new Error("Erro ao buscar usuarios");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    }
    userData();
  }
  ,[]);
  return (
    <div className="container-dashboard">
      <div className="sidebar">
        <Sidebar className="elements-sidebar"/>
      </div>
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="containerCards">
          <Card
            title="Usuários Cadastrados"
            count={usuarios.length}
            className="card"
          />
          <Card
            title="Locais Cadastrados"
            count={Locais.length}
            className="card"
          />
        </div>
        <div className="containerTableAndMap">
          <div className="table-container">
            <Table locais={Locais} />
          </div>
          <div className="mapmarker">
            <MapContainer
              center={[-27.600326174840735, -48.64763669286935]}
              zoom={13}
              className="mapContainer"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapMarker locais={Locais} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
