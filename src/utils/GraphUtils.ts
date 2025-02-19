import { MONTH_COLORS, MONTH_NAMES } from '@constants/graph.constants';
import { AgeGroup, MonthDistribution } from '@type/graphs.types';
import { User } from '@type/user.types';

export const getAgeGroups = (users: User[]): AgeGroup[] => {
  const ageGroups = [
    { label: '18-25', count: 0 },
    { label: '26-35', count: 0 },
    { label: '36-45', count: 0 },
    { label: '46-60', count: 0 },
    { label: '60+', count: 0 },
  ];

  users.forEach((user) => {
    const age = user.age;
    if (age >= 18 && age <= 25) {
      ageGroups[0].count++;
    } else if (age >= 26 && age <= 35) {
      ageGroups[1].count++;
    } else if (age >= 36 && age <= 45) {
      ageGroups[2].count++;
    } else if (age >= 46 && age <= 60) {
      ageGroups[3].count++;
    } else if (age > 60) {
      ageGroups[4].count++;
    }
  });

  return ageGroups;
};

export const transformBirthdayDistribution = (users: User[]): MonthDistribution[] => {
  // Initialize counts for each month
  const monthlyCounts = new Array(12).fill(0);

  // Count birthdays per month
  users.forEach((user) => {
    if (user.birthday) {
      // Extract month from birthday (assuming format like "YYYY-MM-DD")
      const month = new Date(user.birthday).getMonth();
      if (!isNaN(month)) {
        monthlyCounts[month]++;
      }
    }
  });

  // Create distribution data with proper formatting
  return monthlyCounts.map((count, index) => ({
    month: MONTH_NAMES[index],
    count,
    color: MONTH_COLORS[index],
  }));
};
