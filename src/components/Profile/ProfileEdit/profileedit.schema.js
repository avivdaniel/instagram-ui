import React from 'react';
import { Formik, Form, Field } from 'formik';
import config from '../../../config/index';
import * as Yup from 'yup';

export const ProfileEditSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'UserName should contain at least 2 characters')
        .max(16, 'UserName should contain at most 16 characters')
        .test('checkDuplUsername', 'This username is allready taken', (value) => isUnique('username', value)),
    bio: Yup.string()
        .max(30, 'bio should contain at most than 30 characters')
});

const memo = {
    username: {}
};


async function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    const res = await fetch(`${config.apiUrl}/users/check?${field}=${value}`);
    memo[field][value] = !(await res.json());
}

