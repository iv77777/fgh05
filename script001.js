// Кількість значеній яку рендерить
let quantityRenderValue = 200;
// З якого року буде стартувати календарь
const yearStart = 2022;

const writeInput = document.querySelectorAll('.writeInput_js');
const buttonColorJs = document.querySelector('#button-color_js');
const inputColor = document.querySelectorAll('.inputColor_js');

const input1Js = document.querySelector('#input-1_js');
const input2Js = document.querySelector('#input-2_js');
const input3Js = document.querySelector('#input-3_js');
const input4Js = document.querySelector('#input-4_js');
const input5Js = document.querySelector('#input-5_js');
const input6Js = document.querySelector('#input-6_js');
const input7Js = document.querySelector('#input-7_js');

const renderDey = document.querySelector('.renderDey_js');

const popup = document.querySelector('.popup_js');
const valuesLength = document.querySelector('.values-length_js');
const popupTableWrapper = document.querySelector('.popup__table-wrapper_js');
const popupTop = document.querySelector('.popup__top_js');
const popupTable = document.querySelector('.popup__table_js');
const sortValue = document.querySelector('.sort__value_js');
const miniPopup = document.querySelector('.mini-popup_js');
const selectButton = document.querySelector('.select__button_js');
const popupReverse = document.querySelector('.popup__reverse_js');
const calendarBtn = document.querySelector('.calendar__btn_js');

const popupDey = document.querySelector('.popupDey_js');
const popupRenderDey = document.querySelector('.popupRenderDey_js');

const popupButtonUp = document.querySelector('.popupButtonUp_js');
const calendarMonthWrapper = document.querySelector('.calendar__month-wrapper_js');
const calendarPopap = document.querySelector('.calendar-popap_js');
const popupDeySortBtn = document.querySelectorAll('.popupDey__sort-btn_js');

const fon = document.querySelector('.fon_js');

const popupTableLength = document.querySelector('.popup__table-length_js');
const popupTableLengthAll = document.querySelector('.popup__table-length-all_js');
const popupTableAddBtn = document.querySelector('.popup__table-add-btn_js');

const calendarYear = document.querySelector('.calendar__year_js');

// ключи
const keyActiveColor = 'fgh-activeColor';
const inputValue = 'fgh-inputValue';
const oneInputValue = 'fgh-oneInputValue';

// Польот значений
const audioFly = new Audio('mp3/flight.mp3');
audioFly.currentTime = 0;

// клик по клавиатури
const audioClick = new Audio('mp3/click.mp3');
audioClick.currentTime = 0;

// <<<<<<<<<<<<<<<<<<<<<<<<<<< календарь >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Рендерить навігацію років в календарь
function renderCalendarYear(renderHtmlElement, calendarYearStart = yearStart) {
  renderHtmlElement.innerHTML = '';
  let date = new Date();

  for (let index = calendarYearStart; index <= date.getFullYear(); index++) {
    let activeClass = '';
    if (index === date.getFullYear()) {
      activeClass = 'active';
    }
    let yearHtml = `
      <button class="calendar__year-btn  ${activeClass} calendar__year-btn_js" data-year="${index}">${index}</button>
    `;
    renderHtmlElement.insertAdjacentHTML('beforeend', yearHtml);
  }

  setTimeout(() => {
    showsСalendar('.calendar__year-btn_js');
  }, 10);
}

// В календарі при кліку на рік рендерить цей рік і міняє активний рік
function showsСalendar(elementClass) {
  const calendarYearBtns = document.querySelectorAll(elementClass);

  calendarYearBtns.forEach((element1) => {
    element1.addEventListener('click', () => {
      calendarYearBtns.forEach((element2) => {
        element2.classList.remove('active');
      });
      element1.classList.add('active');

      // создает календарь переданого года и рендерит в переданный html елемент
      createCalendar(element1.dataset.year, calendarMonthWrapper, false);
    });
  });
}
// создает календарь переданого года и рендерит в переданный html елемент
function createCalendar(createYear, elementHtml, resetRenderCalendarYear = true) {
  // рендерить навігацію років тільки при загрузці сторінки
  if (resetRenderCalendarYear) {
    renderCalendarYear(calendarYear);
  }
  let year = Number(createYear); // год
  let month = 0; //Месяц (от 0 до 11)
  let dayWeek; // день нидели в котором начинается месяц 0- ето воскресения (Недiля)
  let monthDeyLength; //количество дней в месяце

  // Очещаем елемент на html странице куда будум рендерити
  elementHtml.innerHTML = '';

  for (let i = 0; i < 12; i++) {
    // Рендерит месяц в elementHtml
    renderCalendar(elementHtml);
    month++;
  }
  // создает дату
  function createDate(year, month, dey) {
    let date = new Date(year, month, dey); //(год  / месяц от 0 до 11 / число)
    return date;
  }
  // выщитует количество дней в месяце
  function calculateDatesMonth(year, month) {
    let date1 = createDate(year, month, 1); //(год / месяц от 0 до 11 / число)
    let date2 = createDate(year, month + 1, 1); //(год  / месяц от 0 до 11 / число)
    let date3 = Math.round((date2 - date1) / 1000 / 3600 / 24); //вищитуем количестао дней
    return date3;
  }
  // получаем день нидели в котором начинается месяц
  function getDayhWeek(year, month) {
    let date = createDate(year, month, 1);
    let dayWeek = date.getDay();
    return dayWeek;
  }
  // Рендерит месяц
  function renderCalendar(htmlElement) {
    const months = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ];

    // ------------------------------------------
    let calendarMonthInner = document.createElement('div');
    calendarMonthInner.className = 'calendar__month-inner calendar__month-inner_js';
    let calendarMonthName = document.createElement('div');
    calendarMonthName.className = 'calendar__month-name';
    calendarMonthName.innerHTML = months[month] + ' ' + year;
    calendarMonthInner.insertAdjacentElement('afterbegin', calendarMonthName);

    let calendarList = document.createElement('ul');
    calendarList.className = 'calendar__list';
    // -------------------------------------------

    //получаем количество дней в месяце
    monthDeyLength = calculateDatesMonth(year, month);
    // получаем день нидели в котором начинается месяц
    dayWeek = getDayhWeek(year, month);

    if (dayWeek == 0) {
      for (let i = 0; i < 6; i++) {
        const calendarDey = `
      <li class="calendar__dey color-non"></li>
    `;
        calendarList.insertAdjacentHTML('beforeend', calendarDey);
      }
    } else {
      for (let i = 0; i < dayWeek - 1; i++) {
        const calendarDey = `
      <li class="calendar__dey color-non"></li>
    `;
        calendarList.insertAdjacentHTML('beforeend', calendarDey);
      }
    }

    for (let i = 1; i < monthDeyLength + 1; i++) {
      let className = '';
      if (checkAvailabilityValueInLocalStorage(year, month + 1, i)) {
        className = '_active';
      }
      const calendarDey = `
      <li class="calendar__dey calendar__dey_js ${className}" data-numberday="${i}" data-month="${month}" data-year="${year}">
         ${i}
      </li>
    `;
      calendarList.insertAdjacentHTML('beforeend', calendarDey);
    }
    calendarMonthInner.insertAdjacentElement('beforeend', calendarList);
    htmlElement.append(calendarMonthInner);
  }
  document.querySelector('.calendar__btn_js').classList.remove('timout');
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<< календарь >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<< function >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// якщо в LocalStorage є обєк з такою датою то верне true якщо нема то false
function checkAvailabilityValueInLocalStorage(year, month, day) {
  let arrayValue = getLocalStorage(oneInputValue, false);
  if (arrayValue) {
    for (let index = 0; index < arrayValue.length; index++) {
      if (year === arrayValue[index].year) {
        if (month === arrayValue[index].month) {
          if (day === arrayValue[index].numberDeta) {
            return true;
          }
        }
      }
    }
  }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<< function >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Уберает активный цвет input
function removeActiveColor() {
  inputColor.forEach((item) => {
    item.classList.remove('_active-color');
    if (item.classList.contains('background__acent-2')) {
      item.dataset.background = '#b83ce6';
    }
    if (item.classList.contains('background__acent-1')) {
      item.dataset.background = '#ffeb3b';
    }
  });
}
// устанавлюваем активный цвет input
function addActiveColor() {
  inputColor.forEach((item) => {
    item.classList.add('_active-color');
    if (item.classList.contains('background__acent-2')) {
      item.dataset.background = '#ffeb3b';
    }
    if (item.classList.contains('background__acent-1')) {
      item.dataset.background = '#b83ce6';
    }
  });
}

// прощытует инпуты
function input1JsInput2Js() {
  if (input1Js.value > 0 && input2Js.value > 0) {
    input4Js.value = input1Js.value * input2Js.value * input3Js.value;

    if (input5Js.value > 0) {
      input7Js.value = ((input4Js.value / input5Js.value) * input6Js.value).toFixed(2);
    } else {
      input7Js.value = '';
    }
  } else {
    input4Js.value = '';
    input7Js.value = '';
  }
}

// Уберает вивраный для записи инпут
function removeSelectInput() {
  writeInput.forEach((item) => {
    item.classList.remove('writeNumber_js');
  });
}

// Встанавлювает input для записи чисел
function selectInput(element) {
  // Уберает вивраный для записи инпут
  removeSelectInput();
  // делает переданный елемент выбранный
  element.classList.add('writeNumber_js');

  // изменяет цвет кнопок клавиатуры
  changeBgNumbers(element.dataset.background);

  if (element.id == 'input-1_js') {
    // изменяет цвет бордера клавиатуры на цвет поля input7Js
    changeBorderInput7Js();
  } else {
    // изменяет цвет бордера клавиатуры на переданный цвет
    changeBorder(element.dataset.background);
  }
}

// Добавляет число в input
function writeNumber(number) {
  writeInput.forEach((item) => {
    if (item.classList.contains('writeNumber_js')) {
      if (!isNaN(item.value + number)) {
        let numberValue = item.value + number;
        item.value = numberValue;
      }
    }
  });
}

// Удаляет число с инпута
function numberDelete() {
  writeInput.forEach((item) => {
    if (item.classList.contains('writeNumber_js')) {
      let inputValue = item.value.slice(0, -1);
      item.value = inputValue;
    }
  });
}

// запускает аудио
function audioPlay(audio) {
  audio.play();
}

//добавляет обект objectValue в LocalStorage по ключу keyName
function postLocalStorage(keyName, object) {
  // переобразовуем масив value в строку и записываем в valueText
  let objectText = JSON.stringify(object);
  // добавляем valueText в localStorage
  localStorage.setItem(keyName, objectText);
}

// Получает обект з LocalStorage (если localStorage пустой то возвращам пустой обект)
function getLocalStorage(keyName, obgect = true) {
  // Получает обект з LocalStorage
  const objectLocalStorage = localStorage.getItem(keyName);
  if (objectLocalStorage !== null) {
    //переобразовуем из строки в обект и возвращаем
    return JSON.parse(objectLocalStorage);
  }

  // если localStorage пустой то возвращам пустой обект или масив
  if (obgect) {
    return {};
  } else {
    return [];
  }
}

// Проверает чы обект пустой
function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return true;
  }
  return false;
}

