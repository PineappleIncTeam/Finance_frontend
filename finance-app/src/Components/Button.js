//Компонент "Кнопка". Сейчас не используется, кнопки прописаны руками, кажндая по отдельности в блоке навигации
function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button> 
  );
}

export default Button;
