export const FormatDatePassport = (text) => {
  const cleaned = text.replace(/[^0-9]/g, "");

  let formattedText = cleaned;

  if (cleaned.length > 4 && cleaned.length <= 6) {
    formattedText = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  } else if (cleaned.length > 6) {
    formattedText = `${cleaned.slice(0, 4)}-${cleaned.slice(
      4,
      6
    )}-${cleaned.slice(6, 8)}`;
  }

  return formattedText;
};
