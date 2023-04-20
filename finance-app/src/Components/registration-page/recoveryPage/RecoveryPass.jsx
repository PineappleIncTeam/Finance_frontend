import Logo from "../../Logo"
import style from "./RecoveryPass.module.css"

const RecoveryPass = () => {
  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Вход</h1>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPass
