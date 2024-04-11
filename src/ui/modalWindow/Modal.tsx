import style from "./Modal.module.css";

const Modal = ({ active, setActive, setInput, children }: any) => {
	return (
		<div
			className={active ? `${style.modal} ${style.active}` : style.modal}
			onMouseDown={() => {
				setActive(false);
				setInput(false);
			}}>
			<div className={style.modal_content} onMouseDown={(event) => event.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
