
import React, { useRef } from "react";
import CropCreate from "./CropCreate/CropCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
            <nav className="PostCreateFirstStep
            ">
                <ul className="nav  d-flex justify-content-between justify-content-md-center mb-1">
                    <li onClick={handleAddImageClick} className="nav-item">
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
                    </li>
                    <li className="nav-item">

                        <button
                            disabled={isSubmitting}
                            onClick={async (e) => {
                                setFieldValue('isSecondButton', true)
                                const image = await postCropRef.current.showResult();
                                setFieldValue('image', image)
                                submitForm();
                            }}
                            className="btn next-btn" >
                            Next
                     </button>
                    </li>
                </ul>

            </nav>


            <CropCreate
                ref={postCropRef}
            />




        </>
    );
};