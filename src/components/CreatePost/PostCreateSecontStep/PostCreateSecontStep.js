
import React from "react";
import { Field } from "formik";

export const PostCreateSecontStep = formikProps => {
    const { errors, setFieldValue, submitForm } = formikProps;
    return (
        <>
            <span>this is the first step</span>
            <Field
                className='form-control title-field'
                as="textarea"
                id="title"
                name="title"
                placeholder={`whats on your mind?`}
            />
            {errors.image && <small className="text-danger pl-2">{errors.image}</small>}

            <button
                type="submit"
                onClick={() => {
                    setFieldValue('isSecondButton', false)
                    submitForm();
                }}>
                Post </button>
        </>
    );
};