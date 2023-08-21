// Импорт функций для взаимодействия с сервером

import { requestFunc } from './server-tools/request.js';
import { pathFunc } from './server-tools/path.js';
import { deleteFunc } from './server-tools/delete.js';
import { requestSearch } from './server-tools/search.js';
import { patchFunc } from './server-tools/patch.js';
import { getFunc } from './server-tools/get.js';

const root = document.querySelector('#app');
const header = document.createElement('header');
const main = document.createElement('main');

header.classList.add('head');
main.classList.add('main');

root.append(header, main);

// Функция создания шапки
const createHead = function () {
  const container = document.createElement('div');
  const headerContainer = document.createElement('div');
  const linkTitle = document.createElement('a');
  const formSearch = document.createElement('form');
  const inputSearch = document.createElement('input');
  const linkImg = document.createElement('img');

  container.classList.add('container', 'header__main-container');
  headerContainer.classList.add('header__container');
  formSearch.classList.add('header__form');
  inputSearch.classList.add('header__input');
  linkTitle.classList.add('header__logo');
  linkImg.classList.add('header__logo-href');
  inputSearch.placeholder = 'Введите значение';
  inputSearch.name = 'input';
  linkTitle.href = '#';
  linkImg.src = 'img/main.svg';

  linkTitle.append(linkImg);
  header.append(container);
  formSearch.append(inputSearch);
  container.append(headerContainer);

  headerContainer.append(linkTitle, formSearch);

  return {
    formSearch,
    inputSearch,
  };
};

// Функция создания тела станицы
const createMain = function () {
  const container = document.createElement('div');
  const bodyTitle = document.createElement('h1');
  const table = document.createElement('table');
  const tHead = document.createElement('thead');
  const tBody = document.createElement('tbody');
  const tRow = document.createElement('tr');
  const tTdID = document.createElement('td');
  const tTdFullName = document.createElement('td');
  const tTdDateCreate = document.createElement('td');
  const tTdDateChange = document.createElement('td');
  const tTdContacts = document.createElement('td');
  const tTdAction = document.createElement('td');
  const divMainContainer = document.createElement('div');
  const btnId = document.createElement('button');
  const btnName = document.createElement('button');
  const btnDate = document.createElement('button');
  const btnChangeDate = document.createElement('button');
  const divContact = document.createElement('button');
  const divAction = document.createElement('button');
  const addStudentBtn = document.createElement('button');

  container.classList.add('container');
  divMainContainer.classList.add('students');
  bodyTitle.classList.add('students__title');

  table.classList.add('table-students');
  tHead.classList.add('table-students__thead');
  tBody.classList.add('table-students__tbody');
  tRow.classList.add('table-students__row');
  tTdID.classList.add('table-students__td', 'table-students__td--id');
  tTdFullName.classList.add(
    'table-students__td',
    'table-students__td--fullName'
  );
  tTdDateCreate.classList.add(
    'table-students__td',
    'table-students__td--dateCreate'
  );
  tTdDateChange.classList.add(
    'table-students__td',
    'table-students__td--dateChange'
  );
  tTdContacts.classList.add(
    'table-students__td',
    'table-students__td--contacts'
  );
  tTdAction.classList.add('table-students__td', 'table-students__td--action');

  btnId.classList.add('table-students__btn', 'table-students__btn--id');
  btnName.classList.add('table-students__btn', 'table-students__btn--name');
  btnDate.classList.add('table-students__btn', 'table-students__btn--date');
  btnChangeDate.classList.add(
    'table-students__btn',
    'table-students__btn--changeDate'
  );
  divContact.classList.add(
    'table-students__btn',
    'table-students__btn--contact'
  );
  divAction.classList.add('table-students__btn', 'table-students__btn--action');
  addStudentBtn.classList.add(
    'table-students__btn',
    'table-students__btn--addStudent'
  );

  bodyTitle.innerHTML = 'Клиенты';
  addStudentBtn.innerHTML = 'Добавить студента';

  btnId.innerHTML = 'ID';
  btnName.innerHTML = 'Фамилия Имя Отчество';
  btnDate.innerHTML = 'Дата и время Создания';
  btnChangeDate.innerHTML = 'Последние изменения';
  divContact.innerHTML = 'Контакты';
  divAction.innerHTML = 'Действия';

  divContact.disabled = true;
  divAction.disabled = true;

  table.append(tHead, tBody);
  tHead.append(tRow);
  tRow.append(
    tTdID,
    tTdFullName,
    tTdDateCreate,
    tTdDateChange,
    tTdContacts,
    tTdAction
  );
  tTdID.append(btnId);
  tTdFullName.append(btnName);
  tTdDateCreate.append(btnDate);
  tTdDateChange.append(btnChangeDate);
  tTdContacts.append(divContact);
  tTdAction.append(divAction);

  divMainContainer.append(bodyTitle, table, addStudentBtn);
  container.append(divMainContainer);
  main.append(container);

  return { addStudentBtn, tBody, table };
};

