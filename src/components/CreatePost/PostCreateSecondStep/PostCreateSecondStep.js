import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import './PostCreateSecondStep.scss';

export const PostCreateSecondStep = formikProps => {
    const { errors, getPrevStage, setFieldValue, submitForm, isSubmitting, values } = formikProps;
    const [reactionShown, setReactionShown] = useState(false);
    const [title, setTitle] = useState('');

    function addEmoji(e) {
        let emoji = e.native;
        setTitle(title + emoji);
    }

    useEffect(() => { console.log(values) }, [])

    return (
        <>
            <nav className="PostCreateSecondStep d-flex justify-content-between mb-1">
                {/* <button
                    disabled={isSubmitting}
                    className="btn"
                    onClick={() => {
                        getPrevStage()
                    }}>
                    <span className="text-secondary"><FontAwesomeIcon icon={faAngleLeft} /></span>
                </button> */}

                <button
                    disabled={isSubmitting}
                    className="btn next-btn"
                    onClick={() => {
                        setFieldValue('isSecondButton', false)
                        setFieldValue('title', title)
                        submitForm();
                    }}>
                    Post </button>


            </nav>

            <div className="container d-flex flex-column align-items-center">
                {/* <img src={values.image} /> */}
                <div className="input-group">

                    <Field
                        className='form-control title-field'
                        value={title}
                        as="textarea"
                        id="title"
                        name="title"
                        aria-describedby="button-addon1"
                        placeholder='Write a caption...'
                        onChange={e => setTitle(e.target.value)}
                    />

                    <div className="input-group-prepend">
                        <button className="btn btn-primary" type="button" id="button-addon1" onClick={() => setReactionShown(!reactionShown)}>Button</button>
                    </div>

                </div>


                {reactionShown &&
                    <div className="col-12">

                        <Picker
                            style={{ width: '100%' }}
                            onSelect={addEmoji}
                            color='#00b7d6'
                            title='Pick your emoji…' emoji='point_up' />

                    </div>
                }

            </div>


        </>
    );
};