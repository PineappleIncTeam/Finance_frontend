import React, { useEffect, useRef } from "react"
import "./Dropdown.css"
import { useState } from "react"
import { URLS } from "../../urls/urls"
import CloseIcon from "./CloseIcon"
import Modal from "../modalWindow/Modal"
import style from "../modalWindow/Modal.module.css"
// import { render } from "react-dom"

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
  const [newCategory, setNewCategory] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const searchRef = useRef()
  const inputRef = useRef()
  //
  const [modalActive, setModalActive] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  function closeModal() {
    setNewCategory("")
    setModalActive(false)
  }
  function handleInput(e) {
    setError(false)
    setErrorMessage("")
    e.preventDefault()
    setNewCategory(e.target.value.replace(/[?.,/#$%^&*!()<>@]+/, ""))
    if (e.target.value.length > 14) {
      setError(true)
      setErrorMessage("Не более 14 символов")
    }
  }
  //
  const [modalDelete, setModalDelete] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [modalMessage, setModalMessage] = useState("")
  
  function createModal(categoryId, categoryName) {
    setModalMessage(`Вы хотите удалить категорию "${categoryName}" или отправить её в архив?`)
    setSelectedCategory({ id: categoryId, name: categoryName })
    setModalDelete(true)
  }
  //
  const userCategoriesName = categories.map((item) => {
    if (item.category_type === category_type) {
      return item.categoryName.toLowerCase()
    }
  })

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
    console.log("onItemClick", option)
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
    e.preventDefault()
    
    for (let i = 0; i < userCategoriesName.length; i++) {
      if (userCategoriesName[i] === newCategory.toLowerCase()) {
        setErrorMessage("Категория с таким именем уже существует")
        return
      }
    }
    let data = {
      categoryName: newCategory,
      category_type,
      income_outcome,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }

    fetch(URLS.createCategory, options).then(
      (result) => {
        result.json()
        setSelectedValue("")
        getCategories(typeOfCategories)
        getDisplay()
        setNewCategory("")
        setModalActive(false)
      }
    )
  }

  function deleteCategory(e, category) {
    e.preventDefault()
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }

    fetch(`${URLS.deleteCategory}${category.id}`, options)
      .then((result) => {
        setSelectedValue("")
        getDisplay()
        getCategories(typeOfCategories)
        setModalMessage(`Категория "${selectedCategory.name}" была удалена`)
      })
      .then(() => {
        setTimeout(() => {
          setModalDelete(false)
          setSelectedCategory({})
          setModalMessage("")
        }, 2000)
      })
    // }
  }

  function sendToArchive(e, category) {
    e.preventDefault()
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        category_id: category.id,
        is_hidden: true,
      }),
    }

    fetch(
      `${URLS.sendCategoryToArchive}${category.id}`,
      options
    )
      .then((result) => {
        setModalMessage(`Категория "${selectedCategory.name}" была переведена в архив`)
        setSelectedValue("")
        getDisplay()
        getCategories(typeOfCategories)
      })
      .then(() => {
        setTimeout(() => {
          setModalDelete(false)
          setSelectedCategory({})
          setModalMessage("")
        }, 2000)
      })
    // } else return
  }

  function cancel(e) {
    e.preventDefault()
    setSelectedCategory({})
    setModalDelete(false)
  }

  return (
    <>
      <div className="dropdown-container">
        <div
          className="dropdown-input"
          ref={inputRef}
          onClick={handleInputClick}
        >
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
              onClick={() => setModalActive(true)}
            >
              Добавить категорию
            </div>
            {categories.map((jsonObject, index) => {
              if (
                jsonObject.category_type === category_type &&
                jsonObject.is_hidden === false
              ) {
                return (
                  <div
                    className={`dropdown-item ${
                      isSelected(jsonObject) && "selected"
                    }`}
                    key={jsonObject.category_id}
                    index={index}
                    onClick={() => onItemClick(jsonObject)}
                  >
                    {jsonObject.categoryName}
                    <span
                      className="delete-icon"
                      title="Удаление категории"
                      // onClick={() => deleteCategory(jsonObject.category_id)}
                      onClick={() =>
                        createModal(
                          jsonObject.category_id,
                          jsonObject.categoryName
                        )
                      }
                    >
                      <CloseIcon />
                    </span>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setInput={() => setNewCategory("")}
      >
        <div className={style.delete_icon} onClick={closeModal}>
          <CloseIcon className={style.icon_styles} />
        </div>
        <p className={style.modal_text}>
          Введите название категории (не более 14 символов)
        </p>
        <div>
          <input
            className={
              error ? `${style.modal_input} ${style.error}` : style.modal_input
            }
            type="text"
            value={newCategory}
            onChange={(e) => handleInput(e)}
          />
          <button
            className={style.button}
            onClick={(e) => chooseAndAddCategory(e)}
          >
            Добавить
          </button>
        </div>
        <div className={style.errorMessage}>{errorMessage}</div>
      </Modal>
      <Modal active={modalDelete} setActive={setModalDelete}>
        <div
          className={style.delete_icon}
          onClick={() => setModalDelete(false)}
        >
          <CloseIcon className={style.icon_styles} />
        </div>
        <div className={style.modal_text}>{modalMessage}</div>
        <div>
          <button
            className={style.button}
            onClick={(e) => deleteCategory(e, selectedCategory)}
          >
            Удалить
          </button>
          <button
            className={style.button}
            onClick={(e) => sendToArchive(e, selectedCategory)}
          >
            В архив
          </button>
          <button className={style.button} onClick={(e) => cancel(e)}>
            Отмена
          </button>
        </div>
      </Modal>
    </>
  )
}
export default Dropdown
