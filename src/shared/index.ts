// lib
export { useAppDispatch, useAppSelector } from './lib/hooks/redux'
export { classNames } from './lib/classnames/classNames'

// model
export { USER_SLICE_NAME, CARDS_SLICE_NAME, BASE_REQUEST_URL, BASE_REQUEST_HEADERS } from './model/store/constants'
export { store } from './model/store/store'
export type { RootState, AppDispatch } from './model/store/store';
export type { IUserSchema, ICardsSchema } from './model/store/types';
export { RequestStatus } from './model/store/types';

// ui
export { Header } from './ui/header/Header'
export { Footer } from './ui/footer/Footer'

export { UIButton } from './ui/button/UIButton'
export { ButtonSize, ButtonVariant, ButtonType } from './ui/button/types'

export { UIIcon } from './ui/icon/UIIcon'
export { IconSize, IconName } from './ui/icon/types'

export { UIInput } from './ui/input/UIInput'
export { InputType } from './ui/input/types'

export { Modal } from './ui/modal/Modal'
export { ModalType } from './ui/modal/type'