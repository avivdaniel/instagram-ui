import React from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './PostCreateSecontStep.scss';

export const PostCreateSecontStep = formikProps => {
    const { errors, getPrevStage, setFieldValue, submitForm } = formikProps;
    return (
        <>
            <nav className="PostCreateSecontStep d-flex justify-content-between">
                <button
                    type="button"
                    className="btn"
                    onClick={() => {
                        getPrevStage()
                    }}>
                    <span className="text-secondary"><FontAwesomeIcon icon={faAngleLeft} /></span>
                </button>

                <button
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
            {errors.image && <small className="text-danger pl-2">{errors.image}</small>}

        </>
    );
};