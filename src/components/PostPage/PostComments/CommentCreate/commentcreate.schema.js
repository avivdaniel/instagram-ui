import React from 'react';
import * as Yup from 'yup';

export const CommentCreateSchema = Yup.object().shape({
    content: Yup.string()
        .max(200, 'comment is too long')
        .required('comment is required')
});