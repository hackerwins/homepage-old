function getYYYYMMDD() {
  const now = new Date();
  return`${now.getUTCFullYear()}${('0' + (now.getUTCMonth() + 1)).slice(-2)}${('0' + now.getUTCDate()).slice(-2)}`;
}
