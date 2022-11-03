// Компонент "Расходы"
import MainFieldString from './MainFieldString';

function MainFieldCosts() {
  const oneTime = [
    'Временные',
    'Подработка',
    'Наследство',
    'Добавить категорию',
  ];
  const permanent = [
    'Постоянные',
    'Зарплата',
    'Подработка',
    'Планируемые',
    'Добавить категорию',
  ];
  const planned = ['Планируемые','Добавить категорию'];
  return (
    <div className="main_field">
      <h2 className="main_field_title">Расходы</h2>
      <input className="input_rub"></input>
      <MainFieldString type={permanent} />
      <MainFieldString type={oneTime} />
      <MainFieldString type={planned} />
    </div>
  );
}

export default MainFieldCosts;
