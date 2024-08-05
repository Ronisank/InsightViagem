import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import "./SignUp.css";

function SignUp() {
  const { register, handleSubmit, formState } = useForm();

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

  return (
    <>
    <div className="container-SignUp">
      <form onSubmit={handleSubmit(addUser)} className="form-container">
        <div className="form-floating mb-2">
          <input
            className="form-control"
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
            className="form-control"
            id="floatingEndereco"
            placeholder="Digite o seu endereço"
            {...register("endereco", { required: "O endereço é obrigatório" })}
          />
          <label htmlFor="floatingEndereco">Endereço</label>
        </div>
        {formState.errors?.endereco?.message}

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
    </>
  );
}
export default SignUp;
