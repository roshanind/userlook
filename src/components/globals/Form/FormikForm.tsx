import { Grid, Paper } from '@ui';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { FieldConfig, FormMode } from '@type/form.types';
import { FORM_MODE } from '@constants/form.constants';

import FormFormikField from './FormFormikField';
import FormDisplayField from './FormDisplayField';

// Generic FormValues type with constraint that ensures field IDs are keys of FormValues
type Props<FormValues> = {
  fields: Array<FieldConfig<FormValues>>;
  mode: FormMode;
  formRef?: React.RefObject<FormikProps<FormValues>>;
  formActions?: (props: { isValid: boolean; isSubmitting: boolean; submitForm: () => void; resetForm: () => void }) => React.ReactNode;
  onSubmit?: (values: FormValues, actions: {
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
  }) => Promise<void> | void;
};

// Build the validation schema from the field configs
const buildValidationSchema = <FormValues extends object>(
  fields: Array<FieldConfig<FormValues>>
): Yup.ObjectSchema<FormValues> => {
  const schemaFields: Record<string, Yup.AnySchema> = {};

  fields.forEach((field) => {
    if (field.validation) {
      schemaFields[field.id as string] = field.validation;
    }
  });

  return Yup.object().shape(schemaFields) as Yup.ObjectSchema<FormValues>;
};

// Build initial values from the field configs
const buildInitialValues = <FormValues extends object>(
  fields: Array<FieldConfig<FormValues>>
): FormValues => {
  const initialValues = {} as Record<keyof FormValues, FormValues[keyof FormValues]>;

  fields.forEach((field) => {
    initialValues[field.id] = field.initialValue as FormValues[keyof FormValues];
  });

  return initialValues as FormValues;
};

export default function FormikForm<FormValues extends object>({ fields, mode, formRef, formActions, onSubmit }: Props<FormValues>) {
  const validationSchema = buildValidationSchema<FormValues>(fields);
  const initialValues = buildInitialValues<FormValues>(fields);

  if (mode === FORM_MODE.VIEW) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
        {fields.map((field) => (
          <FormDisplayField key={field.id as string} field={field} />
        ))}
      </Paper>
    );
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (onSubmit) {
            await onSubmit(values, { setSubmitting, resetForm });
          }
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setSubmitting(false);
        }
      }}
      innerRef={formRef}
    >
      {({ isValid, isSubmitting, submitForm, resetForm, dirty }) => (
        <Form>
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            {fields.map((field) => (
              <FormFormikField<FormValues> key={field.id as string} field={field} />
            ))}
            {formActions && (
              <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                {formActions({
                  isValid: isValid && dirty,
                  isSubmitting: isSubmitting,
                  submitForm: submitForm,
                  resetForm: resetForm
                })}
              </Grid>
            )}
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
