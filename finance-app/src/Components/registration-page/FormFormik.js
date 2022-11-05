import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "../Logo";
import style from "./FormFormik.module.css";
import * as yup from "yup";

function FormFormik() {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("Обязательно"),
    password: yup
      .string()
      .typeError("Неверный пароль")
      .required("Введите пароль"),
  });
  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Регистрация</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form className={style.form}>
                <label>Логин</label>
                <Field type="email" name="email" className={style.input} />
                {touched.email && errors.email && (
                  <div className={style.error}>{errors.email}</div>
                )}
                <label>Пароль</label>
                <Field
                  type="password"
                  name="password"
                  className={style.input}
                />
                {touched.password && errors.password && (
                  <div className={style.error}>{errors.password}</div>
                )}
                <button
                  className={style.btn}
                  type="submit"
                  disabled={!isValid && !dirty}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={style.registFon}>
        <div className={style.textFon}>
          <div className={style.welcome}>Добро пожаловать в FREENANCE</div>
          <div className={style.textConcept}>Помогаем cчитать быстро!</div>
        </div>
      </div>
    </div>
  );
}

export default FormFormik;
