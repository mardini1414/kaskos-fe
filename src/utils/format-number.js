function formatNumber(num) {
  const formattedAngka = parseFloat(num).toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  });
  return formattedAngka;
}

export default formatNumber;
