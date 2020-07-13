import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'UserName should contain at least 2 characters')
        .max(16, 'UserName should contain at most 16 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password should contain at least 6 characters')
        .max(16, 'password should contain at most than 16 characters')
        .required('Password is required'),
});
