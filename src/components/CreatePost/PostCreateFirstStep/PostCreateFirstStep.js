
import React, { useState, useRef } from "react";
import { Field } from "formik";
import CropCreate from "./CropCreate/CropCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import "./PostCreateFirstStep.scss";

export const PostCreateFirstStep = formikProps => {
    const { errors, values, setFieldValue, submitForm, isSubmitting } = formikProps;
    const postCropRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    }

    return (
        <>
            <nav className="PostCreateFirstStep d-flex justify-content-between mb-1
            ">
                <div onClick={handleAddImageClick}>
                    <span className="btn text-secondary"><FontAwesomeIcon icon={faUpload} /></span>
                    <input type="file"
                        className='form-control d-none'
                        accept="image/*"
                        ref={fileInputRef}
                        id="image"
                        name="image"
                        onChange={(e) => {
                            return postCropRef.current.onFileChange(e);
                        }}
                    />
                </div>

                <button
                    disabled={isSubmitting}
                    onClick={async (e) => {
                        setFieldValue('isSecondButton', true)
                        const image = await postCropRef.current.showResult();
                        setFieldValue('image', image)
                        submitForm();
                    }}
                    className="btn next-btn" >
                    Next </button>
            </nav>


            <CropCreate
                ref={postCropRef}
            // image={values.image}
            />

            <div className="iphone">
                <div className="iphone__img">
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*" />
                </div>
            </div>


        </>
    );
};