const addZero = (n) => (n < 10 ? `0${n}` : n);

// Функция создания строки со студентами
// В качестве параметра принимает елемент массива, полученный из базы данных
// Возвращает элемент tr
const createStrStudents = function (element) {
  const studentTr = document.createElement('tr');
  const studentId = document.createElement('td');
  const studentFullName = document.createElement('td');
  const studentDateCreate = document.createElement('td');
  const studentDateChange = document.createElement('td');
  const studentContact = document.createElement('td');
  const studentAction = document.createElement('td');
  const changeBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  deleteBtn.dataset.id = element.id;

  const createDate = new Date(element.createdAt);

  const dayCreate = addZero(createDate.getDate());
  const monthCreate = addZero(createDate.getMonth() + 1);
  const yearCreate = addZero(createDate.getFullYear());
  const hourCreate = addZero(createDate.getHours());
  const minuteCreate = addZero(createDate.getMinutes());

  const upadateDate = new Date(element.updatedAt);

  const dayUpdate = addZero(upadateDate.getDate());
  const monthUpdate = addZero(upadateDate.getMonth() + 1);
  const yearUpdate = addZero(upadateDate.getFullYear());
  const hourUpdate = addZero(upadateDate.getHours());
  const minuteUpdate = addZero(upadateDate.getMinutes());

  const spanTimeCreate = document.createElement('span');
  spanTimeCreate.classList.add('span-time');

  const spanTimeUpdate = document.createElement('span');
  spanTimeCreate.classList.add('span-time');

  spanTimeCreate.innerHTML = `${hourCreate}:${minuteCreate}`;
  spanTimeUpdate.innerHTML = `${hourUpdate}:${minuteUpdate}`;
  studentId.dataset.id = element.id;
  studentId.innerHTML = element.id.substr(7, 6);
  studentFullName.innerHTML = `${element.surname} ${element.name} ${element.lastName}`;
  studentDateCreate.innerHTML = `${dayCreate}:${monthCreate}:${yearCreate}`;
  studentDateChange.innerHTML = `${dayUpdate}:${monthUpdate}:${yearUpdate}`;

  element.contacts.forEach((e) => {
    const createImgFunc = createImgContact(e.type, e.value);
    studentContact.append(createImgFunc.href);
  });

  studentDateCreate.append(spanTimeCreate);
  studentDateChange.append(spanTimeUpdate);

  studentTr.classList.add('table__row-student');
  studentId.classList.add('table__td-student', 'table__td--id');
  studentFullName.classList.add('table__td-student', 'table__td--fullName');
  studentDateCreate.classList.add('table__td-student', 'table__td--createDate');
  studentDateChange.classList.add('table__td-student', 'table__td--changeDate');
  studentContact.classList.add('table__td-student', 'table__td--contact');
  studentAction.classList.add('table__td-student', 'table__btn--container');
  changeBtn.classList.add('table__btn-student', 'table__btn-student--change');
  deleteBtn.classList.add('table__btn-student', 'table__btn-student--delete');

  changeBtn.innerHTML = 'Изменить';
  deleteBtn.innerHTML = 'Удалить';

  studentAction.append(changeBtn, deleteBtn);

  studentTr.append(
    studentId,
    studentFullName,
    studentDateCreate,
    studentDateChange,
    studentContact,
    studentAction
  );

  return studentTr;
};

