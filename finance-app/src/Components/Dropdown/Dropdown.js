import React, { useEffect, useRef } from "react"
import "./Dropdown.css"
import { useState } from "react"
import CloseIcon from "./CloseIcon"

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

function Dropdown({
  placeHolder,
  isSearchable,
  onChange,
  category_type,
  income_outcome,
  categories,
  title,
  changeSelectElement,
  token,
  getInputData,
  getCategories,
  typeOfCategories,
  disInput,
}) {
  let [newCategory, setNewCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const searchRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    setSearchValue("")
    if (showMenu && searchRef.current) {
      searchRef.current.focus()
    }
  }, [showMenu])

  const onSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const getOptions = () => {
    if (!searchValue) {
      return categories
    }
    return categories.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
    )
  }

  useEffect(() => {
    const handler = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    window.addEventListener("click", handler)
    return () => {
      window.removeEventListener("click", handler)
    }
  })
  const handleInputClick = (event) => {
    setShowMenu(!showMenu)
  }

  function getDisplay() {
    if (selectedValue) {
      return selectedValue.categoryName
    }
    return title
  }

  const onItemClick = (option) => {
    setSelectedValue(option)
    console.log('onItemClick',option)
    changeSelectElement(option)
    disInput()
  }

  const isSelected = (option) => {
    if (!selectedValue) {
      return false
    }

    return selectedValue.categoryName === option.categoryName
  }

  function chooseAndAddCategory(e) {
    e.preventDefault();
    console.log(e)
    // disInput(e.target.selectedIndex);

    let selected = e.target.innerHTML
    console.log(selected)
    if (selected === "Добавить категорию") {
      newCategory = prompt("Введите название категории");
      setNewCategory(newCategory)

      let data = {
        categoryName: newCategory,
        category_type,
        income_outcome,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      };

      fetch("http://92.255.79.239:8000/api/categories/", options).then(
        (result) => {
          result.json();
          getCategories(typeOfCategories);
        }
      );
    } else {
      // if (selectedValue !== title) {
      //   changeSelectElement(e.target.value);
      // } else if (selectedValue === title) {
      //   getInputData();
      // }
    }
  }

  function deleteCategory(category) {
    if (window.confirm('Удалить категорию и все данные?')) {
      const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      }
    }

    fetch(`http://92.255.79.239:8000/api/del-category/${category}`, options)
    .then((result) => getCategories(typeOfCategories))
    }
    
    
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-input" ref={inputRef} onClick={handleInputClick}>
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
              <input
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
                placeholder="Добавить категорию"
              />
            </div>
          )}
          <div
            className="option_list_add"
            data-value="Добавить категорию"
            onClick={(e) => chooseAndAddCategory(e)}
          >
            Добавить категорию
          </div>
          {categories.map((jsonObject, index) => {
            if (jsonObject.category_type === category_type) {
              return (
                <div
                  className={`dropdown-item ${
                    isSelected(jsonObject) && "selected"
                  }`}
                  // value={JSON.stringify(jsonObject)}
                  key={jsonObject.category_id}
                  index={index}
                  // object={JSON.stringify(jsonObject)}
                  onClick={() => onItemClick(jsonObject)}
                >
                  {jsonObject.categoryName}
                  <span 
                  className="delete-icon" 
                  title="Удаление категории"
                  onClick={() => deleteCategory(jsonObject.category_id)} ><CloseIcon /></span>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
export default Dropdown
