import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export function EditLocation() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  async function onUpdate(data) {
    const response = await api(`/Locais/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Local atualizado com sucesso!");
      console.log(data);
    }
  }

  async function recoverLocation() {
    const response = await api(`/Locais/${id}`);
    const data = await response.json();
    console.log(data);
    if (data) {
      reset(data);
    }
  }

  useEffect(() => {
    recoverLocation();
  }, [id, reset]);

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <input type="text" placeholder="Nome " {...register("nome")} />
      <textarea
        type="text"
        placeholder="descrição"
        {...register("descricao")}
      />
      <button className="btn btn-primary">Atualizar</button>
    </form>
  );
}
