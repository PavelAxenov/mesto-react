import React, {ChangeEvent, memo} from 'react';
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

const UiInput = (props: IProps) => {
	const { placeholder = '', value, type = InputType.Text, minLength = 2, maxLength = Infinity, handleValueChange, required = true } = props;

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
};

export default memo(UiInput);