import React from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './PostCreateSecontStep.scss';

export const PostCreateSecontStep = formikProps => {
    const { errors, getPrevStage, setFieldValue, submitForm, isSubmitting } = formikProps;
    return (
        <>
            <nav className="PostCreateSecontStep d-flex justify-content-between">
                <button
                    disabled={isSubmitting}
                    type="button"
                    className="btn"
                    onClick={() => {
                        getPrevStage()
                    }}>
                    <span className="text-secondary"><FontAwesomeIcon icon={faAngleLeft} /></span>
                </button>

                <button
                    disabled={isSubmitting}
                    className="btn next-btn"
                    onClick={() => {
                        setFieldValue('isSecondButton', false)
                        submitForm();
                    }}>
                    Post </button>
            </nav>

            <Field
                className='form-control title-field'
                as="textarea"
                id="title"
                name="title"
                placeholder={`whats on your mind?`}
            />

        </>
    );
};