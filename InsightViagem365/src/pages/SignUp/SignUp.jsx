import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { viaCep } from "../../services/viaCep";
import "./SignUp.css";

function SignUp() {
  const { register, handleSubmit, formState, setValue, reset, watch } =
    useForm();
  const cep = watch("cep");

  async function addUser(data) {
    try {
      const response = await api("/usuario", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  }
  async function addressUser(cep) {
    if (cep && cep.length === 8) {
      try {
        const data = await viaCep(cep);

        console.log(data);
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      } catch (error) {}
    }
  }
  useEffect(() => {
    addressUser(cep);
  }, [cep]);

  return (
    <>
      <div className="container-SignUp">
        <div className="back">
          <form onSubmit={handleSubmit(addUser)} className="form-container-signup">
            <div className="form-floating mb-3">
              <input
                className="form-control input-h"
                id="floatingNome"
                placeholder="Digite o seu nome"
                {...register("nome", { required: "O nome é obrigatório" })}
              />
              <label htmlFor="floatingNome">Nome</label>
            </div>
            {formState.errors?.nome?.message}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingCPF"
                placeholder="CPF"
                {...register("CPF", { required: "O CPF é obrigatório" })}
              />
              <label htmlFor="floatingCPF">CPF</label>
            </div>
            {formState.errors?.CPF?.message}
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingDate"
                {...register("dataNascimento", {
                  required: "O data de nascimento é obrigatório",
                })}
              />
              <label htmlFor="floatingDate">Data de Nascimento</label>
            </div>
            {formState.errors?.dataNascimento?.message}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInput"
                placeholder="Digite o seu email"
                {...register("email", { required: "O email é obrigatório" })}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            {formState.errors?.email?.message}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingPassword"
                placeholder="Senha"
                type="password"
                {...register("senha", { required: "A senha é obrigatória" })}
              />
              <label htmlFor="floatingPassword">Senha</label>
            </div>
            {formState.errors?.senha?.message}
            <fieldset className="fieldset" id="fieldset">
              <p>Sexo</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="Feminino"
                  id="flexRadioDefault1"
                  {...register("sexo")}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Feminino
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="Masculino"
                  id="flexRadioDefault2"
                  {...register("sexo")}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Masculino
                </label>
              </div>
            </fieldset>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control h-25 d-inline-block"
                id="floatingCep"
                placeholder="cep"
                {...register("cep", {})}
              />
              <label htmlFor="floatingCep">CEP</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingLogradouro"
                placeholder="Digite o seu endereço"
                {...register("logradouro")}
              />
              <label htmlFor="floatingLogradouro">Endereço</label>
            </div>

            {formState.errors?.endereco?.message}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingBairro"
                placeholder="Digite o seu bairro"
                {...register("bairro")}
              />
              <label htmlFor="floatingBairro">Bairro</label>
            </div>
            {formState.errors?.bairro?.message}

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingCidade"
                placeholder="Digite a sua cidade"
                {...register("cidade")}
              />
              <label htmlFor="floatingCidade">Cidade</label>
            </div>
            {formState.errors?.cidade?.message}

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingEstado"
                placeholder="Digite o seu estado"
                {...register("estado")}
              />
              <label htmlFor="floatingEstado">Estado</label>
            </div>
            {formState.errors?.estado?.message}

            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;
