import * as yup from 'yup';

export const userDataSchema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email('Invalid email address'),
  phone: yup.string().matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, {message: 'Invalid phone number'}),
  city: yup.string(),
  userDesc: yup.string(),
});
