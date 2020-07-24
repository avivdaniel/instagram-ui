import React from 'react';
import { Formik, Form, Field } from 'formik';
import config from '../../config/index';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'UserName should contain at least 2 characters')
        .max(16, 'UserName should contain at most 16 characters')
        .test('checkDuplUsername', 'This username is allready taken', (value) => isUnique('username', value))
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password should contain at least 6 characters')
        .max(16, 'password should contain at most than 16 characters')
        .required('Password is required'),
    email: Yup.string()
        .email('Invalid email')
        .test('checkDuplEmail', 'This email is allready taken', (value) => isUnique('email', value))
        .required('Email is required'),
    agreeTerms: Yup.boolean()
        .oneOf([true], 'You must agree to terms')
});

const memo = {
    username: {},
    email: {}
};


async function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    const res = await fetch(`${config.apiUrl}/users/check?${field}=${value}`);
    memo[field][value] = !(await res.json());
    return memo[field][value];
}