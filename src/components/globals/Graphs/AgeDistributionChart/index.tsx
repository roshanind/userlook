import { AgeGroup } from '@type/graphs.types';
import { User } from '@type/user.types';
import { getAgeGroups } from '@utils/GraphUtils';

import BarChart from '@ui/Graphs/BarChart';

export default function AgeDistributionChart({ users }: { users: User[] }) {
  const ageGroups = getAgeGroups(users);

  return (
    <BarChart<AgeGroup>
      data={ageGroups}
      xKey="label"
      yKey="count"
      xAxisLabel="Age Range"
      yAxisLabel="Number of Users"
      title="Age Distribution"
    />
  );
}
