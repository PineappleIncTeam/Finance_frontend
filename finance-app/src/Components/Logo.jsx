import LogoSVG from '../Images/LogoSVG.svg'
function Logo() {
  return (
    <div className="logo_block">
      <img src={LogoSVG}></img>
      <h3 className="logo">FREEnance</h3>
      <div className="logo_text"></div>
    </div>
  );
}
export default Logo;
