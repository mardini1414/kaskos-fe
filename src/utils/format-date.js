import * as luxon from 'luxon';

function formatDate(date) {
  const formated = luxon.DateTime.fromISO(date).toFormat('dd MMMM y T', {
    locale: 'id',
  });
  return formated;
}

export default formatDate;