// Функция создания картинок для контактов, исходя из полученного названия контакта
const createImgContact = function (type, value) {
  const href = document.createElement('a');
  const img = document.createElement('img');
  const toolTip = createToolTip();
  href.target = '_blank';
  href.classList.add('table__td-student--href');
  img.classList.add('table__td-student--img');
  href.append(img);
  href.append(toolTip);

  if (type === 'Телефон') {
    img.src = 'img/phone.svg';
    href.href += 'tel:' + value;
    toolTip.innerHTML = value;
    toolTip.dataset.adress = 'Телефон';
  }
  if (type === 'Доп.телефон') {
    img.src = 'img/phone.svg';
    href.href += 'tel:' + value;
    toolTip.innerHTML = value;
    toolTip.dataset.adress = 'Доп.телефон';
  }
  if (type === 'Email') {
    img.src = 'img/mail.svg';
    href.href = 'mailto:' + value;
    toolTip.innerHTML = value;
    toolTip.dataset.adress = 'Email';
  }
  if (type === 'Facebook') {
    img.src = 'img/fb.svg';
    href.href = value;
    toolTip.innerHTML = `facebook:${value}`;
    toolTip.dataset.adress = 'Facebook';
  }
  if (type === 'VK') {
    img.src = 'img/vk.svg';
    href.href = value;
    toolTip.innerHTML = `VK:${value}`;
    toolTip.dataset.adress = 'VK';
  }

  return { img, href };
};

// Функция создания тултипов для поля "Контакты"
const createToolTip = function () {
  const toolTipText = document.createElement('div');
  toolTipText.classList.add('toolTip');
  return toolTipText;
};

// Функция запроса студентов из базы данных
// В качестве параметров принимает созданную таблицу
const getStudentInBase = async function (createMainTbody) {
  const load = animationLoad(createMainTbody);
  main.append(load);
  const btnAdd = document.querySelector('.table-students__btn--addStudent');
  btnAdd.classList.add('table-students__btn--none');
  const massStudents = await requestFunc();
  const notFound = document.querySelector('.student__div-error');

  if (massStudents.message) {
    notFound.innerHTML = `Ошибка<span class = "student__span-error">\'${massStudents.message}!\'</span> Запустите сервер и перезагрузите страницу`;
    notFound.classList.add('student__div-error_action');
    btnAdd.classList.remove('table-students__btn--none');
    btnAdd.disabled = true;
    load.remove();
    return;
  }
  if (massStudents.length === 0) {
    notFound.classList.add('student__div-error_action');
    btnAdd.classList.remove('table-students__btn--none');
    load.remove();
    return;
  }
  massStudents.forEach((element) => {
    const tRow = createStrStudents(element);
    createMainTbody.append(tRow);
    btnAdd.classList.remove('table-students__btn--none');
    load.remove();
  });

  return massStudents;
};

// Функция создания модального окна
const createModalAddStudent = function () {
  const modal = document.createElement('div');
  const modalOverlay = document.createElement('div');
  const modalContainer = document.createElement('div');
  const title = document.createElement('h1');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputSureName = document.createElement('input');
  const inputLastName = document.createElement('input');
  const divContactContainer = document.createElement('div');
  const btnAddContact = document.createElement('button');
  const divBtnContainer = document.createElement('div');
  const btnSave = document.createElement('button');
  const btnCancel = document.createElement('button');
  const btnClose = document.createElement('button');

  modal.classList.add('modal');
  modalOverlay.classList.add('modal__overlay');
  modalContainer.classList.add('modal__container');
  title.classList.add('modal__title', 'modal__title--add');
  form.classList.add('modal__form');
  inputName.classList.add('modal__input', 'modal__input--name');
  inputSureName.classList.add('modal__input', 'modal__input--surename');
  inputLastName.classList.add('modal__input', 'modal__input--lastname');
  divContactContainer.classList.add('contacts');
  btnAddContact.classList.add('modal__add-btn-student');
  divBtnContainer.classList.add('modal__btn-container');
  btnSave.classList.add('modal__btn', 'modal__btn--save');
  btnCancel.classList.add('modal__btn', 'modal__btn--cancel');
  btnClose.classList.add('modal__btn', 'modal__btn--close');

  title.innerHTML = 'Новый клиент';
  inputSureName.placeholder = 'Фамилия';
  inputName.placeholder = 'Имя';
  inputLastName.placeholder = 'Отчество';
  btnAddContact.innerHTML = 'Добавить контакт';
  btnSave.innerHTML = 'Сохранить';
  btnCancel.innerHTML = 'Отмена';
  btnSave.dataset.data = 'addStudent';

  inputName.name = 'name';
  inputSureName.name = 'surname';
  inputLastName.name = 'lastname';
  btnSave.name = 'btnSave';
  btnClose.name = 'btnClose';
  btnClose.type = 'button';
  btnCancel.type = 'button';
  btnAddContact.type = 'button';
  modal.append(modalOverlay);
  modalOverlay.append(modalContainer);
  modalChangesAction(form);

  modalContainer.append(
    title,
    form,
    divBtnContainer,
    btnClose,
    divContactContainer
  );

  divBtnContainer.append(btnSave, btnCancel);
  form.append(
    inputSureName,
    inputName,
    inputLastName,
    divContactContainer,
    btnAddContact,
    divBtnContainer
  );

  return {
    modal,
    btnClose,
    btnCancel,
    modalOverlay,
    form,
    btnSave,
    divContactContainer,
  };
};

