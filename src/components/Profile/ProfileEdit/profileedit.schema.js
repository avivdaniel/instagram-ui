import React from 'react';
import { Formik, Form, Field } from 'formik';
import config from '../../../config/index';
import * as Yup from 'yup';

export const ProfileEditSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long')
        .required('Full Name is required')
        .matches(
            /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
            "Please enter your full name."
        ),
    avatar: Yup.string(),
    bio: Yup.string()
        .max(30, 'bio should contain at most than 30 characters')
});


