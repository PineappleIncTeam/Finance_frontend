// Компонент "Аналитика"
// import MainFieldString from './MainFieldString';

function MainFieldAnalitic() {
    return (
        <div className="main_field main_field_analitic">
          <h2 className="main_field_title">Аналитика</h2>
            <label className="label_analitic label_analitic1">Доходы
                <input className="main_field_string_input analitic_string" type='text'></input>
            </label>
            <label className="label_analitic">Расходы
                <input className="main_field_string_input analitic_string" type='text'></input>
            </label>
            <label className="label_analitic">Баланс
                <input className="main_field_string_input analitic_string" type='text'></input>
            </label>
          
        </div>
      );
}

export default MainFieldAnalitic