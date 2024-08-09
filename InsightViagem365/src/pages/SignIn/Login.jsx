import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./Login.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function userLogin(data) {
    try {
      const isSuccess = await signIn(data);
      if (isSuccess) {
        navigate("/Dashboard");
      } else {
        alert("Email ou senha incorretos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form className="form-container-login" onSubmit={handleSubmit(userLogin)}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Digite seu Email"
            required
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Digite sua senha"
            required
            {...register("password")}
          />
        </div>
        <div className="button-form-div">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
          <Link to="/SignUp">
            <button type="button" className="btn btn-primary">
              Cadastre-se
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
