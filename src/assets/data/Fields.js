export const editObjectFields = [
  {
    name: "Title",
    label: "Название",
    placeholder: "Коттедж с видом на берег",
    rules: { required: "Это поле обязательно для заполнения" },
  },
  {
    name: "Description",
    label: "Описание",
    placeholder: "Описание коттеджа, вид на берег",
    rules: { required: "Это поле обязательно для заполнения" },
    multiline: true,
    numberOfLines: 7,
    textAlignVertical: "top",
  },
  {
    name: "LocationLabel",
    label: "Адрес",
    placeholder: "Ул. Чуй 122",
    rules: { required: "Это поле обязательно для заполнения" },
  },

  {
    name: "Country",
    label: "Страна",
    placeholder: "Кыргызстан",
    rules: { required: "Это поле обязательно для заполнения" },
  },
  {
    name: "City",
    label: "Бишкек",
    placeholder: "Бишкек",
    rules: { required: "Это поле обязательно для заполнения" },
  },
  {
    name: "Price",
    label: "Цена",
    placeholder: "10 000 сом",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
  {
    name: "DiscountPrice",
    label: "Цена со скидкой",
    placeholder: "5000 сом",
    render: false,
    keyboardType: "numeric",
  },
  {
    name: "PriceDescription",
    label: "Описание цены",
    placeholder: "Лучшая цена",
    render: false,
  },
  {
    name: "PeopleQuantity",
    label: "Количество гостей",
    placeholder: "Гости",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
  {
    name: "RoomsQuantity",
    label: "Количество комнат",
    placeholder: "Комнаты",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
  {
    name: "Bedrooms",
    label: "Количество спальн",
    placeholder: "Спальня",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
  {
    name: "Bathrooms",
    label: "Количество ванных комнат",
    placeholder: "Ванная",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
  {
    name: "Beds",
    label: "Количество кроватей",
    placeholder: "Кровати",
    rules: { required: "Это поле обязательно для заполнения" },
    keyboardType: "numeric",
  },
];
export const registrationFields = [
  {
    name: "Email",
    label: "Email",
    placeholder: "Введите Email",
    icon: "mail",
    rules: {
      required: "Заполните поле",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Пожалуйста, введите действительный адрес электронной почты",
      },
    },
  },
  {
    name: "Nickname",
    label: "Имя пользователя",
    placeholder: "Введите имя пользователя",
    icon: "user",
    rules: {
      required: "Заполните поле",
    },
  },
  {
    name: "Password",
    label: "Пароль",
    placeholder: "Введите пароль",
    icon: "lock",
    rules: {
      required: "Заполните поле",
      minLength: { value: 8, message: "Введите минимально 8 символов" },
      pattern: {
        value: /^[^\sа-яА-Я]+$/i,
        message: "Введите на латинице",
      },
    },
  },
  {
    name: "PasswordConfirm",
    label: "Повторите пароль",
    placeholder: "Подтверждение пароля",
    icon: "lock",
    rules: {
      required: "Заполните поле",
      minLength: { value: 8, message: "Введите минимально 8 символов" },
      pattern: {
        value: /^[^\sа-яА-Я]+$/i,
        message: "Введите на латинице",
      },
    },
  },
];
export const ownerFields = [
  { name: "Surname", label: "Фамилия", placeholder: "Фамилия", type: "text" },
  { name: "Name", label: "Имя", placeholder: "Имя", type: "text" },
  {
    name: "Patronymic",
    label: "Отчество",
    placeholder: "Отчество",
    type: "text",
  },
  {
    name: "Nationality",
    label: "Национальность",
    placeholder: "Национальность",
    type: "text",
  },
  {
    name: "DateOfBirth",
    label: "Дата рождения",
    placeholder: "1996-10-02",
    type: "date",
  },
  {
    name: "PlaceOfBirth",
    label: "Место рождения",
    placeholder: "Место рождения",
    type: "text",
  },
  {
    name: "IDPassportType",
    label: "Тип паспорта",
    placeholder: "Тип паспорта",
    type: "text",
  },
  {
    name: "DocumentNumber",
    label: "Номер документа",
    placeholder: "Номер документа",
    type: "text",
  },
  {
    name: "DateOfIssue",
    label: "Дата выдачи",
    placeholder: "Дата выдачи",
    type: "date",
  },
  {
    name: "DateOfExpiry",
    label: "Дата истечения",
    placeholder: "Дата истечения",
    type: "date",
  },
  { name: "Authority", label: "Орган", placeholder: "Орган", type: "text" },
  { name: "PIN", label: "ПИН", placeholder: "ПИН", type: "text" },
];