// Функция создания контактов в меню добавления студентов
const createContact = function () {
  const contact = document.createElement('div');
  const select = document.createElement('select');
  const telOption = document.createElement('option');
  const secondTelOption = document.createElement('option');
  const mailOption = document.createElement('option');
  const vkOption = document.createElement('option');
  const fbOption = document.createElement('option');
  const input = document.createElement('input');
  const btnClose = document.createElement('button');

  contact.append(select, input, btnClose);

  contact.classList.add('contacts__contact');
  select.classList.add('contacts__select');
  telOption.classList.add('contacts__option', 'contacts__option--tel');
  secondTelOption.classList.add(
    'contacts__option',
    'contacts__option--secondtel'
  );
  mailOption.classList.add('contacts__option', 'ontacts__option--mail');
  vkOption.classList.add('contacts__option', 'contacts__option--fb');
  input.classList.add('contacts__input');
  btnClose.classList.add('contacts__btn');
  telOption.innerHTML = 'Телефон';
  secondTelOption.innerHTML = 'Доп.телефон';
  mailOption.innerHTML = 'Email';
  vkOption.innerHTML = 'VK';
  fbOption.innerHTML = 'Facebook';

  btnClose.type = 'button';

  select.append(telOption, secondTelOption, mailOption, vkOption, fbOption);
  return contact;
};

//Сбор информации о контактах студента
const createContactObj = function () {
  const arrMass = [];
  const selects = document.querySelectorAll('.contacts__select');
  selects.forEach((select) => {
    const parent = select.closest('.contacts__contact');
    let input = parent.querySelector('.contacts__input');
    arrMass.push({
      type: select.value,
      value: input.value,
    });
  });
  return arrMass;
};

// Функция для сбора данных из формы
const formData = function (form) {
  const name = form.name.value;
  const surname = form.surname.value;
  const lastName = form.lastname.value;
  const contacts = createContactObj();

  return { name, surname, lastName, contacts };
};

// Фукнция добавления студента на страничку
// Принимает эелементы: Форму с заполеннеыми данными, таблицу со студентами, модальное окно
const addStudentInTable = function (
  formEvent,
  studentList,
  modalOverlay,
  divContactContainer
) {
  const divErrorServer = errorsServer();

  formEvent.addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target;
    const divError = document?.querySelector('.student__div-error');
    const data = formData(formEvent);
    const studentData = await pathFunc(data);
    const errorMass = studentData.errors;
    const modal = modalOverlay.closest('.modal');
    if (errorMass) {
      errorMass.forEach((error) => {
        divErrorServer.innerHTML = error.message;
        target.lastChild.append(divErrorServer);
      });
      return;
    }
    divErrorServer.remove();
    const student = createStrStudents(studentData);
    studentList.append(student);
    formEvent.reset();
    modalClose(modalOverlay, modal, divContactContainer);
    divError.classList.remove('student__div-error_action');
  });
};

//Функция отвечающая за открытие определенного модального окна, в зависимости от выбора пользователя
const modalOpenChoose = function (
  createModalFunc,
  deleteModalFunc,
  createModalChangeFunc
) {
  main.addEventListener('click', (e) => {
    if (e.target.classList.contains('table-students__btn--addStudent')) {
      root.append(createModalFunc.modal);
      modalActionClose(
        createModalFunc.btnClose,
        createModalFunc.modalOverlay,
        createModalFunc.divContactContainer,
        createModalFunc.form
      );
    }
    if (e.target.classList.contains('table__btn-student--delete')) {
      root.append(deleteModalFunc.modalDelete);
      modalActionClose(deleteModalFunc.btnCancel, deleteModalFunc.modalOverlay);
    }
    if (e.target.classList.contains('table__btn-student--change')) {
      root.append(createModalChangeFunc.modal);
      modalActionClose(
        createModalChangeFunc.btnClose,
        createModalChangeFunc.modalOverlay,
        createModalChangeFunc.divContactContainer
      );
    }
  });
};

