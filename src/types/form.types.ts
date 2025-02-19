import { FILED_TYPE, FORM_MODE } from '@constants/form.constants';
import { AnySchema } from 'yup';

type FieldType = (typeof FILED_TYPE)[keyof typeof FILED_TYPE];

export type FieldConfig<T> = {
  id: keyof T;
  label: string;
  type: FieldType;
  initialValue: T[keyof T];
  validation?: AnySchema;
  options?: Array<{
    value: string;
    label: string;
  }>;
};

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];
