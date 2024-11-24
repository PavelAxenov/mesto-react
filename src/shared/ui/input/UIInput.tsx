import { ChangeEvent, memo } from 'react';
import styles from './UIInput.module.css'
import {InputType} from "./types";


interface IProps {
	value: string;
	type?: InputType;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
	handleValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean
}

export const UIInput = memo((props: IProps) => {
	const {
		placeholder = '',
		value,
		type = InputType.Text,
		minLength = 2,
		maxLength = Infinity,
		required = true,
		handleValueChange,
	} = props;

	const inputClass = `${styles['ui-input']}`

	return (
		<input
			className={inputClass}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={handleValueChange}
			minLength={minLength}
			maxLength={maxLength}
			autoComplete="off"
			required={required}
		/>
	);
});