// получаем значения всех инпутов и создаем с ними обект
function getValueInput() {
  let objectValue = {};
  writeInput.forEach((item) => {
    if (item.id == 'input-1_js') {
      objectValue.input1Js = item.value;
    }
    if (item.id == 'input-2_js') {
      objectValue.input2Js = item.value;
    }
    if (item.id == 'input-5_js') {
      objectValue.input5Js = item.value;
    }
  });
  return objectValue;
}

// изменяет цвет бордера клавиатуры на цвет поля input7Js
function changeBorderInput7Js() {
  const numbersList = document.querySelector('.numbers__list_js');
  const colorBorder = input7Js.dataset.background;
  numbersList.style.border = `solid 2px ${colorBorder}`;
}

// изменяет цвет бордера клавиатуры на переданный цвет
function changeBorder(colorBorder) {
  const numbersList = document.querySelector('.numbers__list_js');
  numbersList.style.border = `solid 2px ${colorBorder}`;
}

// изменяет цвет клавиатуры
function changeBgNumbers(color) {
  const numbers = document.querySelectorAll('.number_js');
  const numberDelete = document.querySelector('.number__delete_js');
  numbers.forEach((item) => {
    item.style.backgroundColor = color;
  });
  numberDelete.style.backgroundColor = color;
}

function removeClassAllTimeout(className, timeout) {
  const allClass = document.querySelectorAll(className);
  setTimeout(() => {
    allClass.forEach((element) => {
      element.classList.remove('_teblepopup-active');
    });
  }, timeout);
}

function addRenderValuePopup(arrayValue, indexStart = 0, indexAnd = quantityRenderValue) {
  arrayValue.reverse();
  popupTableLengthAll.innerHTML = arrayValue.length;
  if (arrayValue.length >= indexAnd + quantityRenderValue) {
    popupTableAddBtn.innerHTML = '+' + quantityRenderValue;
  } else {
    if (arrayValue.length > indexAnd) {
      popupTableAddBtn.innerHTML = '+' + (arrayValue.length - indexAnd);
    } else {
      popupTableAddBtn.innerHTML = '+' + 0;
    }
  }
  for (let index = indexStart; index < arrayValue.length; index++) {
    if (index >= indexAnd) {
      break;
    }
    popupTableLength.innerHTML = Number(popupTableLength.innerHTML) + 1;
    // рендерит етот обект в попап
    renderValuePopup(arrayValue[index]);
  }
  removeClassAllTimeout('._teblepopup-active', 1000);
}

popupTableAddBtn.addEventListener('click', () => {
  const arrayValue = getLocalStorage(oneInputValue, false);
  const startIndex = Number(popupTableLength.innerHTML);
  addRenderValuePopup(arrayValue, startIndex, startIndex + quantityRenderValue);
});

// рендерит переданный обект в кінець попапа
function renderValuePopup(arrayValue) {
  if (!arrayValue.value1) {
    arrayValue.value1 = '';
  }

  let valueHtml = `
     <tr class="popup__table-tr_js _teblepopup _teblepopup-active ${arrayValue.numberDeta}-${
    arrayValue.month - 1
  }-${arrayValue.year}" id="${arrayValue.miliseconds}">
        <td class="td__date">${arrayValue.date}</td>
        <td class="${arrayValue.background2} td__value">${arrayValue.value1}</td>
        <td class="${arrayValue.background} td__value">${arrayValue.value}</td>
      </tr>
  `;
  popupTable.insertAdjacentHTML('beforeend', valueHtml);
}
// иметирует польот значения до иконки
function addValue(resultValue, backgroundColor) {
  // клонируем результат на html странице
  const resultValueKlone = resultValue.cloneNode(true);
  //resultValueKloneTop присваюваем позицею с верху
  const resultValueKloneTop = resultValue.getBoundingClientRect().top;
  //resultValueKloneLeft присваюваем позицею с лева
  const resultValueKloneLeft = resultValue.getBoundingClientRect().left;

  const resultValueKloneСlientWidth = resultValue.clientWidth;

  // добавляем клону классы _flyValue
  resultValueKlone.setAttribute('class', '_flyValue');

  let color = backgroundColor;

  // задаем позицею значению на странице
  resultValueKlone.style.cssText = `
      left:${resultValueKloneLeft}px;
      top:${resultValueKloneTop}px;
      width: ${resultValueKloneСlientWidth}px;
      height: 60px;
      background-color: ${color};
    `;

  // Выводим етот документ в самый конец боди
  document.body.append(resultValueKlone);

  const buttonStorageInner = document.querySelector('#button-storage__inner_js');

  // получаем коорденаты папки
  const folderjsFlyLeft = buttonStorageInner.getBoundingClientRect().left + 7;
  const folderjsFlyTop = buttonStorageInner.getBoundingClientRect().top + 20;

  // задаем клону позицею куда перемиститца на странице
  resultValueKlone.style.cssText = `
      left:${folderjsFlyLeft}px;
      top:${folderjsFlyTop}px;
      height: 15px;
      width: 35px;
      font-size: 10px;
      background-color: ${color};
      transition: all .5s;
    `;

  // когда клон долитит до папки
  resultValueKlone.addEventListener('transitionend', function () {
    resultValueKlone.remove();
  });
}

// иметирует польот значения до иконки удалить  в попапе 2
function FlyremoveValue(resultValue) {
  //присваюваем позицею с верху
  const resultValueKloneTop = resultValue.getBoundingClientRect().top;
  //присваюваем коорденаты с лева
  const resultValueKloneLeft = 8;

  // добавляем клону классы _flyValue
  resultValue.setAttribute('class', '_flyValueTr');

  // width: ${ resultValueKloneСlientWidth } px;
  // задаем позицею значению на странице
  resultValue.style.cssText = `
      left:${resultValueKloneLeft}px;
      top:${resultValueKloneTop}px;
      transform: scale(1);
  `;

  let resultValueClientWidth = resultValue.clientWidth;

  // коорденаты с лева
  const folderjsFlyLeft = -(resultValueClientWidth / 2 - 30);
  // коорденаты с верху
  const folderjsFlyTop = 5;

  // задаем клону позицею куда перемиститца на странице
  setTimeout(() => {
    resultValue.style.cssText = `
      left:${folderjsFlyLeft}px;
      top:${folderjsFlyTop}px;
      transform: scale(0.1);
      transition: all .8s;
    `;
  }, 10);

  // когда клон долитит до папки
  resultValue.addEventListener('transitionend', function () {
    resultValue.remove();
    const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
    valuesLength.innerText = popupTableTrAll.length;
  });
}

