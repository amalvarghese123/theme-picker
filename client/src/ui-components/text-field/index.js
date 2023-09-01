const TextField = ({ label, type = "text", name, error, ...rest }) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} id={name} name={name} {...rest} />
      {error && <p>{error}</p>}
    </>
  );
};
export default TextField;
