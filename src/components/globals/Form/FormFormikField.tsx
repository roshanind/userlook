import { Field, FieldProps, useFormikContext } from 'formik';

import { FILED_TYPE } from '@constants/form.constants';
import { FieldConfig } from '@type/form.types';

import {
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@ui';

// Generic type for the form values
type Props<FormValues> = {
  field: FieldConfig<FormValues> & { id: keyof FormValues };
  onValuesChange?: (values: FormValues) => void;
};

export default function FormFormikField<FormValues extends object>({ 
  field, 
  onValuesChange 
}: Props<FormValues>) {
  const { values, errors, touched, setFieldValue } = useFormikContext<FormValues>();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Add type assertions to handle the string indexing
  const fieldId = field.id as string;
  const hasError = touched[fieldId as keyof FormValues] && Boolean(errors[fieldId as keyof FormValues]);
  const errorMessage = hasError ? errors[fieldId as keyof FormValues] as string : '';

  let fieldComponent: React.ReactNode;

  switch (field.type) {
    case FILED_TYPE.INPUT:
      fieldComponent = (
        <Field name={fieldId}>
          {({ field: formikField }: FieldProps) => (
            <TextField
              {...formikField}
              fullWidth
              label={isSmallScreen ? field.label : undefined}
              placeholder={field.label}
              error={hasError}
              helperText={errorMessage || ''}
              size="small"
            />
          )}
        </Field>
      );
      break;

    case FILED_TYPE.OPTIONS:
      fieldComponent = (
        <FormControl fullWidth error={hasError}>
          {isSmallScreen && <FormLabel>{field.label}</FormLabel>}
          <Field name={fieldId}>
            {({ field: formikField }: FieldProps) => (
              <RadioGroup
                {...formikField}
                row={!isSmallScreen}
                onChange={(e) => setFieldValue(fieldId, e.target.value)}
              >
                {field.options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio size="small" />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            )}
          </Field>
          {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
      break;

    case FILED_TYPE.LIST:
      fieldComponent = (
        <FormControl fullWidth error={hasError} size="small">
          {isSmallScreen && <InputLabel>{field.label}</InputLabel>}
          <Field name={fieldId}>
            {({ field: formikField }: FieldProps) => (
              <Select
                {...formikField}
                label={isSmallScreen ? field.label : undefined}
                onChange={(e: SelectChangeEvent) => {
                  setFieldValue(fieldId, e.target.value);
                  if (onValuesChange && values) {
                    // Create a new values object with the updated field
                    const newValues = { 
                      ...values, 
                      [fieldId]: e.target.value 
                    } as FormValues;
                    onValuesChange(newValues);
                  }
                }}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Field>
          {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
      break;

    default:
      fieldComponent = null;
  }

  return (
    <GridContainer container spacing={2} key={fieldId}>
      {!isSmallScreen && (
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
            {field.label}
          </Typography>
        </Grid>
      )}
      <Grid size={{ xs: 12, sm: 8, md: 9 }}>
        <Fade in={true} timeout={300}>
          <Box width="100%">{fieldComponent}</Box>
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