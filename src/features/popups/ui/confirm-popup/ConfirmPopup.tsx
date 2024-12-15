import cls from "./ConfirmPopup.module.css";
import {ButtonSize, UIButton} from "../../../../shared/ui";
import {memo} from "react";


interface IProps {
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmPopup = memo((props: IProps) => {
	return (
		<div className={cls.confirmContainer}>
			<h3 className={cls.title}>
				Вы действительно хотите удалить?
			</h3>

			<div className={cls.btnWrapper}>
				<UIButton
					text="Удалить"
					size={ButtonSize.Sm}
					onClick={props.onConfirm}
				/>
				<UIButton
					text="Отмена"
					size={ButtonSize.Sm}
					onClick={props.onCancel}
				/>
			</div>
		</div>
	);
})
