import { Fade, Grid, styled, Typography } from '@ui';

import { FieldConfig } from '@type/form.types';
import { FILED_TYPE } from '@constants/form.constants';

type Props<FormValues> = {
  field: FieldConfig<FormValues>;
};

const getDisplayValue = <FormValues extends object>(field: FieldConfig<FormValues>, value: string) => {
  if ((field.type === FILED_TYPE.LIST || field.type === FILED_TYPE.OPTIONS) && field.options) {
    const selectedOption = field.options.find((option) => option.value === value);
    if (selectedOption) {
      return selectedOption.label;
    }
  }
  return value || 'Not specified';
};

export default function FormDisplayField<FormValues extends object>({ field }: Props<FormValues>) {
  const value = String(field.initialValue);
  const displayValue = getDisplayValue<FormValues>(field, value);

  return (
    <GridContainer container spacing={2} key={String(field.id)}>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
          {field.label}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 9 }}>
        <Fade in={true} timeout={300}>
          <Typography variant="body1">{displayValue}</Typography>
        </Fade>
      </Grid>
    </GridContainer>
  );
}

const GridContainer = styled(Grid)`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1)};
`;
