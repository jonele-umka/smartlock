export const FormatDatePassport = (text) => {
  const cleaned = text.replace(/[^0-9]/g, "").slice(0, 8);

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  } else {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
  }
};

export const convertToISODate = (input) => {
  const [day, month, year] = input.split("-");
  return `${year}-${month}-${day}`;
};

export const formatFromISOToDisplay = (isoDate) => {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};