//Функция отвечающая за открытие и  закрытие модального окна
const modalActionClose = function (
  buttonClose = '',
  modalOverlay,
  contacts = '',
  form = ''
) {
  setTimeout(() => {
    modalOverlay.classList.add('modal__overlay--visible'), 500;
  });

  const openDeleteModal = function (e) {
    const target = e.target;
    if (target === modalOverlay || target === buttonClose) {
      modalOverlay.classList.remove('modal__overlay--visible');

      setTimeout(() => {
        const divError = document.querySelector('.modal__error-server');
        const modal = document?.querySelectorAll('.modal');
        modal.forEach((ev) => {
          ev.remove();
        });
        deleteContact(contacts);
        if (divError) {
          divError.remove();
        }
        if (form !== '') {
          const saveBtn = form.querySelector('.modal__btn--save');
          if ((saveBtn.dataset.data = 'addStudent')) {
            form.reset();
          }
        }
      }, 500);
    }
  };
  modalOverlay.addEventListener('click', openDeleteModal);
};

// Функция сортировки студента в таблице студентов
const sort = () => {
  const headRow = document.querySelector('.table-students__row');
  const buttons = headRow.querySelectorAll('.table-students__btn');

  function byFieldGrowth(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  function byFieldWane(field) {
    return (a, b) => (a[field] < b[field] ? 1 : -1);
  }

  headRow.addEventListener('click', async (el) => {
    const studentsMass = await requestFunc();
    const newMass = [];

    buttons.forEach((e) => e.classList.remove('table-students__btn--cliced'));

    if (el.target.classList.contains('table-students__btn')) {
      el.target.classList.add('table-students__btn--cliced');
    }
    if (el.target.classList.contains('table-students__btn--id')) {
      studentsMass.sort(byFieldGrowth('id'));
      createNewMassStudent(studentsMass, newMass);
      console.log(studentsMass, newMass);
    }
    if (el.target.classList.contains('table-students__btn--name')) {
      studentsMass.sort(byFieldGrowth('surname'));
      createNewMassStudent(studentsMass, newMass);
    }
    if (el.target.classList.contains('table-students__btn--date')) {
      studentsMass.sort(byFieldGrowth('createdAt'));
      createNewMassStudent(studentsMass, newMass);
    }
    if (el.target.classList.contains('table-students__btn--changeDate')) {
      studentsMass.sort(byFieldGrowth('updatedAt'));
      createNewMassStudent(studentsMass, newMass);
    }
  });
};

//Фукнция создания нового массива на основании полученного массива
const createNewMassStudent = (studentMass = [], sortStudentsMass = []) => {
  const tbody = document.querySelector('.table-students__tbody');
  tbody.textContent = '';

  // eslint-disable-next-line no-shadow
  studentMass.forEach((elemMass) => {
    sortStudentsMass.push(elemMass);
  });

  sortStudentsMass.forEach((elem) => {
    let stundent = createStrStudents(elem);
    tbody.append(stundent);
  });
};

// Функция отвечающая за поиск студентов в базе данных
const searchStudent = async (inputSearch, tBody, divNotFound) => {
  let targetValue;
  let interval = 0;
  inputSearch.addEventListener('input', async (e) => {
    targetValue = e.target.value.trim();

    clearInterval(interval);
    interval = setTimeout(async function () {
      let request = await requestSearch(targetValue);
      tBody.innerHTML = '';

      if (request.length === 0) {
        divNotFound.classList.add('student__div-error_action');
      }
      request.forEach((e) => {
        let stundent = createStrStudents(e);
        tBody.append(stundent);
        divNotFound.classList.remove('student__div-error_action');
      });
    }, 1000);
  });
};

// Функция отвечающая за создание строки, в случае если студенты не найдены
const strNotFound = function () {
  const str = document.createElement('div');
  str.classList.add('student__div-error');
  str.innerHTML = 'Students not found';
  return str;
};

//Функция создания модального окна удаления студента
const createModalDeleteStudent = function () {
  const modalDelete = document.createElement('div');
  const modalOverlay = document.createElement('div');
  const modalContainer = document.createElement('div');
  const h2 = document.createElement('h2');
  const text = document.createElement('p');
  const btnDelete = document.createElement('button');
  const btnCancel = document.createElement('button');

  h2.innerHTML = 'Удалить студента';
  text.innerHTML = 'Вы действительно хотите удалить данного клиента?';
  btnDelete.innerHTML = 'Удалить';
  btnCancel.innerHTML = 'Отменить';

  modalDelete.classList.add('modal');
  modalOverlay.classList.add('modal__overlay', 'modal__overlay--delete');
  modalContainer.classList.add('modal__container');
  h2.classList.add('modal__title', 'modal__title--delete');
  text.classList.add('modal__descr');
  btnDelete.classList.add('modal__btn', 'modal__btn--delete');
  btnCancel.classList.add('modal__btn--cancel');

  modalDelete.append(modalOverlay);
  modalOverlay.append(modalContainer);
  modalContainer.append(h2, text, btnDelete, btnCancel);
  return { btnDelete, btnCancel, modalDelete, modalOverlay };
};

// Функция отвечающая за удаление студентов из таблицы
// Принимает параметры tbody кнопку удаления и контейнер модального окна
const deleteStudentFunc = function (tBody, btnDelete, modalOverlay, id = '') {
  let target = null;

  const handlerDelete = async (e) => {
    const notFound = document.querySelector('.student__div-error');
    let parentTarget = target.parentNode;
    id = target.dataset.id;

    modalClose(modalOverlay, e.target.closest('.modal'));
    await deleteFunc(id);
    parentTarget.closest('.table__row-student').remove();
    if (tBody.childNodes.length === 0) {
      notFound.classList.add('student__div-error_action');
    }
  };
  tBody.addEventListener('click', (e) => {
    target = e.target;
    if (target.closest('.table__btn-student')) {
      btnDelete.addEventListener('click', handlerDelete);
    }
  });
};

const deleteContact = function (contacts) {
  if (contacts === undefined || contacts === '') {
    return;
  }
  setTimeout(() => {
    contacts.innerHTML = '';
    contacts.classList.remove('contacts--flex');
  }, 500);
};

//Функция для создания модального окна в случае успешного добавления студента
const modalClose = function (modalOverlay, modals, contacts) {
  modalOverlay.classList.remove('modal__overlay--visible');
  deleteContact(contacts);
  setTimeout(() => {
    modals.remove();
  }, 500);
};

//Функция создания модльного окна для изменения студента
const createModalChangeStudent = function () {
  const modal = document.createElement('div');
  const modalOverlay = document.createElement('div');
  const modalContainer = document.createElement('div');
  const title = document.createElement('h1');
  const divTitleContainer = document.createElement('div');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputSureName = document.createElement('input');
  const inputLastName = document.createElement('input');
  const divContactContainer = document.createElement('div');
  const btnAddContact = document.createElement('button');
  const divBtnContainer = document.createElement('div');
  const btnSave = document.createElement('button');
  const btnDelete = document.createElement('button');
  const btnClose = document.createElement('button');
  const modalId = document.createElement('div');

  modal.classList.add('modal');
  modalOverlay.classList.add('modal__overlay');
  modalContainer.classList.add('modal__container');
  modalId.classList.add('modal__id');
  divTitleContainer.classList.add('modal__title-container');
  title.classList.add('modal__title');
  form.classList.add('modal__form', 'modal__form--change');
  inputName.classList.add('modal__input', 'modal__input--name');
  inputSureName.classList.add('modal__input', 'modal__input--surename');
  inputLastName.classList.add('modal__input', 'modal__input--lastname');
  divContactContainer.classList.add('contacts');
  btnAddContact.classList.add('modal__add-btn-student');
  divBtnContainer.classList.add('modal__btn-container');
  btnSave.classList.add('modal__btn', 'modal__btn--save');
  btnDelete.classList.add('modal__btn', 'modal__btn--delete-change');
  btnClose.classList.add('modal__btn', 'modal__btn--close');

  title.innerHTML = 'Изменить данные';
  inputSureName.placeholder = 'Фамилия';
  inputName.placeholder = 'Имя';
  inputLastName.placeholder = 'Отчество';
  btnAddContact.innerHTML = 'Добавить контакт';
  btnSave.innerHTML = 'Сохранить';
  btnDelete.innerHTML = 'Удалить контакт';
  inputName.name = 'name';
  inputSureName.name = 'surname';
  inputLastName.name = 'lastname';
  btnSave.name = 'btnAdd';
  btnSave.dataset.data = 'btnChange';
  btnDelete.name = 'btnDelete';

  btnAddContact.type = 'button';
  btnClose.type = 'button';
  btnDelete.type = 'button';
  modal.append(modalOverlay);
  modalOverlay.append(modalContainer);
  modalChangesAction(form);

  divTitleContainer.append(title, modalId);
  modalContainer.append(divTitleContainer, form, divBtnContainer, btnClose);
  divBtnContainer.append(btnSave, btnDelete);
  form.append(
    inputSureName,
    inputName,
    inputLastName,
    divContactContainer,
    btnAddContact,
    divBtnContainer
  );
  return {
    modal,
    btnClose,
    btnDelete,
    modalOverlay,
    form,
    btnSave,
    modalId,
    divContactContainer,
  };
};

//Фукнция отвечающая за сбор информации и строки студена и добавления ее в модальное окно для изменения
const changeStudentFunc = async function (
  elem,
  form,
  modalId,
  divContactContainer
) {
  const row = elem.closest('.table__row-student');
  const idStudent = row.querySelector('.table__td--id');
  const fullName = row.querySelector('.table__td--fullName');
  const contactContainers = row.querySelector('.table__td--contact');
  const dateChange = row.querySelector('.table__td--changeDate');
  const timeChange = row.querySelector('.table__td--changeDate > span');
  const fullID = idStudent.dataset.id;
  const student = await getFunc(fullID);
  modalId.innerHTML = fullID.slice(7);

  const dateNow = new Date();
  let dateYear = addZero(dateNow.getFullYear());
  let dateMounth = addZero(dateNow.getMonth() + 1);
  let dateDay = addZero(dateNow.getDate());
  let dateHours = addZero(dateNow.getHours());
  let dateMinute = addZero(dateNow.getMinutes());
  timeChange.innerHTML = `${dateHours}:${dateMinute}`;
  dateChange.innerHTML = `${dateDay}:${dateMounth}:${dateYear}`;
  dateChange.append(timeChange);

  form.surname.value = student.surname;
  form.name.value = student.name;
  form.lastname.value = student.lastName;

  divContactContainer.innerHTML = '';

  student.contacts.forEach(function (obj) {
    const massContact = [];
    if (massContact.length === 0) {
      divContactContainer.classList.remove('contacts--flex');
    }
    const contact = createContact();
    massContact.push(contact);
    divContactContainer.classList.add('contacts--flex');
    divContactContainer.append(contact);
    massContact.forEach((e) => {
      const select = e.querySelector('.contacts__select');
      const input = e.querySelector('.contacts__input');
      select.value = obj.type;
      input.value = obj.value;
    });
  });
  //  deleteStudentInChangeModal(
  //   form,
  //   tBody,
  //   fullID,
  //   modalDeleteFunc,
  //   contactsContainer
  // );
  return { fullID, fullName, contactContainers };
};

// Функция отвечающая за сохранение изменений на странице и отправку изменений в базу данных
const addStudentAfterChange = function (
  form,
  tBody,
  modal,
  modalOverlay,
  divContactContainer,
  modalDeleteFunc,
  modalId
) {
  let studenInfo = {};
  let studentStr = {};
  tBody.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.classList.contains('table__btn-student--change')) {
      studentStr.str = target.closest('.table__row-student');
      const changeStudent = await changeStudentFunc(
        target,
        form,
        modalId,
        divContactContainer
      );
      studenInfo.id = changeStudent.fullID;
      studenInfo.fullName = changeStudent.fullName;
      studenInfo.contactContainers = changeStudent.contactContainers;
    }
  });

  form.addEventListener('click', (event) => {
    const targetForm = event.target;
    if (targetForm.classList.contains('modal__btn--delete-change')) {
      deleteStudentInChangeModal(
        modalDeleteFunc,
        divContactContainer,
        studenInfo.id,
        tBody,
        modalOverlay,
        studentStr.str
      );
    }
  });

  const divError = errorsServer();

  const sendDate = async function (eve) {
    eve.preventDefault();
    const target = eve.target;
    const contacts = document.querySelector('.contacts');
    const newData = formData(form);
    const patch = await patchFunc(studenInfo.id, newData);
    const errorMass = patch.errors;
    if (errorMass) {
      errorMass.forEach((error) => {
        divError.innerHTML = error.message;
        target.lastChild.append(divError);
      });
      return;
    }

    studenInfo.fullName.innerHTML = `${patch.surname} ${patch.name} ${patch.lastName}`;

    studenInfo.contactContainers.innerHTML = '';
    patch.contacts.forEach(function (contact) {
      const imgContacts = createImgContact(contact.type, contact.value);
      studenInfo.contactContainers.append(imgContacts.href);
    });
    modalClose(modalOverlay, modal, contacts);
  };
  form.addEventListener('submit', sendDate);
};

