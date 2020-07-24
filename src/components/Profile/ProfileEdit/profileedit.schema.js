import React from 'react';
import { Formik, Form, Field } from 'formik';
import config from '../../../config/index';
import * as Yup from 'yup';

export const ProfileEditSchema = Yup.object().shape({
    avatar: Yup.string(),
    bio: Yup.string()
        .max(30, 'bio should contain at most than 30 characters')
});

const memo = {
    username: {}
};

