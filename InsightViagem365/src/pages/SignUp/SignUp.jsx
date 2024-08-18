import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validateCPF, validateEmail } from "../../components/Validate/Validate";
import { api } from "../../services/api";
import { viaCep } from "../../services/viaCep";
import "./SignUp.css";

function SignUp() {
  const { register, handleSubmit, formState, setValue, reset, watch } =
    useForm();
  const navigate = useNavigate();
  const cep = watch("cep");

  async function addUser(data) {
    const cpf = data.cpf;
    const email = data.email;

    const cpfExists = await validateCPF(cpf);
    const emailExists = await validateEmail(email);

    if (cpfExists || emailExists) {
      return;
    }
    try {
      const response = await api("/usuario", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert("Usuário cadastrado com sucesso", result);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
  async function addressUser(cep) {
    if (cep && cep.length === 8) {
      try {
        const data = await viaCep(cep);

        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }

  useEffect(() => {
    addressUser(cep);
  }, [cep]);

  return (
    <>
      <div className="container-SignUp">
        <div className="back">
          <form
            onSubmit={handleSubmit(addUser)}
            className="form-container-signup"
          >
            <div className="form-floating mb-0">
              <input
                className="form-control input-h"
                id="floatingNome"
                placeholder="Digite o seu nome"
                {...register("nome", { required: "O nome é obrigatório" })}
              />
              <label htmlFor="floatingNome">Nome</label>
              <span>{formState.errors?.nome?.message}</span>
            </div>
            <div className="form-floating mb-0">
              <input
                className="form-control"
                id="floatingCPF"
                placeholder="cpf"
                {...register("cpf", {
                  required: "O CPF é obrigatório",
                  maxLength: 11,
                })}
              />
              <label htmlFor="floatingCPF">CPF</label>
              <span>{formState.errors?.cpf?.message}</span>
            </div>
            <div className="form-floating mb-0">
              <input
                type="date"
                className="form-control"
                id="floatingDate"
                {...register("dataNascimento", {
                  required: "O data de nascimento é obrigatório",
                })}
              />
              <label htmlFor="floatingDate">Data de Nascimento</label>
              <span>{formState.errors?.dataNascimento?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                className="form-control"
                id="floatingInput"
                placeholder="Digite o seu email"
                {...register("email", { required: "O email é obrigatório" })}
              />
              <label htmlFor="floatingInput">Email</label>
              <span>{formState.errors?.email?.message}</span>
            </div>

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
            <div className="form-floating mb-0">
              <input
                className="form-control"
                id="floatingPassword"
                placeholder="Senha"
                type="password"
                {...register("senha", { required: "A senha é obrigatória" })}
              />
              <label htmlFor="floatingPassword">Senha</label>
              <span>{formState.errors?.senha?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                type="text"
                className="form-control h-25 d-inline-block"
                id="floatingCep"
                placeholder="cep"
                {...register("cep", { required: "Cep é obrigatório" })}
              />
              <label htmlFor="floatingCep">CEP</label>
              <span>{formState.errors?.cep?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                type="text"
                className="form-control"
                id="floatingLogradouro"
                placeholder="Digite o seu endereço"
                {...register("logradouro")}
              />
              <label htmlFor="floatingLogradouro">Endereço</label>
              <span>{formState.errors?.logradouro?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                type="text"
                className="form-control"
                id="floatingBairro"
                placeholder="Digite o seu bairro"
                {...register("bairro")}
              />
              <label htmlFor="floatingBairro">Bairro</label>
              <span>{formState.errors?.bairro?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                type="text"
                className="form-control"
                id="floatingCidade"
                placeholder="Digite a sua cidade"
                {...register("cidade")}
              />
              <label htmlFor="floatingCidade">Cidade</label>
              <span>{formState.errors?.cidade?.message}</span>
            </div>

            <div className="form-floating mb-0">
              <input
                type="text"
                className="form-control"
                id="floatingEstado"
                placeholder="Digite o seu estado"
                {...register("estado")}
              />
              <label htmlFor="floatingEstado">Estado</label>
              <span>{formState.errors?.estado?.message}</span>
            </div>

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
