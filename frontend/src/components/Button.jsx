function Button({ text, onClick, type = "button" }) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;