const errorsServer = function () {
  const divError = document.createElement('div');
  divError.classList.add('modal__error-server');

  return divError;
};

const deleteStudentInChangeModal = function (
  modalDeleteFunc,
  divContactContainer,
  fullID,
  tBody,
  modalOverlay,
  studentStr
) {
  console.log(fullID);
  const modal = modalDeleteFunc.modalDelete;

  //"Одинаковые модалки modalOverlay и parentOverlay"

  modalOverlay.classList.remove('modal__overlay--visible');
  modal.classList.add('model__delete-window');
  const modalOverlayV = modal.querySelector('.modal__overlay');
  modalOverlayV.classList.add('modal__overlay--visible');
  root.append(modalDeleteFunc.modalDelete);
  console.log(modalOverlayV);

  const deleteStudentInModal = async function (event) {
    const targetModal = event.target;
    const notFound = document.querySelector('.student__div-error');

    if (targetModal.classList.contains('modal__btn--cancel')) {
      modalOverlayV.classList.remove('modal__overlay--visible');
      modalOverlay.classList.add('modal__overlay--visible');
    }

    if (targetModal.classList.contains('modal__overlay')) {
      modalOverlayV.classList.remove('modal__overlay--visible');
      modalOverlay.classList.remove('modal__overlay--visible');
    }

    if (targetModal.classList.contains('modal__btn--delete')) {
      await deleteFunc(fullID);
      studentStr.remove();
      modalOverlayV.classList.remove('modal__overlay--visible');
      const modal = targetModal.closest('.model__delete-window');
      targetModal.closest('.modal').remove();

      modal.removeEventListener('click', deleteStudentInModal);
      modalClose(modalOverlayV, modal, divContactContainer);
      if (tBody.childNodes.length === 0) {
        notFound.classList.add('student__div-error_action');
      }
    }
  };

  modal.addEventListener('click', deleteStudentInModal);
};

