// src/utils/dateUtils.js

import moment from 'moment';
import { getUSHolidays } from './holidayUtils';

const isHoliday = (date, holidays) => holidays.some(holiday => holiday.getTime() === date.getTime());

const adjustBusinessDays = (date, days, adjustForward) => {
  let currentDate = new Date(date);
  const holidays = getUSHolidays(currentDate.getFullYear() - 1, currentDate.getFullYear() + 1);

  while (days > 0) {
    currentDate.setDate(currentDate.getDate() + (adjustForward ? 1 : -1));
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5 && !isHoliday(currentDate, holidays)) {
      days -= 1;
    }
  }
  return moment(currentDate);
};

const addBusinessDays = (startDate, days) => adjustBusinessDays(startDate, days, true);
const subtractBusinessDays = (endDate, days) => adjustBusinessDays(endDate, days, false);

const calculateEndDate = (startDate, stages, conditions) => {
  let currentDate = moment(startDate);
  let timeline = [];

  stages.forEach(stage => {
    let duration = stage.duration || 0;

    if (stage.conditionKey && !conditions[stage.conditionKey]) {
      return;
    }

    if (stage.conditionKey && conditions[stage.conditionKey]) {
      if (stage.conditionKey.includes("Revisions")) {
        duration += (conditions[stage.conditionKey] - 1) * 2; // Add 2 days for each additional revision round
      }
    }

    if (duration <= 0) {
      return;
    }

    let stageName = stage.stageName;
    for (let i = 0; i < duration; i++) {
      if (stageName.includes("Design Revision")) {
        stageName = `Design Revision Round ${Math.ceil((i + 1) / 2)}`;
      } else if (stageName.includes("Production Revision")) {
        stageName = `Production Revision Round ${Math.ceil((i + 1) / 2)}`;
      }

      timeline.push({
        ...stage,
        stageName,
        endDate: currentDate.format('YYYY-MM-DD'),
        duration: 1
      });

      currentDate = addBusinessDays(currentDate, 1);
    }
  });

  return timeline;
};

const formatDate = (date) => moment(date).format('MMM D');

export { addBusinessDays, subtractBusinessDays, calculateEndDate, formatDate };

