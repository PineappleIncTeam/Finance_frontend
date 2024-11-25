import Logotype from "../Images/logo.webp";
function Logo() {
  return (
    <div className="logo_block">
      <img src={Logotype} alt="Logotype" className="logotype" />
    </div>
  );
}
export default Logo;
