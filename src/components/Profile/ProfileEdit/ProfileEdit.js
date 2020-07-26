import React, { useContext, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ProfileEditSchema } from './profileedit.schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../user-context';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import onAllProfileSubmit from './CropAvatar/CropAvatar';
import CropAvatar from './CropAvatar/CropAvatar';
import config from '../../../config/index';
import './ProfileEdit.scss';

function ProfileEdit(props) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    let cropAvatarRef = useRef(null);

    const buildFormData = (values) => {
        console.log(values)
        for (let key in values) {
            if (values[key] === undefined) {
                delete values[key];
            }
        }
        const data = new FormData();
        for (let key in values) {
            data.append(key, values[key]);
        }
        return data;
    };

    const submit = async values => {
        const avatar = await cropAvatarRef.current.showResult();
        console.log(avatar)
        let data;

        data = buildFormData({ ...values, avatar });

        console.log(data)
        const req = await fetch(`${config.apiUrl}/users/${user._id}`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });
        const editedUser = await req.json();
        // setUser(editedUser);
        // props.setUserImage(editedUser.avatar);
        // history.push(`/profile/${editedUser._id}`);

    }

    return (
        <div className="ProfileEdit">
            <button type="button" className=" btn btn-primary btn-edit m-2" data-toggle="modal" data-target="#exampleModal">
                <FontAwesomeIcon icon={faEdit} /> Edit
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog h-100" role="document">
                    <div className="modal-content h-100">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h-100">

                            <Formik
                                initialValues={{ bio: '', avatar: '' }}
                                validationSchema={ProfileEditSchema}
                                validateOnChange={true}
                                validateOnBlur={true}
                                onSubmit={submit}
                            >

                                {({ errors, touched, isSubmitting, setFieldValue }) => (
                                    <Form className="form d-flex flex-column h-100" noValidate>

                                        <div className="col-12 cropper-container">
                                            <CropAvatar
                                                avatarImage={user.avatar}
                                                ref={cropAvatarRef} />
                                        </div>


                                        <div className="ProfileEdit-inputs-container">
                                            <div className="form-group my-2">
                                                <Field as="textarea" className="form-control" id="bio" placeholder="Bio" name="bio" />
                                                <FontAwesomeIcon className="ProfileEdit-form-icon" icon={faLock} />
                                                {errors.bio && <small className="text-danger pl-2">{errors.bio}</small>}
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                                <Field className='form-control' id="username" placeholder="Username" name="username" />
                                                <FontAwesomeIcon className="ProfileEdit-form-icon" icon={faUserCircle} />
                                                {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
                                            </div> */}




                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting} >Save changes</button>
                                        </div>



                                    </Form>

                                )}
                            </Formik>
                        </div>


                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProfileEdit;