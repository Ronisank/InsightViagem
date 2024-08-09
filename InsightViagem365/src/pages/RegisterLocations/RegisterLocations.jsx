import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { destiny } from "../../services/serviceMaps";

function RegisterLocation() {
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
  const { register, handleSubmit, formState, setValue, reset, watch } =
    useForm();
  const cep = watch("cep");

  async function addLocation(data) {
    try {
      const response = await api("/Locais", {
        method: "POST",
        body: JSON.stringify(data),
      });

      reset();
    } catch (error) {
      console.error("Erro ao cadastrar local:", error);
    }
  }
  async function addressPlace(cep) {
    if (cep && cep.length === 8) {
      try {
        const response = await destiny(cep);

        // const addressComplete = response.address_type + ' ' + response.address_name 

        setValue("local", response.address_name);
        setValue("logradouro", response.address);
        setValue("bairro", response.district);
        setValue("cidade", response.city);
        setValue("estado", response.state);
        setValue("latitude", response.lat);
        setValue("longitude", response.lng);

       
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }
  useEffect(() => {
    addressPlace(cep);
  }, [cep, reset]);

    async function deleteLocation(id) {
        try {
            const response = await api(`/Locais/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Local excluído com sucesso!");
                const newLocais = Locais.filter((item) => item.id !== id);
                setLocais(newLocais);
            }
        }
        catch (error) {
            console.error("Erro ao excluir local:", error);
        }
    }

  return (
    <>
      <div className="col g-0">
        <form
          className="form-container-signup"
          onSubmit={handleSubmit(addLocation)}
        >
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="CEP"
              aria-label="CEP"
              {...register("cep")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Local"
              aria-label="Local"
              {...register("local")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              aria-label="Cidade"
              {...register("cidade")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              aria-label="Estado"
              {...register("estado")}
            />
          </div>
          <div className="col-sm-4">
            <textarea
              type="text"
              className="form-control"
              placeholder="Descrição"
              aria-label="Descrição"
              {...register("descricao")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Latitude"
              aria-label="Latitude"
              {...register("latitude")}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Longitude"
              aria-label="Longitude"
              {...register("longitude")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit(addLocation)}
          >
            Cadastrar
          </button>
        </form>
      </div>
      <div>
        <h1>Lista dos locais</h1>
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
              <button onClick={() => deleteLocation(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
    </>
  );
}
export default RegisterLocation;