//показует скрывает miniPopup
function addRemoveMiniPopup(e) {
  miniPopup.classList.add('_active');
  const miniPopupСlientWidth = miniPopup.clientWidth;
  // присваюваем позицею с верху
  const eTargetTop = e.pageY - 90;
  // присваюваем позицею с лева
  let eTargetLeft = e.pageX - miniPopupСlientWidth - 30;

  if (eTargetLeft < miniPopupСlientWidth) {
    eTargetLeft = 8;
  }
  miniPopup.style.cssText = `
           top: ${eTargetTop}px;
           left: ${eTargetLeft}px;
        `;

  setTimeout(() => {
    miniPopup.classList.remove('_active');
  }, 700);
}

function resetMiniPopup() {
  miniPopup.textContent = 0;
}

// удаляет стрелку пролистования вверх у попапах
function removeArrowTop() {
  popupButtonUp.classList.remove('_active');
}
// в попапе popupTable если нужно то показует или удаляет стрелку пролистувания вверх
function arrowAddRemove1() {
  if (popupTable.getBoundingClientRect().top < popupTop.offsetHeight - 3) {
    if (!popupButtonUp.classList.contains('_active')) {
      popupButtonUp.classList.add('_active');
    }
  } else {
    if (popupButtonUp.classList.contains('_active')) {
      popupButtonUp.classList.remove('_active');
    }
  }
}
// в попапе popupRenderDey если нужно то показует или удаляет стрелку пролистувания вверх
function arrowAddRemove2() {
  if (popupRenderDey.getBoundingClientRect().top < 55) {
    if (!popupButtonUp.classList.contains('_active')) {
      popupButtonUp.classList.add('_active');
    }
  } else {
    if (popupButtonUp.classList.contains('_active')) {
      popupButtonUp.classList.remove('_active');
    }
  }
}
function popupDeySortC(arrayElements, htmlElement, average) {
  let arrayObgects = [];
  arrayElements.forEach((item) => {
    arrayObgects.push({
      [average]: item.dataset[average],
      item: item,
    });
  });
  // больше
  arrayObgects.sort(function (a, b) {
    return b[average] - a[average];
  });
  arrayObgects.forEach((item) => {
    htmlElement.insertAdjacentElement('beforeend', item.item);
  });
}
// находити все елементы на странице по "classElemetAll" и добавляет к ним класс "addClass"
function addClassAll(classElemetAll, addClass) {
  document.querySelectorAll(classElemetAll).forEach((item) => {
    item.classList.add(addClass);
  });
}
// находити все елементы на странице по "classElemetAll" и удаляет у них класс "removeClass"
function removeClassAll(classElemetAll, removeClass) {
  document.querySelectorAll(classElemetAll).forEach((item) => {
    item.classList.remove(removeClass);
  });
}
// У всех елементов масива "popupDeySortBtn" удаляет класс "className"
function removeAllClass(popupDeySortBtn, className) {
  popupDeySortBtn.forEach((item) => {
    item.classList.remove(className);
  });
}
// <<<<<<<<<<<<<<<< // function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// =================== при загрузке странице =============================
// Подставляем цвета с LocalStorage
const colorDD = getLocalStorage(keyActiveColor);
if (colorDD !== null) {
  if (colorDD.color) {
    buttonColorJs.classList.add('_active-color');
    addActiveColor();
    changeBgNumbers('#ffeb3b');
    changeBorder('#ffeb3b');
  } else {
    buttonColorJs.classList.remove('_active-color');
    removeActiveColor();
  }
}

// подставляем значения инпутов из LocalStorage
const objectLocalStorage = getLocalStorage(inputValue);
if (isEmpty(objectLocalStorage)) {
  if (objectLocalStorage.input1Js > 0) {
    input1Js.value = objectLocalStorage.input1Js;
  }
  if (objectLocalStorage.input2Js > 0) {
    input2Js.value = objectLocalStorage.input2Js;
  }
  if (objectLocalStorage.input5Js > 0) {
    input5Js.value = objectLocalStorage.input5Js;
  }

  input1JsInput2Js();
}

// =================== // при загрузке странице ========================

