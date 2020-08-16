import React, { useState, useEffect, useContext } from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Picker, Emoji } from 'emoji-mart';
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../user-context";
import 'emoji-mart/css/emoji-mart.css';
import './PostCreateSecondStep.scss';
import Avatar from "../../Avatar/Avatar";

export const PostCreateSecondStep = formikProps => {
    const { setFieldValue, submitForm, isSubmitting } = formikProps;
    const { user } = useContext(UserContext)
    const [reactionShown, setReactionShown] = useState(false);
    const [title, setTitle] = useState('');

    function addEmoji(e) {
        let emoji = e.native;
        setTitle(title + emoji);
    }


    return (
        <>
            <nav className="PostCreateSecondStep d-flex justify-content-end justify-content-lg-end  mb-1">

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

            <div className="PostCreateSecondStep-inputs container d-flex flex-column align-items-center">
                <div className="p-3">
                    <Avatar size='lg' image={user.avatar} />
                </div>


                <div className="input-group col-12 col-lg-6 p-0">

                    <Field
                        className='title-input form-control title-field'
                        value={title}
                        as="textarea"
                        id="title"
                        name="title"
                        aria-describedby="button-addon1"
                        placeholder='Write a caption...'
                        onChange={e => setTitle(e.target.value)}
                    />

                    <div className="input-group-prepend ">
                        <button
                            className="btn btn-primary rounded"
                            type="button"
                            id="button-addon1"
                            onClick={() => setReactionShown(!reactionShown)}>
                            <FontAwesomeIcon icon={faSmile} /></button>
                    </div>

                </div>


                {reactionShown &&
                    <div className="col-12 p-0 mt-2">

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