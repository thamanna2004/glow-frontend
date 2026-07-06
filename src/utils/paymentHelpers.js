export function formatCardNumber(value) {
  const digits = String(value).replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function detectCardBrand(number) {
  const digits = String(number).replace(/\D/g, "");

  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^(60|65|81|82|508)/.test(digits)) return "rupay";

  return null;
}

export function formatExpiry(value) {
  const digits = String(value).replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function validateExpiry(value) {
  const match = String(value).match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiry = new Date(year, month, 0, 23, 59, 59);

  return expiry >= now;
}

export function validateCardNumber(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 13 && digits.length <= 16;
}

export function validateCvv(value, brand) {
  const digits = String(value).replace(/\D/g, "");
  const length = brand === "amex" ? 4 : 3;
  return digits.length === length;
}

export function getListPrice(item) {
  const salePrice = Number(item.price) || 0;
  const discount = Number(item.discount) || 0;
  if (discount <= 0) return salePrice;
  return Math.round((salePrice * 100) / (100 - discount));
}

export function getCartDiscountTotal(items) {
  return items.reduce((total, item) => {
    const listPrice = getListPrice(item);
    const savings = Math.max(0, listPrice - item.price);
    return total + savings * item.quantity;
  }, 0);
}