// <<<<<<<<<<<<<<<< при клике на странице >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener('click', (e) => {
  // при клики по клавиатупи
  if (e.target.closest('.number_js')) {
    // Добавляет число в input
    writeNumber(e.target.innerText);
    // прощытует инпуты
    input1JsInput2Js();

    const obgectValue = getValueInput();
    postLocalStorage(inputValue, obgectValue);

    // audioPlay(audioClick);
  }

  // при клики на input
  if (e.target.closest('.writeInput_js')) {
    // Встанавлювает етот input для записи чисел
    selectInput(e.target);
  }

  // при клики удалить на клавиатуре
  if (e.target.closest('.number__delete_js')) {
    // audioPlay(audioClick);
    // Удаляет число с инпута
    numberDelete();
    // прощытует инпуты
    input1JsInput2Js();

    const obgectValue = getValueInput();
    postLocalStorage(inputValue, obgectValue);
  }

  // пири клики по кнопке изминения цвета
  if (e.target.closest('#button-color_js')) {
    if (e.target.classList.contains('_active-color')) {
      // записуем в LocalStorage
      postLocalStorage(keyActiveColor, { color: false });
      // Уберает активный цвет у кнопки
      e.target.classList.remove('_active-color');

      // Уберает активный цвет input
      removeActiveColor();

      // Устанавлювает активный input1Js input
      selectInput(input1Js);
    } else {
      // записуем в LocalStorage
      postLocalStorage(keyActiveColor, { color: true });
      //устанавлюваем активный цвет у кнопки
      e.target.classList.add('_active-color');

      // устанавлюваем активный цвет input
      addActiveColor();

      // Устанавлювает активный input1Js input
      selectInput(input1Js);
    }
  }

  // при клики по кнопке делаем активный первый input
  if (e.target.closest('.buttons__one')) {
    // Встанавлювает input для записи чисел
    selectInput(input1Js);
    // изменяет цвет кнопок клавиатуры
    changeBgNumbers(input1Js.dataset.background);
    // изменяет цвет бордера клавиатуры на цвет поля input7Js
    changeBorderInput7Js();
  }

  // при клики по кнопке делаем активный второй или пятый input
  if (e.target.closest('.buttons__two')) {
    if (input2Js.classList.contains('writeNumber_js')) {
      // Встанавлювает input для записи чисел
      selectInput(input5Js);
      // изменяет цвет кнопок клавиатуры
      changeBgNumbers(input5Js.dataset.background);
      // изменяет цвет бордера клавиатуры на переданный цвет
      changeBorder(input5Js.dataset.background);
      return;
    }
    if (input5Js.classList.contains('writeNumber_js')) {
      // Встанавлювает input для записи чисел
      selectInput(input2Js);
      // изменяет цвет кнопок клавиатуры
      changeBgNumbers(input2Js.dataset.background);
      // изменяет цвет бордера клавиатуры на переданный цвет
      changeBorder(input2Js.dataset.background);
      return;
    }
    if (
      !input2Js.classList.contains('writeNumber_js') ||
      !input5Js.classList.contains('writeNumber_js')
    ) {
      // Встанавлювает input для записи чисел
      selectInput(input2Js);
      // изменяет цвет кнопок клавиатуры
      changeBgNumbers(input2Js.dataset.background);
      // изменяет цвет бордера клавиатуры на переданный цвет
      changeBorder(input2Js.dataset.background);
    }
  }

  //при клики показует попап
  if (e.target.closest('.buttons-img_js')) {
    popup.classList.add('_active');
    fon.classList.add('_active');
    popupTableLength.innerHTML = 0;
    // делает вибранным "самые новые"
    sortValue.options[0].selected = true;

    let arrayValue = getLocalStorage(oneInputValue, false);
    valuesLength.innerText = arrayValue.length;
    // сортировка самые новые
    arrayValue.sort(function (a, b) {
      return a.miliseconds - b.miliseconds;
    });
    popupTable.innerHTML = '';

    addRenderValuePopup(arrayValue);

    setTimeout(() => {
      arrowAddRemove1();
    }, 200);
  }

  // при клики скрывает попап
  if (e.target.closest('.popup__close_js')) {
    const popupTable2Html = document.querySelector('.popup__table2_js');
    if (popupTable2Html) {
      popupTable.width = '100%';
      popupTable2Html.remove();
    }
    popup.classList.remove('_active');
    fon.classList.remove('_active');
    selectButton.classList.remove('_active');
    popupReverse.classList.remove('_reverse');
    removeArrowTop();
  }

  // если кликнули по кнопке реверс в попапе
  if (e.target.closest('.popup__reverse_js')) {
    e.target.classList.add('_reverse');
    let arrayValue = getLocalStorage(oneInputValue, false);
    valuesLength.innerText = arrayValue.length;
    openSortPopup(arrayValue);
  }

  if (e.target.closest('.calendar__btn_js')) {
    e.target.closest('.calendar__btn_js').classList.add('timout');
    setTimeout(() => {
      calendarPopap.classList.add('_active');
      // створює календарь текущего року і рендерит в переданний html елемент
      let date = new Date();
      createCalendar(date.getFullYear(), calendarMonthWrapper);
    }, 1);
  }

  // при клики скрывает popupDey
  if (e.target.closest('.popupDey__close_js')) {
    document.querySelector('.popupDey__sort_js').classList.remove('_twoSort');
    removeAllClass(popupDeySortBtn, '_twoSortActive');
    document.querySelector('.popupDey__sortC_js').style.display = 'none';
    document.querySelector('.popupDey__sortM_js').style.display = 'none';
    popupDey.classList.remove('_active');
    popupReverse.classList.remove('_reverse');
    calendarBtn.innerHTML = 'По дате';
    // делает вибранным "самые новые"
    sortValue.options[0].selected = true;
    // сортируем попак от самих новых
    newValuePopup();
    popupRenderDey.innerHTML = '';
    arrowAddRemove1();
  }

  // при клики сохраняем данные
  if (e.target.closest('.buttons__save')) {
    // звук при польоти
    audioPlay(audioFly);
    // час в вашем текущем часовом поясе
    const date = new Date();

    let Minutes;
    // доставляем ноль если менше 10 минут
    if (date.getMinutes() < 10) {
      Minutes = '0' + date.getMinutes();
    } else {
      Minutes = date.getMinutes();
    }
    const hourse = date.getHours();
    const numberDeta = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const DATE1 = `${numberDeta}.${month}.${year}`;
    const DATE2 = `${hourse}:${Minutes}`;

    let saveObgect = {};

    saveObgect.hourse = hourse;
    saveObgect.numberDeta = numberDeta;
    saveObgect.month = month;
    saveObgect.year = year;
    saveObgect.Minutes = Minutes;
    saveObgect.miliseconds = Date.now();
    saveObgect.date = `${DATE1}, ${DATE2} `;
    saveObgect.value = input7Js.value;
    saveObgect.value1 = input1Js.value;
    saveObgect.value2 = input2Js.value;
    saveObgect.value3 = input5Js.value;

    let backgroundColor1;
    let backgroundColor2;

    if (input7Js.classList.contains('_active-color')) {
      saveObgect.background = 'background__acent-2';
      saveObgect.background2 = 'background__acent-1';
      backgroundColor1 = '#b83ce6';
      backgroundColor2 = '#ffeb3b';
    } else {
      saveObgect.background = 'background__acent-1';
      saveObgect.background2 = 'background__acent-2';
      backgroundColor1 = '#ffeb3b';
      backgroundColor2 = '#b83ce6';
    }

    let arrayValue = getLocalStorage(oneInputValue, false);
    arrayValue.push(saveObgect);
    postLocalStorage(oneInputValue, arrayValue);

    const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
    valuesLength.innerText = popupTableTrAll.length;

    // польот значения
    addValue(input7Js, backgroundColor1);
    addValue(input1Js, backgroundColor2);
    addValue(input2Js, backgroundColor2);
    addValue(input5Js, backgroundColor1);
  }

  // при клики делает активным или нет удаления
  if (e.target.closest('.select__button_js')) {
    if (!popupReverse.classList.contains('_reverse')) {
      e.target.classList.toggle('_active');
      if (!e.target.classList.contains('_active')) {
        const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
        popupTableTrAll.forEach((item) => {
          item.classList.remove('_delete');
        });
        // обнуляет MiniPopup
        resetMiniPopup();
      }
    }
  }

  // при клики вызываем popup2
  if (e.target.closest('.popup__delet_js')) {
    if (!popupReverse.classList.contains('_reverse')) {
      const popup2 = document.querySelector('.popup2_js');

      if (popup2.classList.contains('_active')) {
        popup2.classList.remove('_active');

        const popup2Radios = document.querySelectorAll('.popup2_radio_js');
        popup2Radios.forEach((item) => {
          item.classList.remove('_active');
        });
      } else {
        popup2.classList.add('_active');
        fon.style.zIndex = 20;
      }

      const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
      let tableDelete = false;
      popupTableTrAll.forEach((item) => {
        if (item.classList.contains('_delete')) {
          tableDelete = true;
          return;
        }
      });

      const popup2RadioSelected = document.querySelector('.popup2_radio-selected_js');
      if (!tableDelete) {
        popup2RadioSelected.classList.add('_not-active');
      } else {
        popup2RadioSelected.classList.remove('_not-active');
      }
    }
  }

  // пир клики в попапе 2 по переключатилям
  if (e.target.closest('.popup2_radio_js')) {
    if (e.target.closest('.popup2_radio_js').classList.contains('_active')) {
      e.target.closest('.popup2_radio_js').classList.remove('_active');
    } else {
      const popup2Radios = document.querySelectorAll('.popup2_radio_js');
      popup2Radios.forEach((item) => {
        item.classList.remove('_active');
      });
      if (!e.target.closest('.popup2_radio_js').classList.contains('_not-active')) {
        e.target.closest('.popup2_radio_js').classList.add('_active');
      }
    }
  }

  // пири клики в попапе 2 на кнопку "ОК"
  if (e.target.closest('.popup2__button_js')) {
    // скрываем попап 2
    const popup2 = document.querySelector('.popup2_js');
    popup2.classList.remove('_active');
    fon.style.zIndex = '';

    // делаем кнопку выбрать не активной
    selectButton.classList.remove('_active');

    // обнуляет MiniPopup
    resetMiniPopup();

    let addAudio = false;

    const popup2RadioSelected = document.querySelector('.popup2_radio-selected_js');
    const popup2RadioRemoveAll = document.querySelector('.popup2_radio-removeAll_js');

    // удаляем вибраные значения
    if (popup2RadioSelected.classList.contains('_active')) {
      popup2RadioSelected.classList.remove('_active');
      let itemId;
      // удаляем со страницы
      const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
      popupTableTrAll.forEach((item) => {
        if (item.classList.contains('_delete')) {
          itemId = item.id;

          // удаляем с localStorage
          const arrayLocalStorage = getLocalStorage(oneInputValue);
          let filteredArray = arrayLocalStorage.filter((value) => value.miliseconds != itemId);
          postLocalStorage(oneInputValue, filteredArray);

          // польот значений в корзину а затем удаляем
          FlyremoveValue(item);

          // да запускать аудио
          addAudio = true;
        }
      });
    } else {
      const popupTableTrAll = document.querySelectorAll('.popup__table-tr_js');
      popupTableTrAll.forEach((item) => {
        if (item.classList.contains('_delete')) {
          item.classList.remove('_delete');
        }
      });
    }

    // удаляем все значения
    if (popup2RadioRemoveAll.classList.contains('_active')) {
      popup2RadioRemoveAll.classList.remove('_active');
      popupTable.innerHTML = '';
      localStorage.removeItem(oneInputValue);
      valuesLength.innerText = 0;
      // да запускать аудио
      addAudio = true;
    }

    if (addAudio) {
      // звук при польоти
      audioPlay(audioFly);
    }
  }

  // при клики выбираем поле для удаления
  if (e.target.closest('.popup__table-tr_js')) {
    if (selectButton.classList.contains('_active')) {
      if (!e.target.closest('.popup__table-tr_js').classList.contains('_delete')) {
        e.target.closest('.popup__table-tr_js').classList.add('_delete');

        // показуем количество значений которые будут удалены
        counter = Number(miniPopup.textContent) + 1;
        miniPopup.textContent = counter;

        //показует скрывает miniPopup
        addRemoveMiniPopup(e);
      } else {
        e.target.closest('.popup__table-tr_js').classList.remove('_delete');

        // показуем количество значений которые будут удалены
        counter = Number(miniPopup.textContent) - 1;
        miniPopup.textContent = counter;

        //показует скрывает miniPopup
        addRemoveMiniPopup(e);
      }
    }
  }
  // при клики сортируем попап popupDey к большому
  if (e.target.closest('.popupDey__sort_js')) {
    removeClassAll('.td__value-valueBig', '_active');
    removeClassAll('.td__value-valueAverage', '_active');
    removeClassAll('.td__value-valueSmall', '_active');
    if (popupReverse.classList.contains('_reverse')) {
      sortPopupDeyTable2();
    } else if (document.querySelector('.popupDey__sort_js').classList.contains('_twoSort')) {
      if (document.querySelector('.popupDey__sort_js').classList.contains('_twoSortActive')) {
        let arrayValue = getLocalStorage(oneInputValue, false);
        openSortPopup(arrayValue, 26);
        document.querySelector('.popupDey__sort_js').classList.remove('_twoSortActive');
      } else {
        const popupDeyTable = document.querySelectorAll('.popupDeyTable');
        popupRenderDey.innerText = '';
        popupDeySortC(popupDeyTable, popupRenderDey, 'big');
        removeAllClass(popupDeySortBtn, '_twoSortActive');
        document.querySelector('.popupDey__sort_js').classList.add('_twoSortActive');
        addClassAll('.td__value-valueBig', '_active');
      }
    } else {
      sortPopupDeyTable();
    }
  }
  // при клики сортируем попап popupDey к средньому
  if (e.target.closest('.popupDey__sortC_js')) {
    removeClassAll('.td__value-valueBig', '_active');
    removeClassAll('.td__value-valueAverage', '_active');
    removeClassAll('.td__value-valueSmall', '_active');
    if (document.querySelector('.popupDey__sortC_js').classList.contains('_twoSortActive')) {
      let arrayValue = getLocalStorage(oneInputValue, false);
      openSortPopup(arrayValue, 26);
      document.querySelector('.popupDey__sortC_js').classList.remove('_twoSortActive');
    } else {
      const popupDeyTable = document.querySelectorAll('.popupDeyTable');
      popupRenderDey.innerText = '';
      removeAllClass(popupDeySortBtn, '_twoSortActive');
      popupDeySortC(popupDeyTable, popupRenderDey, 'average');
      document.querySelector('.popupDey__sortC_js').classList.add('_twoSortActive');
      addClassAll('.td__value-valueAverage', '_active');
    }
  }
  // при клики сортируем попап popupDey к меньшому
  if (e.target.closest('.popupDey__sortM_js')) {
    removeClassAll('.td__value-valueBig', '_active');
    removeClassAll('.td__value-valueAverage', '_active');
    removeClassAll('.td__value-valueSmall', '_active');
    if (document.querySelector('.popupDey__sortM_js').classList.contains('_twoSortActive')) {
      let arrayValue = getLocalStorage(oneInputValue, false);
      openSortPopup(arrayValue, 26);
      document.querySelector('.popupDey__sortM_js').classList.remove('_twoSortActive');
    } else {
      const popupDeyTable = document.querySelectorAll('.popupDeyTable');
      popupRenderDey.innerText = '';
      popupDeySortC(popupDeyTable, popupRenderDey, 'small');
      removeAllClass(popupDeySortBtn, '_twoSortActive');
      document.querySelector('.popupDey__sortM_js').classList.add('_twoSortActive');
      addClassAll('.td__value-valueSmall', '_active');
    }
  }
  // при клики
  if (e.target.closest('.popupButtonUp_js')) {
    scrolling(0);
  }
});
// <<<<<<<<<<<<<<<< // при клике на странице >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

