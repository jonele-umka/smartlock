// import i18n from "../../../i18n/i18n";

// export const editObjectFields = [
//   {
//     name: "Title",
//     label: i18n.t("label_title"),
//     placeholder: i18n.t("placeholder_title"),
//     rules: { required: i18n.t("required_field") },
//   },
//   {
//     name: "Description",
//     label: i18n.t("label_description"),
//     placeholder: i18n.t("placeholder_description"),
//     rules: { required: i18n.t("required_field") },
//     multiline: true,
//     numberOfLines: 7,
//     textAlignVertical: "top",
//   },
//   {
//     name: "LocationLabel",
//     label: i18n.t("label_location"),
//     placeholder: i18n.t("placeholder_location"),
//     rules: { required: i18n.t("required_field") },
//   },
//   {
//     name: "Country",
//     label: i18n.t("label_country"),
//     placeholder: i18n.t("placeholder_country"),
//     rules: { required: i18n.t("required_field") },
//   },
//   {
//     name: "City",
//     label: i18n.t("label_city"),
//     placeholder: i18n.t("placeholder_city"),
//     rules: { required: i18n.t("required_field") },
//   },
//   {
//     name: "Price",
//     label: i18n.t("label_price"),
//     placeholder: i18n.t("placeholder_price"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
//   {
//     name: "DiscountPrice",
//     label: i18n.t("label_discount_price"),
//     placeholder: i18n.t("placeholder_discount_price"),
//     render: false,
//     keyboardType: "numeric",
//   },
//   {
//     name: "PriceDescription",
//     label: i18n.t("label_price_description"),
//     placeholder: i18n.t("placeholder_price_description"),
//     render: false,
//   },
//   {
//     name: "PeopleQuantity",
//     label: i18n.t("label_people_quantity"),
//     placeholder: i18n.t("placeholder_people_quantity"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
//   {
//     name: "RoomsQuantity",
//     label: i18n.t("label_rooms_quantity"),
//     placeholder: i18n.t("placeholder_rooms_quantity"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
//   {
//     name: "Bedrooms",
//     label: i18n.t("label_bedrooms"),
//     placeholder: i18n.t("placeholder_bedrooms"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
//   {
//     name: "Bathrooms",
//     label: i18n.t("label_bathrooms"),
//     placeholder: i18n.t("placeholder_bathrooms"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
//   {
//     name: "Beds",
//     label: i18n.t("label_beds"),
//     placeholder: i18n.t("placeholder_beds"),
//     rules: { required: i18n.t("required_field") },
//     keyboardType: "numeric",
//   },
// ];

// export const registrationFields = [
//   {
//     name: "Email",
//     label: i18n.t("email"),
//     placeholder: i18n.t("enterEmail"),
//     icon: "mail",
//     rules: {
//       required: i18n.t("required"),
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: i18n.t("validEmail"),
//       },
//     },
//   },
//   {
//     name: "Nickname",
//     label: i18n.t("nickname"),
//     placeholder: i18n.t("enterNickname"),
//     icon: "user",
//     rules: {
//       required: i18n.t("required"),
//     },
//   },
//   {
//     name: "Password",
//     label: i18n.t("password"),
//     placeholder: i18n.t("enterPassword"),
//     icon: "lock",
//     rules: {
//       required: i18n.t("required"),
//       minLength: { value: 8, message: i18n.t("minPassword") },
//       pattern: {
//         value: /^[^\sа-яА-Я]+$/i,
//         message: i18n.t("enterLatin"),
//       },
//     },
//   },
//   {
//     name: "PasswordConfirm",
//     label: i18n.t("confirmYourPassword"),
//     placeholder: i18n.t("confirmYourPassword"),
//     icon: "lock",
//     rules: {
//       required: i18n.t("required"),
//       minLength: { value: 8, message: i18n.t("minPassword") },
//       pattern: {
//         value: /^[^\sа-яА-Я]+$/i,
//         message: i18n.t("enterLatin"),
//       },
//     },
//   },
// ];
// export const ownerFields = [
//   {
//     name: "Surname",
//     label: i18n.t("surname"),
//     placeholder: i18n.t("surname"),
//     type: "text",
//   },
//   {
//     name: "Name",
//     label: i18n.t("name"),
//     placeholder: i18n.t("name"),
//     type: "text",
//   },
//   {
//     name: "Patronymic",
//     label: i18n.t("patronymic"),
//     placeholder: i18n.t("patronymic"),
//     type: "text",
//   },
//   {
//     name: "Nationality",
//     label: i18n.t("nationality"),
//     placeholder: i18n.t("enterNationality"),
//     type: "text",
//   },
//   {
//     name: "DateOfBirth",
//     label: i18n.t("dateOfBirth"),
//     placeholder: "1996-10-02",
//     type: "date",
//   },
//   {
//     name: "PlaceOfBirth",
//     label: i18n.t("placeOfBirth"),
//     placeholder: i18n.t("placeOfBirth"),
//     type: "text",
//   },
//   {
//     name: "IDPassportType",
//     label: i18n.t("passportType"),
//     placeholder: i18n.t("enterPassportType"),
//     type: "text",
//   },
//   {
//     name: "DocumentNumber",
//     label: i18n.t("documentNumber"),
//     placeholder: i18n.t("enterDocNumber"),
//     type: "text",
//   },
//   {
//     name: "DateOfIssue",
//     label: i18n.t("dateOfIssue"),
//     placeholder: i18n.t("dateOfIssue"),
//     type: "date",
//   },
//   {
//     name: "DateOfExpiry",
//     label: i18n.t("dateOfExpiry"),
//     placeholder: i18n.t("dateOfExpiry"),
//     type: "date",
//   },
//   {
//     name: "Authority",
//     label: i18n.t("authority"),
//     placeholder: i18n.t("enterAuthority"),
//     type: "text",
//   },
//   {
//     name: "PIN",
//     label: i18n.t("pin"),
//     placeholder: i18n.t("pin"),
//     type: "text",
//   },
// ];
