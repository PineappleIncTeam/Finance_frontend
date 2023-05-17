// Компонент "Накопления"
import MainFieldString from "./MainFieldString"
function MainFieldStorage({ setCheckMainField }) {
  
  setCheckMainField(false)
  
  const categories = [
    {
      categoryName: "Зарплата",
      category_id: 1,
      category_type: "storages",
      income_outcome: "income",
    },
    {
      categoryName: "Подстава",
      category_id: 1,
      category_type: "storages",
      income_outcome: "income",
    },
  ]
  return (
    <div className="main_field">
      <h2 className="main_field_title storage_title">Накопления</h2>
      <div className="main_field_storage">
        {/* <select className="select_storage analitic_select">
            <option>Добавить категорию</option>
            
          </select> */}

        <MainFieldString categories={categories} type={categories.category_type} />
      </div>
      <div className="storage_categories">
        <div className="categories_storage_title fat">
          <div className="category_name_storage fat">Категория</div>
          <div className="grand_total_storage fat">Цель руб</div>
          <div className="sum_storage fat">Сумма, руб</div>
        </div>
        <div className="categories_storage_title">
          <div className="category_name_storage">Сумка Louis Vuitton</div>
          <div className="grand_total_storage">150 000,00</div>
          <div className="sum_storage sum_storage_content">100 000,00</div>
        </div>
        <div className="categories_storage_title">
          <div className="category_name_storage">Машина Audi</div>
          <div className="grand_total_storage">5 000 000,00</div>
          <div className="sum_storage sum_storage_content">500 000,00</div>
        </div>
        <div className="categories_storage_title">
          <div className="category_name_storage">Отпуск</div>
          <div className="grand_total_storage">300 000,00</div>
          <div className="sum_storage sum_storage_content">200 000,00</div>
        </div>
      </div>
    </div>
  )
}
export default MainFieldStorage
