import MainFieldString from "./MainFieldString";
function MainFieldStorage() {
    const categories = ['Категория','Добавить категорию'];
    return (
      <div className="main_field">
        <h2 className="main_field_title">Накопления</h2>
        <input className="input_rub"></input>
        
        <MainFieldString type={categories} />
      </div>
    );
}
export default MainFieldStorage