
import React, { useState, useRef } from "react";
import { Field } from "formik";
import CropCreate from "./CropCreate/CropCreate";

export const PostCreateFirstStep = formikProps => {
    const { errors, setFieldValue, submitForm } = formikProps;
    const [event, setEvent] = useState({});
    const postCropRef = useRef(null);
    return (
        <>
            <CropCreate
                ref={postCropRef}
                event={event}
                onChange={(value) => {
                    setFieldValue('image', value);
                }} />

            <input type="file"
                className='form-control'
                accept="image/*"
                id="image"
                name="image"
                onChange={(e) => {
                    return postCropRef.current.onFileChange(e);
                }}
            />

            <button
                type="submit"
                onClick={async (e) => {
                    setFieldValue('isSecondButton', true)
                    const image = await postCropRef.current.showResult();
                    setFieldValue('image', image)
                    submitForm();
                }}
                className="" >

                next </button>
            {errors.image && <small className="text-danger pl-2">{errors.image}</small>}

        </>
    );
};