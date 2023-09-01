import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "../../ui-components/text-field";
import { loginUser } from "../../data-store/actions/actionCreators";
import { useLocation, useNavigate } from "react-router-dom";
import useToastMessage from "../../hooks/useToastMessage";
import getErrorMessage from "../../utils/getErrorMessage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { showToastFailure, showToastSuccess } = useToastMessage();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then(() => {
        navigate("/");
        showToastSuccess("Logged in successfully");
      })
      .catch((error) => showToastFailure(error.message));
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const stateData = location.state;
    if (stateData?.email) {
      setFormData((prev) => ({ ...prev, email: stateData.email }));
    }
  }, []);
  return (
    <div className="form-container">
      <form className="form">
        <h2>Login</h2>
        <div className="mb-3">
          <TextField
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleLogin} className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
