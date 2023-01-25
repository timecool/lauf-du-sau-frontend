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

export const sameDay = (d1: Date, d2: Date) => {
  return (
    isEqual(d1.getFullYear(), d2.getFullYear()) &&
    isEqual(d1.getMonth(), d2.getMonth()) &&
    isEqual(d1.getDate(), d2.getDate())
  );
};