//Функция отвечающая за сброс формы ,создания пустого поля контакты, а так же удаления поля контакты
const modalChangesAction = function (form) {
  form.addEventListener('click', (event) => {
    const target = event.target;
    const contactContainer = form.querySelector('.contacts');

    if (target.classList.contains('modal__btn--cancel')) {
      form.reset();
    }
    if (target.classList.contains('modal__add-btn-student')) {
      const contacts = createContact();
      contactContainer.append(contacts);
      contactContainer.classList.add('contacts--flex');
    }
    if (target.classList.contains('contacts__btn')) {
      target.parentElement.remove();
      console.log();
      if (contactContainer.innerHTML === '') {
        contactContainer.classList.remove('contacts--flex');
      }
    }
  });
};

// const customizationSelect = function(elem) {
//   const choices = new Choices(elem, {
//     searchEnabled: false,
//   })
// }

// Функция создания приложения
const createApp = function () {
  const createHeadFunc = createHead();
  const createMainFunc = createMain();
  getStudentInBase(createMainFunc.tBody);
  const createModalFunc = createModalAddStudent();
  const modalDeleteFunc = createModalDeleteStudent();
  const createModalChangeFunc = createModalChangeStudent();
  const noFoundElem = strNotFound();

  modalOpenChoose(createModalFunc, modalDeleteFunc, createModalChangeFunc);
  createMainFunc.table.insertAdjacentElement('afterEnd', noFoundElem);

  addStudentInTable(
    createModalFunc.form,
    createMainFunc.tBody,
    createModalFunc.modalOverlay,
    createModalFunc.divContactContainer
  );
  deleteStudentFunc(
    createMainFunc.tBody,
    modalDeleteFunc.btnDelete,
    modalDeleteFunc.modalOverlay
  );

  addStudentAfterChange(
    createModalChangeFunc.form,
    createMainFunc.tBody,
    createModalChangeFunc.modal,
    createModalChangeFunc.modalOverlay,
    createModalChangeFunc.divContactContainer,
    modalDeleteFunc,
    createModalChangeFunc.modalId
  );

  sort();
  searchStudent(createHeadFunc.inputSearch, createMainFunc.tBody, noFoundElem);
};

const animationLoad = function () {
  const divContainer = document.createElement('div');
  divContainer.classList.add('spinner');
  return divContainer;
};

document.addEventListener('DOMContentLoaded', () => {
  createApp();
});
