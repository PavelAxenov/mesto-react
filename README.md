# Проект: Места России

**_Простой способ поделиться фото с друзьями и близкими_**

### Главная страница
![Главная](https://github.com/PavelAxenov/mesto-react/raw/main/src/images/Scrin_1.png)

### Редактирование профиля
![Профиль](https://github.com/PavelAxenov/mesto-react/raw/main/src/images/profileNew.png)

### Попап с картинкой
![Картинка](https://github.com/PavelAxenov/mesto-react/raw/main/src/images/Metro.png)

### Добавление карточки с фото
![Добавить место](https://github.com/PavelAxenov/mesto-react/raw/main/src/images/newPlace.png)

### Обновление аватара
![Обновить аватар](https://github.com/PavelAxenov/mesto-react/raw/main/src/images/avatar.png)


## Функциональность

* Подключен API. Использован стейт для данных из API;
* Контекст текущего пользователя. Данные текущего пользователя нужны в разных местах приложения, например:
	* на странице отрисовывается информация о пользователе;
	* можно определить должна ли в текущей карточке показываться иконка   удаления и может ли пользователь удалять карточку;
	* можно определить поставил ли уже пользователь «лайк» этой карточке.
* Модальные окна открываются при нажатии на соответствующий элемент интерфейса.
* При клике на картинку показывается полноразмерное изображение.

## Стек
* CSS Modules;
* React;
* React Portal
* Redux Toolkit;
* Typescript
* API;
* FSD;
* Webpack;

## Инструкция по запуску приложения
* Клонировать проект https://github.com/PavelAxenov/mesto-react.git;
* Установить зависимости npm install;
* Запустить локальный сервер npm start. В браузере откроется проект по адресу http://localhost:3000
