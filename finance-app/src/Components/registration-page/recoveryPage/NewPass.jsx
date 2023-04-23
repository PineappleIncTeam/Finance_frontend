import { Formik, Form, Field } from "formik"
import Logo from "../../Logo"
import { Link } from "react-router-dom"
import style from "./RecoveryPass.module.css"

const NewPass = () => {
    return (
        <div className={style.root}>
          <div className={style.formRegist}>
            <div className={style.logo}>
              <Logo />
            </div>
            <div className={style.regist}>
              <h1>Изменение пароля</h1>
              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={(values) => {
                  console.log("submit", values)
                }}
              >
                {({ errors, touched, values }) => (
                  <Form className={style.form}>
                    <label>Пароль</label>
                    <Field
                      className={
                        values.email && errors.email
                          ? style.inputError
                          : style.input
                      }
                      type="password"
                      name="password"
                      placeholder="Введите пароль"
                    />
                    <div className={style.error}>
                      {values.email && errors.email}
                    </div>
                    <label>Пароль</label>
                    <Field
                      className={
                        values.email && errors.email
                          ? style.inputError
                          : style.input
                      }
                      type="password"
                      name="password"
                      placeholder="Повторите пароль"
                    />
                    <button className={style.btn} type={"submit"}>
                      <Link to="/" className={style.btn_link}>Готово</Link>
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/" className={style.recovery}>
                Вернуться назад
              </Link>
            </div>
          </div>
          <div className={style.registFon}></div>
        </div>
      )
    }

export default NewPass