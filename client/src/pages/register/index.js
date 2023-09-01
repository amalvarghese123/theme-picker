import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "../../ui-components/text-field";
import { registerUser } from "../../data-store/actions/actionCreators";
import getErrorMessage from "../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import useToastMessage from "../../hooks/useToastMessage";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToastFailure, showToastSuccess } = useToastMessage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { name, email, phone, password } = formData;

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then(() => {
        navigate("/login", {
          state: { email: email },
        });
        showToastSuccess("Registered successfully");
      })
      .catch((error) => showToastFailure(error.message));
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="form-container">
      <form className="form">
        <h2>Register</h2>
        <div className="mb-3">
          <TextField
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
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
        <div className="mb-3">
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <TextField
            label="Phone"
            placeholder="Phone"
            type="number"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleRegister} className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
