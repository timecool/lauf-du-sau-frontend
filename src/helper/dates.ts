import dayjs from 'dayjs';
import { isEqual } from 'lodash';

export const dateToString = (date: Date) => {
  const today = dayjs().format('DD.MM.YYYY');
  const givenDate = dayjs(date).format('DD.MM.YYYY');

  if (isEqual(givenDate, today)) {
    return 'Today';
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = dayjs(yesterday).format('DD.MM.YYYY');
  if (isEqual(yesterdayString, givenDate)) {
    return 'Yesterday';
  }
  return givenDate;
};
