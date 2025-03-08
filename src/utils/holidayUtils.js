// src/utils/holidayUtils.js

// Function to calculate Easter Sunday date
const getEasterSunday = (year) => {
  const f = Math.floor,
        G = year % 19,
        C = Math.floor(year / 100),
        H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11)),
        J = (year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)) % 7,
        L = I - J,
        month = 3 + Math.floor((L + 40) / 44),
        day = L + 28 - 31 * Math.floor(month / 4);

  return new Date(year, month - 1, day);
};

// Function to calculate Martin Luther King, Jr. Day (Third Monday of January)
const getMLKDay = (year) => {
  const januaryFirst = new Date(year, 0, 1);
  const dayOfWeek = januaryFirst.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const firstMonday = dayOfWeek === 0 ? 2 : dayOfWeek === 1 ? 1 : 9 - dayOfWeek; // Adjust to first Monday
  const thirdMonday = firstMonday + 14; // First Monday + 2 weeks
  const mlkDay = new Date(year, 0, thirdMonday);
  return mlkDay;
};

// Function to calculate Presidents' Day (Third Monday of February)
const getPresidentsDay = (year) => {
  const februaryFirst = new Date(year, 1, 1);
  const dayOfWeek = februaryFirst.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const firstMonday = dayOfWeek === 0 ? 2 : dayOfWeek === 1 ? 1 : 9 - dayOfWeek; // Adjust to first Monday
  const thirdMonday = firstMonday + 14; // First Monday + 2 weeks
  const presidentsDay = new Date(year, 1, thirdMonday);
  return presidentsDay;
};

// Function to calculate Memorial Day (Last Monday of May)
const getMemorialDay = (year) => {
  const mayLast = new Date(year, 4, 31); // Last day of May
  const dayOfWeek = mayLast.getDay();
  const lastMonday = dayOfWeek === 1 ? 31 : (31 - (dayOfWeek - 1 + 7) % 7); // Adjust to last Monday
  return new Date(year, 4, lastMonday);
};

// Function to calculate Labor Day (First Monday of September)
const getLaborDay = (year) => {
  const septemberFirst = new Date(year, 8, 1); // September 1st
  const dayOfWeek = septemberFirst.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const firstMonday = dayOfWeek === 0 ? 2 : (dayOfWeek === 1 ? 1 : (9 - dayOfWeek));
  const laborDay = new Date(year, 8, firstMonday);
  return laborDay;
};

// Function to calculate Thanksgiving (Fourth Thursday of November)
const getThanksgiving = (year) => {
  const novemberFirst = new Date(year, 10, 1);
  const dayOfWeek = novemberFirst.getDay();
  const firstThursday = dayOfWeek <= 4 ? (5 - dayOfWeek) : (12 - dayOfWeek); // Adjust to first Thursday
  const fourthThursday = firstThursday + 21; // First Thursday + 3 weeks
  return new Date(year, 10, fourthThursday);
};

// Function to calculate the day after Thanksgiving (Fourth Friday of November)
const getDayAfterThanksgiving = (year) => {
  const thanksgiving = getThanksgiving(year);
  return new Date(thanksgiving.getFullYear(), thanksgiving.getMonth(), thanksgiving.getDate() + 1);
};

// Function to get holidays that fall on the same date every year
const getFixedHolidays = (year) => [
  new Date(year, 0, 1), // New Year's Day
  new Date(year, 5, 19), // Juneteenth
  new Date(year, 6, 4), // Independence Day
  new Date(year, 11, 24), // Christmas Eve
  new Date(year, 11, 25), // Christmas Day
  new Date(year, 11, 31) // New Year's Eve
];

const getUSHolidaysForYear = (year) => [
  ...getFixedHolidays(year),
  getMLKDay(year),
  getPresidentsDay(year),
  new Date(getEasterSunday(year).getTime() + 1 * 24 * 60 * 60 * 1000), // Easter Monday
  getMemorialDay(year),
  getLaborDay(year),
  getThanksgiving(year),
  getDayAfterThanksgiving(year),
];

const getUSHolidays = (startYear, endYear) => {
  let holidays = [];
  for (let year = startYear; year <= endYear; year++) {
    holidays = holidays.concat(getUSHolidaysForYear(year));
  }
  return holidays;
};

export { getEasterSunday, getUSHolidays };
