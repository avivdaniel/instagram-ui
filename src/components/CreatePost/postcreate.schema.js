import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { faYelp } from '@fortawesome/free-brands-svg-icons';

export const PostCreateSchema = Yup.object().shape({
    image: Yup.mixed().required('Image is required'),
    title: Yup.string()
        .max(200, 'Description is too long')
});