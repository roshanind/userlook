import { MonthDistribution } from '@type/graphs.types';
import { User } from '@type/user.types';
import { transformBirthdayDistribution } from '@utils/GraphUtils';

import PieChart from '@ui/Graphs/PieChart';

type Props = {
  users: User[];
};

export default function UserBirthMonthDistributionChart({ users }: Props) {
  const monthDistribution = transformBirthdayDistribution(users);
  return (
    <PieChart<MonthDistribution>
      data={monthDistribution}
      valueKey="count"
      labelKey="month"
      colorKey="color"
      title="User Birth Month Distribution"
      showLegend={true}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    />
  );
}
