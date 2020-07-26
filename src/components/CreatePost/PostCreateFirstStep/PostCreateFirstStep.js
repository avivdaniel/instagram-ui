
import React, { useState, useRef } from "react";
import { Field } from "formik";
import CropCreate from "./CropCreate/CropCreate";

export const PostCreateFirstStep = formikProps => {
    const { errors, setFieldValue } = formikProps;
    const [event, setEvent] = useState({});
    const postCropRef = useRef(null);
    return (
        <>
            <span>this is the first step</span>
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
                onClick={(e) => {
                    setFieldValue('isSecondButton', true)
                    return setFieldValue('image', postCropRef.current.showResult())
                }} >

                onlly this </button>
            {errors.image && <small className="text-danger pl-2">{errors.image}</small>}

            {/* <Field
        name="firstName"
        label="First Name *"
        as={TextField}
        error={touched.firstName && errors.firstName}
        helperText={touched.firstName && errors.firstName}
      />

      <Field name="middleName" label="Middle Name" as={TextField} />

      <Field
        name="lastName"
        label="Last Name *"
        as={TextField}
        error={touched.lastName && errors.lastName}
        helperText={touched.lastName && errors.lastName}
      /> */}
        </>
    );
};