popup.addEventListener('scroll', function (e) {
  arrowAddRemove1();
});
popupDey.addEventListener('scroll', function (e) {
  arrowAddRemove2();
});

// сортировка попапа
sortValue.addEventListener('change', function () {
  let arrayValue = getLocalStorage(oneInputValue, false);
  valuesLength.innerText = arrayValue.length;
  popupTableLength.innerHTML = 0;
  // сортировка самые новые
  if (Number(this.value) == 1) {
    newValuePopup();
  }

  // сортировка По значению больше
  if (Number(this.value) == 2) {
    popupTable.innerHTML = '';

    arrayValue.sort(function (a, b) {
      return a.value - b.value;
    });
    addRenderValuePopup(arrayValue);
  }

  // сортировка По значению менше
  if (Number(this.value) == 3) {
    popupTable.innerHTML = '';
    arrayValue.sort(function (a, b) {
      return b.value - a.value;
    });

    addRenderValuePopup(arrayValue);
  }

  // сортировка самые старые
  if (Number(this.value) == 4) {
    popupTable.innerHTML = '';
    arrayValue.sort(function (a, b) {
      return b.miliseconds - a.miliseconds;
    });
    addRenderValuePopup(arrayValue);
  }
  // выборка по времини и сортировка от Больше. за 1-сутки
  if (Number(this.value) == 5) {
    bigTime(arrayValue, 86400000);
  }
  // выборка по времини и сортировка от Больше. за 2-суток
  if (Number(this.value) == 8) {
    bigTime(arrayValue, 86400000 * 2);
  }
  // выборка по времини и сортировка от Больше. за 3-суток
  if (Number(this.value) == 10) {
    bigTime(arrayValue, 86400000 * 3);
  }
  // выборка по времини и сортировка от Больше. за 4-суток
  if (Number(this.value) == 12) {
    bigTime(arrayValue, 86400000 * 4);
  }
  // выборка по времини и сортировка от Больше. за 5-суток
  if (Number(this.value) == 14) {
    bigTime(arrayValue, 86400000 * 5);
  }
  // выборка по времини и сортировка от Больше. за 6-суток
  if (Number(this.value) == 16) {
    bigTime(arrayValue, 86400000 * 6);
  }
  // выборка по времини и сортировка от Больше. за 7-суток
  if (Number(this.value) == 18) {
    bigTime(arrayValue, 86400001 * 7);
  }
  // выборка по времини и сортировка от Больше. за 8-суток
  if (Number(this.value) == 20) {
    bigTime(arrayValue, 86400000 * 8);
  }
  // выборка по времини и сортировка от Больше. за 9-суток
  if (Number(this.value) == 22) {
    bigTime(arrayValue, 86400000 * 9);
  }
  // выборка по времини и сортировка от Больше. за 10-суток
  if (Number(this.value) == 24) {
    bigTime(arrayValue, 86400000 * 10);
  }

  function bigTime(arrayValue, time) {
    const miliseconds = Date.now();
    let newArray = [];

    arrayValue.forEach((item) => {
      if (miliseconds - item.miliseconds < time) {
        newArray.push(item);
      }
    });
    valuesLength.innerText = newArray.length;
    popupTable.innerHTML = '';

    newArray.sort(function (a, b) {
      return a.value - b.value;
    });
    addRenderValuePopup(newArray);
  }
  // выборка по времини и сортировка от Меньше за 1-сутки
  if (Number(this.value) == 6) {
    smallTime(arrayValue, 86400000);
  }
  // выборка по времини и сортировка от Меньше за 2-суток
  if (Number(this.value) == 9) {
    smallTime(arrayValue, 86400000 * 2);
  }
  // выборка по времини и сортировка от Меньше за 3-суток
  if (Number(this.value) == 11) {
    smallTime(arrayValue, 86400000 * 3);
  }
  // выборка по времини и сортировка от Меньше за 4-суток
  if (Number(this.value) == 13) {
    smallTime(arrayValue, 86400000 * 4);
  }
  // выборка по времини и сортировка от Меньше за 5-суток
  if (Number(this.value) == 15) {
    smallTime(arrayValue, 86400000 * 5);
  }
  // выборка по времини и сортировка от Меньше за 6-суток
  if (Number(this.value) == 17) {
    smallTime(arrayValue, 86400000 * 6);
  }
  // выборка по времини и сортировка от Меньше за 7-суток
  if (Number(this.value) == 19) {
    smallTime(arrayValue, 86400001 * 7);
  }
  // выборка по времини и сортировка от Меньше за 8-суток
  if (Number(this.value) == 21) {
    smallTime(arrayValue, 86400000 * 8);
  }
  // выборка по времини и сортировка от Меньше за 9-суток
  if (Number(this.value) == 23) {
    smallTime(arrayValue, 86400000 * 9);
  }
  // выборка по времини и сортировка от Меньше за 10-суток
  if (Number(this.value) == 25) {
    smallTime(arrayValue, 86400000 * 10);
  }
  function smallTime(arrayValue, time) {
    const miliseconds = Date.now();
    let newArray = [];

    arrayValue.forEach((item) => {
      if (miliseconds - item.miliseconds < time) {
        newArray.push(item);
      }
    });
    valuesLength.innerText = newArray.length;
    popupTable.innerHTML = '';

    newArray.sort(function (a, b) {
      return b.value - a.value;
    });
    addRenderValuePopup(newArray);
  }
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // сортировка Средние по часам.
  if (Number(this.value) == 7) {
    openSortPopup(arrayValue);
  }
  //сортировка Средние за 1-день.
  if (Number(this.value) == 26) {
    document.querySelector('.popupDey__sort_js').classList.add('_twoSort');
    openSortPopup(arrayValue, 26);
    document.querySelector('.popupDey__sortC_js').style.display = 'block';
    document.querySelector('.popupDey__sortM_js').style.display = 'block';
  }
  //сортировка Среднее за месяц.
  if (Number(this.value) == 27) {
    openSortPopup2(arrayValue, 27);
  }
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openSortPopup(arrayValue, sortValueChange) {
  selectButton.classList.remove('_active');
  let indexTable = 1;
  popupRenderDey.innerHTML = '';
  popupDey.classList.add('_active');

  // все года
  const years = [];
  // выбераем года
  arrayValue.forEach((item) => {
    // если в массиве years нету етого значения то возвращает false если есть то true
    let i = years.includes(item.year);
    if (!i) {
      years.push(item.year);
    }
  });
  // сортируем от большого к меншому
  years.sort(function (a, b) {
    return b - a;
  });

  let indexYears = 0;

  f1();
  function f1() {
    let year = years[indexYears];
    //месеа
    const months = [];
    // выбераем месяца в текущем годе
    arrayValue.forEach((item) => {
      if (item.year == year) {
        let i = months.includes(item.month);
        if (!i) {
          months.push(item.month);
        }
      }
    });
    // сортируем от большого к меншому
    months.sort(function (a, b) {
      return b - a;
    });
    let indexMonths = 0;

    f2();
    function f2() {
      let indexDey = 31;

      f3();
      function f3() {
        let arrayDey = [];
        arrayValue.forEach((item) => {
          if (
            item.numberDeta == indexDey &&
            item.month == months[indexMonths] &&
            item.year == year
          ) {
            arrayDey.push(item);
          }
        });

        if (arrayDey.length > 0) {
          if (sortValueChange === 26) {
            renderTable3(indexDey, months[indexMonths], year, indexTable, arrayDey);
          } else {
            if (!popupReverse.classList.contains('_reverse')) {
              renderTable(indexDey, months[indexMonths], year, indexTable, arrayDey);
            } else {
              renderTable2(indexDey, months[indexMonths], year, indexTable, arrayDey);
            }
          }
          indexTable++;
        }

        if (indexDey > 1) {
          indexDey--;
          f3();
        }
      }
      indexMonths++;
      if (months[indexMonths]) {
        f2();
      }
    }
    indexYears++;
    if (years[indexYears]) {
      f1();
    }
  }
  setTimeout(() => {
    arrowAddRemove2();
  }, 200);
}
function openSortPopup2(arrayValue, sortValueChange) {
  selectButton.classList.remove('_active');
  let indexTable = 1;
  popupRenderDey.innerHTML = '';
  popupDey.classList.add('_active');

  // все года
  const years = [];
  // выбераем года
  arrayValue.forEach((item) => {
    // если в массиве years нету етого значения то возвращает false если есть то true
    let i = years.includes(item.year);
    if (!i) {
      years.push(item.year);
    }
  });
  // сортируем от большого к меншому
  years.sort(function (a, b) {
    return b - a;
  });

  let indexYears = 0;

  f1();
  function f1() {
    let year = years[indexYears];
    //месеа
    const months = [];
    // выбераем месяца в текущем годе
    arrayValue.forEach((item) => {
      if (item.year == year) {
        let i = months.includes(item.month);
        if (!i) {
          months.push(item.month);
        }
      }
    });
    // сортируем от большого к меншому
    months.sort(function (a, b) {
      return b - a;
    });
    let indexMonths = 0;

    f2();
    function f2() {
      let arrayMonth = [];
      arrayValue.forEach((item) => {
        if (item.month == months[indexMonths] && item.year == year) {
          arrayMonth.push(item);
        }
      });

      if (arrayMonth.length > 0) {
        renderTable4(months[indexMonths], year, indexTable, arrayMonth);
        indexTable++;
      }

      indexMonths++;
      if (months[indexMonths]) {
        f2();
      }
    }
    indexYears++;
    if (years[indexYears]) {
      f1();
    }
  }
  setTimeout(() => {
    arrowAddRemove2();
  }, 200);
}

function newValuePopup() {
  let arrayValue = getLocalStorage(oneInputValue, false);
  valuesLength.innerText = arrayValue.length;
  arrayValue.sort(function (a, b) {
    return a.miliseconds - b.miliseconds;
  });
  popupTable.innerHTML = '';

  addRenderValuePopup(arrayValue);
}
// рендерит таблицы в попап popupRenderDey
function renderTable(day, month, year, counterTableId, arrayDey) {
  let idTable = `table${counterTableId}`;

  const months = [
    'січеня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const htmlTable = `
      <div class="popupDeyTable _table${day}-${month - 1}-${year}">
        <div class="flex-block tebleTitle">
          <p>${day} ${months[month - 1]} ${year}</p>
          <p>
          ${arrayDey.length} зн.
          </p>
        </div>
        <table class="popup__table sortPopupDeyTable_js" id="${idTable}" cellpadding="100" border="2" width="100%">

        </table>
      </div>
    `;
  popupRenderDey.insertAdjacentHTML('beforeend', htmlTable);

  renderDeyFunc(arrayDey, idTable);
}
// рендерит таблицы в попап popupRenderDey
function renderTable3(day, month, year, counterTableId, arrayDey) {
  let idTable = `table${counterTableId}`;
  let itemBig;
  let valueSmall;
  let valueSum = 0;
  let valueAverage;
  // больше за день
  arrayDey.sort(function (a, b) {
    return b.value - a.value;
  });
  itemBig = arrayDey[0];
  // -------------------
  // менше за день
  arrayDey.sort(function (a, b) {
    return a.value - b.value;
  });
  valueSmall = arrayDey[0];
  // --------------------
  arrayDey.forEach((item) => {
    valueSum = Number(valueSum) + Number(item.value);
  });

  valueAverage = valueSum / arrayDey.length;

  const months = [
    'січеня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const htmlTable = `
      <div class="popupDeyTable popupDeyTable_js _table${day}-${month - 1}-${year}" data-big="${
    itemBig.value
  }" data-small="${valueSmall.value}" data-average="${valueAverage.toFixed(3)}">
        <div class="flex-block tebleTitle">
          <p>${day} ${months[month - 1]} ${year}</p>
          <p>
          ${arrayDey.length} зн.
          </p>
        </div>
        <table class="popup__table sortPopupDeyTable_js" id="${idTable}" cellpadding="100" border="2" width="100%">

        </table>
      </div>
    `;
  popupRenderDey.insertAdjacentHTML('beforeend', htmlTable);

  renderhourse3(itemBig, valueAverage, valueSmall, idTable);
}
// рендерит таблицы в попап popupRenderDey
function renderTable4(month, year, counterTableId, arrayMonth) {
  let idTable = `table${counterTableId}`;
  let itemBig;
  let valueSmall;
  let valueSum = 0;
  let valueAverage;
  // больше за месяц
  arrayMonth.sort(function (a, b) {
    return b.value - a.value;
  });
  itemBig = arrayMonth[0];
  // -------------------
  // менше за месяц
  arrayMonth.sort(function (a, b) {
    return a.value - b.value;
  });
  valueSmall = arrayMonth[0];
  // --------------------
  arrayMonth.forEach((item) => {
    valueSum = Number(valueSum) + Number(item.value);
  });
  valueAverage = valueSum / arrayMonth.length;

  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  const htmlTable = `
      <div class="popupDeyTable popupDeyTable_js _table${month - 1}-${year}" data-big="${
    itemBig.value
  }" data-small="${valueSmall.value}" data-average="${valueAverage.toFixed(3)}">
        <div class="flex-block tebleTitle">
          <p>${months[month - 1]} ${year}</p>
          <p>
          ${arrayMonth.length} зн.
          </p>
        </div>
        <table class="popup__table sortPopupDeyTable_js" id="${idTable}" cellpadding="100" border="2" width="100%">

        </table>
      </div>
    `;
  popupRenderDey.insertAdjacentHTML('beforeend', htmlTable);

  renderhourse4(itemBig, valueAverage, valueSmall, idTable);
}

// рендерит сортировку Средние по часам в таблицы.
function renderhourse3(itemBig, valueAverage, valueSmall, idTable) {
  let valueHtml = `
     <tr class="popup__table-tr_js td__value-valueBig">
        <td class="td__value">макс.з</td>
        <td class="td__value">${itemBig.date.split(',')[1]}</td>
        <td class="td__value ${itemBig.background2}">${itemBig.value1}</td>
        <td class="td__value ${itemBig.background}">${itemBig.value}</td>
      </tr>
     <tr class="popup__table-tr_js td__value-valueAverage">
        <td class="td__value">серед.з</td>
        <td class="td__value"></td>
        <td class="td__value ${itemBig.background2}">${itemBig.value1}</td>
        <td class="td__value ${itemBig.background}">${valueAverage.toFixed(3)}</td>
      </tr>
     <tr class="popup__table-tr_js td__value-valueSmall">
        <td class="td__value">мiнiм.з</td>
        <td class="td__value">${valueSmall.date.split(',')[1]}</td>
        <td class="td__value ${itemBig.background2}">${valueSmall.value1}</td>
        <td class="td__value ${itemBig.background}">${valueSmall.value}</td>
      </tr>
  `;
  const popupTable = document.querySelector(`#${idTable}`);
  popupTable.insertAdjacentHTML('beforeend', valueHtml);
  // popupTable.insertAdjacentHTML('afterbegin', valueHtml);
}
// рендерит сортировку Средние по часам в таблицы.
function renderhourse4(itemBig, valueAverage, valueSmall, idTable) {
  let month1 = itemBig.month;
  if (month1 < 10) {
    month1 = `0${itemBig.month}`;
  }
  let month2 = valueSmall.month;
  if (month2 < 10) {
    month2 = `0${valueSmall.month}`;
  }
  let valueHtml = `
     <tr class="popup__table-tr_js td__value-valueBig">
        <td class="td__value">макс.з</td>
        <td class="td__value">${itemBig.numberDeta}.${month1}. (${itemBig.date.split(',')[1]})</td>
        <td class="td__value ${itemBig.background2}">${itemBig.value1}</td>
        <td class="td__value ${itemBig.background}">${itemBig.value}</td>
      </tr>
     <tr class="popup__table-tr_js td__value-valueAverage">
        <td class="td__value">серед.з</td>
        <td class="td__value"></td>
        <td class="td__value ${itemBig.background2}">${itemBig.value1}</td>
        <td class="td__value ${itemBig.background}">${valueAverage.toFixed(3)}</td>
      </tr>
     <tr class="popup__table-tr_js td__value-valueSmall">
        <td class="td__value">мiнiм.з</td>
        <td class="td__value">${valueSmall.numberDeta}.${month2}. (${
    valueSmall.date.split(',')[1]
  })</td>
        <td class="td__value ${itemBig.background2}">${valueSmall.value1}</td>
        <td class="td__value ${itemBig.background}">${valueSmall.value}</td>
      </tr>
  `;
  const popupTable = document.querySelector(`#${idTable}`);
  popupTable.insertAdjacentHTML('beforeend', valueHtml);
  // popupTable.insertAdjacentHTML('afterbegin', valueHtml);
}

function renderDeyFunc(arrayValueDey, idTable) {
  for (let counter = 0; counter < 24; counter++) {
    let newArray = [];
    let value = 0;

    arrayValueDey.forEach((item) => {
      if (item.hourse == counter) {
        newArray.push(item.value);
      }
    });

    for (let i = 0; i < newArray.length; i++) {
      value = value + Number(newArray[i]);
    }

    let newValue = 0;
    let newArrayLength = 0;

    if (newArray.length) {
      newValue = (value / newArray.length).toFixed(3);
      newArrayLength = newArray.length;
    }
    // --------------------------------------------------------------
    // рендерим все часы даже пустые
    renderhourse(counter, newValue, newArrayLength, idTable);

    // рендерим только часы у которых есть значения
    // if (newValue > 0){
    //   renderhourse(counter, newValue, newArrayLength, idTable);
    // }
    // --------------------------------------------------------------
  }
}
// рендерит сортировку Средние по часам в таблицы.
function renderhourse(time, value, number, idTable) {
  let valueHtml = `
     <tr class="popup__table-tr_js" data-valuetime="${value}">
        <td class="td__value">${time} год.</td>
        <td class="td__value">${value}</td>
        <td class="td__value">${number} зн.</td>
      </tr>
  `;
  const popupTable = document.querySelector(`#${idTable}`);
  popupTable.insertAdjacentHTML('beforeend', valueHtml);
  // popupTable.insertAdjacentHTML('afterbegin', valueHtml);
}
// сортировка Средние по часам начиная з большого
function sortPopupDeyTable() {
  const sortPopupDeyTable = document.querySelectorAll('.sortPopupDeyTable_js');
  sortPopupDeyTable.forEach((itemDey) => {
    let childTr = itemDey.querySelectorAll('.popup__table-tr_js');

    let tableTrAll = [];

    childTr.forEach((item) => {
      itemObgect = {
        value: item.dataset.valuetime,
        element: item,
      };
      tableTrAll.push(itemObgect);
    });

    tableTrAll.sort(function (a, b) {
      return a.value - b.value;
    });

    itemDey.innerHTML = '';
    tableTrAll.forEach((item) => {
      let element = item.element;
      itemDey.prepend(element);
    });
  });
}

// рендерит таблицы в попап popupRenderDey
function renderTable2(day, month, year, counterTableId, arrayDey) {
  let idTable = `table${counterTableId}`;

  const months = [
    'січеня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const htmlTable = `
    <div class="popupDeyTable font__smail _table${day}-${month - 1}-${year}">
      <div class="flex-block tebleTitle">
        <p>${day} ${months[month - 1]} ${year}</p>
        <p>${arrayDey.length} зн.</p>
      </div>
      <div class="table__wrapper">
        <div class="table__inner table__inner1-${idTable}_js table__sort_js"> </div>
        <div class="table__inner table__inner2-${idTable}_js table__sort_js"> </div>
      </div>
    </div>
  `;
  popupRenderDey.insertAdjacentHTML('beforeend', htmlTable);
  renderDeyFunc2(arrayDey, idTable);
}

function renderDeyFunc2(arrayValueDey, idTable) {
  for (let counter = 0; counter < 24; counter++) {
    let newArray = [];

    arrayValueDey.forEach((item) => {
      if (item.hourse == counter) {
        newArray.push(item);
      }
    });

    if (newArray.length) {
      const tableInner1 = document.querySelector(`.table__inner1-${idTable}_js`);
      const tableInner2 = document.querySelector(`.table__inner2-${idTable}_js`);
      let bg1 = '';
      let bg2 = '';

      const table1 = document.createElement('div');
      table1.className = 'table';
      const tableClock1 = document.createElement('div');
      tableClock1.className = 'table__clock';
      tableClock1.innerHTML = counter;
      table1.insertAdjacentElement('afterbegin', tableClock1);
      const tableValue1 = document.createElement('div');
      tableValue1.className = 'table__value';

      const table2 = document.createElement('div');
      table2.className = 'table';
      const tableClock2 = document.createElement('div');
      tableClock2.className = 'table__clock';
      tableClock2.innerHTML = counter;
      table2.insertAdjacentElement('afterbegin', tableClock2);
      const tableValue2 = document.createElement('div');
      tableValue2.className = 'table__value';

      newArray.forEach((item) => {
        if (item.background == 'background__acent-2') {
          bg1 = 'background__acent-1';
          bg2 = 'background__acent-2';
        } else {
          bg1 = 'background__acent-2';
          bg2 = 'background__acent-1';
        }
        if (!item.Minutes) {
          item.Minutes = '--';
        }
        const ul1 = `
        <ul class="table__value-list" data-clock="${counter}">
          <li class="table__value-item">${item.hourse}:${item.Minutes}</li>
          <li class="table__value-item ${bg1}" data-valuetime="${item.value2}">${item.value2}
            <span class="table__value-item__span">в</span>
          </li>
        </ul>
       `;
        tableValue1.insertAdjacentHTML('beforeEnd', ul1);
        const ul2 = `
        <ul class="table__value-list" data-clock="${counter}">
          <li class="table__value-item">${item.hourse}:${item.Minutes}</li>
          <li class="table__value-item ${bg2}" data-valuetime="${item.value3}">${item.value3}
            <span class="table__value-item__span">н</span>
          </li>
        </ul>
       `;
        tableValue2.insertAdjacentHTML('beforeEnd', ul2);
      });

      table1.insertAdjacentElement('beforeEnd', tableValue1);
      table2.insertAdjacentElement('beforeEnd', tableValue2);

      tableInner1.insertAdjacentElement('beforeend', table1);
      tableInner2.insertAdjacentElement('beforeend', table2);
    } else {
      const tableInner1 = document.querySelector(`.table__inner1-${idTable}_js`);
      const tableInner2 = document.querySelector(`.table__inner2-${idTable}_js`);
      let valueHtml1 = `
          <div class="table">
              <div class="table__clock">${counter}</div>
              <div class="table__value">
                <ul class="table__value-list" data-clock="${counter}">
                  <li class="table__value-item">-</li>
                  <li class="table__value-item" data-valuetime="0">-
                    <span class="table__value-item__span">в</span>
                  </li>
                </ul>
              </div>
          </div>
        `;
      let valueHtml2 = `
          <div class="table">
              <div class="table__clock">${counter}</div>
              <div class="table__value">
                <ul class="table__value-list" data-clock="${counter}">
                  <li class="table__value-item">-</li>
                  <li class="table__value-item" data-valuetime="0">-
                    <span class="table__value-item__span">н</span>
                  </li>
                </ul>
              </div>
          </div>
        `;
      tableInner1.insertAdjacentHTML('beforeend', valueHtml1);
      tableInner2.insertAdjacentHTML('beforeend', valueHtml2);
    }
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// сортировка Средние по часам начиная з меншого
function sortPopupDeyTable2() {
  let tableSort = document.querySelectorAll('.table__sort_js');
  tableSort.forEach((childTr) => {
    // собырае все ul с колонки
    const table = childTr.querySelectorAll('.table__value-list');
    let tableTrAll = [];

    // из каждого ul (листа) делаем обект з даннымы
    table.forEach((item) => {
      const tableDataAll = item.querySelectorAll('[data-valuetime]');
      tableDataAll.forEach((itemData) => {
        itemObgect = {
          value: itemData.dataset.valuetime,
          element: item,
          clock: item.dataset.clock,
        };
        tableTrAll.push(itemObgect);
      });
    });

    // больше сверху
    tableTrAll.sort(function (a, b) {
      return b.value - a.value;
    });

    childTr.innerHTML = '';
    // ---------------------------------
    fs1();
    function fs1() {
      // создаем елемент таблицы table
      const table = document.createElement('div');
      table.className = 'table';
      const tableClock = document.createElement('div');
      tableClock.className = 'table__clock';
      tableClock.innerHTML = tableTrAll[0].clock;
      table.insertAdjacentElement('afterbegin', tableClock);

      fs2();
      function fs2() {
        // создаем table__value(обертка для ul)
        const tableValue = document.createElement('div');
        tableValue.className = 'table__value';

        fs3();
        function fs3() {
          // берем ul по index-0 и ложим в table__value
          tableValue.insertAdjacentElement('beforeEnd', tableTrAll[0].element);
          let clock = tableTrAll[0].clock;
          tableTrAll.splice(0, 1);

          if (tableTrAll.length) {
            fs4();
          } else {
            table.insertAdjacentElement('beforeEnd', tableValue);
            childTr.insertAdjacentElement('beforeend', table);
          }

          function fs4() {
            if (clock == tableTrAll[0].clock) {
              tableValue.insertAdjacentElement('beforeEnd', tableTrAll[0].element);
              tableTrAll.splice(0, 1);
              if (tableTrAll.length) {
                fs4();
              } else {
                table.insertAdjacentElement('beforeEnd', tableValue);
                childTr.insertAdjacentElement('beforeend', table);
              }
            } else {
              // -----------------------------------------------------------------------------------------
              // берем значения из масива tableTrAll по индексу [0]
              let ulValue = tableTrAll[0].value;

              for (let i = 1; i < tableTrAll.length; i++) {
                // если в масиве tableTrAll есть ещо значения равны
                if (tableTrAll[i].value == ulValue && tableTrAll[i].clock == clock) {
                  tableValue.insertAdjacentElement('beforeEnd', tableTrAll[i].element);
                  tableTrAll.splice(i, 1);
                }
              }

              table.insertAdjacentElement('beforeEnd', tableValue);
              childTr.insertAdjacentElement('beforeend', table);
              if (tableTrAll.length) {
                fs1();
              }
              // -----------------------------------------------------------------------------------------
            }
          }
        }
      }
    }
  });
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const calendarMonthInner = document.querySelectorAll('.calendar__month-inner_js');
const fon2 = document.querySelector('.fon2_js');

calendarPopap.addEventListener('click', (e) => {
  if (e.target.closest('.calendar-popup__close_js')) {
    calendarPopap.classList.remove('_active');
    calendarMonthWrapper.innerHTML = '';
  }
  if (e.target.closest('.fon2_js')) {
    const calendarMonthInner = calendarMonthWrapper.querySelectorAll('.calendar__month-inner_js');
    fon2.classList.remove('_active');
    calendarMonthInner.forEach((item) => {
      item.classList.remove('_active');
      item.classList.remove('_selection');
      item.style.cssText = '';
    });
  }

  if (e.target.closest('.calendar__month-inner_js')) {
    const calendarMonthInner = e.target.closest('.calendar__month-inner_js');
    const calendarMonthWrapper = e.target.closest('.calendar__month-wrapper_js');

    // ------------------------------------------
    if (
      e.target.closest('.calendar__dey_js ') &&
      e.target.classList.contains('_active') &&
      calendarMonthInner.classList.contains('_active')
    ) {
      const calendarPopap = document.querySelector('.calendar-popap_js');
      calendarPopap.classList.remove('_active'); //скрывает календарь
      const popupReverse = document.querySelector('.popup__reverse_js');

      if (popupReverse.classList.contains('_reverse') || popupDey.classList.contains('_active')) {
        scrollDey1(e.target.dataset.deydata);
      } else {
        renderDay(e.target.dataset.numberday, e.target.dataset.month, e.target.dataset.year);
      }
    }
    calendarMonthInner.classList.toggle('_active'); //маштабирует месяц
    calendarMonthInner.classList.toggle('_selection'); // дозволяет запрещает hover на днях
    fon2.classList.toggle('_active'); //скрывает показует фон
    // ------------------------------------------

    if (calendarPopap.offsetWidth < 600) {
      const MonthWrapperWidth = calendarMonthWrapper.offsetWidth;
      const windowInnerHeight = window.innerHeight;

      const MonthWrapperLeft = calendarMonthWrapper.offsetLeft;

      const MonthInnerWidth = calendarMonthInner.offsetWidth;
      const MonthInnerHeight = calendarMonthInner.offsetHeight;
      const MonthInnerLeft = calendarMonthInner.offsetLeft - MonthWrapperLeft;

      let scale = MonthWrapperWidth / MonthInnerWidth;

      if (scale > 3) {
        scale = 3;
      }

      if (calendarMonthInner.classList.contains('_active')) {
        const MonthInnerTop = calendarMonthInner.getBoundingClientRect().top;
        let ttX = MonthWrapperWidth / 2 - MonthInnerWidth / 2 - MonthInnerLeft;
        let ttY = windowInnerHeight / 2 - MonthInnerHeight / 2 - MonthInnerTop;

        calendarMonthInner.style.cssText = `transform: scale(${scale})
                                        translate(${ttX / scale}px, ${ttY / scale}px);`;
      } else {
        calendarMonthInner.style.cssText = '';
      }
    }
  }
});
function renderDay(day, month, year) {
  let arrayValue = getLocalStorage(oneInputValue, false);
  const popupTable = document.querySelector('.popup__table_js');

  let filterArray = [];

  popupTable.innerHTML = '';
  if (arrayValue) {
    for (let index = 0; index < arrayValue.length; index++) {
      if (Number(year) === arrayValue[index].year) {
        if (Number(month) + 1 === arrayValue[index].month) {
          if (Number(day) === arrayValue[index].numberDeta) {
            filterArray.push(arrayValue[index]);
          }
        }
      }
    }
  }
  popupTableLength.innerHTML = '';
  addRenderValuePopup(filterArray);
}

function scrollDey1(data) {
  const scrolElement = document.querySelector(`._table${data}`);
  if (scrolElement) {
    scrolling(scrolElement.offsetTop - 73);
  }
}

function scrollDey3(data) {
  let data1 = data.split('-');
  let data2 = `${data1[1]}-${data1[2]}`;
  const scrolElement = document.querySelector(`._table${data2}`);
  if (scrolElement) {
    scrolling(scrolElement.offsetTop - 73);
    console.log('scrolling()');
  }
}

function scrolling(top) {
  const popupTop = document.querySelector('.popup_js');
  const popupDeyTop = document.querySelector('.popupDey_js');
  if (popupTop.classList.contains('_active')) {
    popupTop.scroll({
      top: top,
      left: 0,
      behavior: 'smooth',
    });
  }
  if (popupDeyTop.classList.contains('_active')) {
    popupDeyTop.scroll({
      top: top,
      left: 0,
      behavior: 'smooth',
    });
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Копіює з LocalStorage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function GetLocalStorageInPopup() {
  const popupLocalStorageGet = document.querySelector('.popup-LocalStorage_get_js');
  popupLocalStorageGet.classList.add('active');
  const LocalStorageValueAll = getLocalStorage('fgh-oneInputValue');
  const popupLocalStorageContent = popupLocalStorageGet.querySelector(
    '.popup-LocalStorage_get-content_js',
  );
  popupLocalStorageContent.classList.remove('copy');
  popupLocalStorageContent.innerHTML = JSON.stringify(LocalStorageValueAll);
}

function closePopupLocalStorageGet() {
  const popupLocalStorageGet = document.querySelector('.popup-LocalStorage_get_js');
  popupLocalStorageGet.classList.remove('active');
}

function PopupLocalStorageCopy() {
  const popupLocalStorageGet = document.querySelector('.popup-LocalStorage_get_js');
  const LocalStorageValueAll = getLocalStorage('fgh-oneInputValue');
  const popupLocalStorageContent = popupLocalStorageGet.querySelector(
    '.popup-LocalStorage_get-content_js',
  );
  popupLocalStorageContent.classList.add('copy');

  //поместити в буфер обмена
  navigator.clipboard
    .writeText(JSON.stringify(LocalStorageValueAll))
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Копіює з LocalStorage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Сохраняє в LocalStorage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function PutLocalStorageInPopup() {
  const popupLocalStoragePut = document.querySelector('.popup-LocalStorage_put_js');
  popupLocalStoragePut.classList.add('active');
}
function closePopupLocalStoragePut() {
  const popupLocalStoragePut = document.querySelector('.popup-LocalStorage_put_js');
  popupLocalStoragePut.classList.remove('active');
  document.querySelector('.popup-LocalStorage_put-textarea_js').value = '';
}
function PopupLocalStoragePut() {
  let value = document.querySelector('.popup-LocalStorage_put-textarea_js').value;
  // добавляем valueText в localStorage
  localStorage.setItem('fgh-oneInputValue', value);
  document.querySelector('.popup-LocalStorage_put-textarea_js').value = '';
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Сохраняє в LocalStorage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
