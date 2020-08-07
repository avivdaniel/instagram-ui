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
import CropAvatar from './CropAvatar/CropAvatar';
import config from '../../../config/index';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ProfileEdit.scss';

function ProfileEdit(props) {
    const formRef = useRef(null);
    const history = useHistory();
    const { user, setUser, setLastEdited } = useContext(UserContext);
    let cropAvatarRef = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buildFormData = (values) => {
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

    const submit = async (values, { resetForm }) => {
        const avatar = await cropAvatarRef.current.showResult();
        const updatedValues = { ...values, avatar };
        const data = buildFormData(updatedValues);
        const req = await fetch(`${config.apiUrl}/users/${user._id}`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });
        const editedUser = await req.json();
        setUser(editedUser);
        setLastEdited(new Date());
        // history.push(`/profile/${editedUser._id}`);

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn-edit m-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
      </Button>

            <Modal show={show} onHide={handleClose} dialogClassName={'ProfileEdit'}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ProfileEdit-content">
                    <Formik
                        innerRef={formRef}
                        initialValues={{ fullName: user.fullName, bio: user.bio, avatar: '' }}
                        validationSchema={ProfileEditSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={submit}
                    >

                        {({ errors, isSubmitting, setFieldValue }) => (
                            <Form className="form d-flex flex-column h-100" noValidate>

                                <div className="col-12 cropper-container">
                                    <CropAvatar
                                        avatarImage={user.avatar}
                                        ref={cropAvatarRef} />
                                </div>


                                <div className="ProfileEdit-inputs-container">
                                    <div className="form-group my-2">
                                        <Field className="form-control" id="fullName" placeholder="Full name" name="fullName" />
                                        <FontAwesomeIcon className="ProfileEdit-form-icon" icon={faUserCircle} />
                                        {errors.fullName && <small className="text-danger pl-2">{errors.fullName}</small>}
                                    </div>

                                    <div className="form-group my-2">
                                        <Field as="textarea" className="form-control" id="bio" placeholder="Bio" name="bio" />
                                        <FontAwesomeIcon className="ProfileEdit-form-icon" icon={faLock} />
                                        {errors.bio && <small className="text-danger pl-2">{errors.bio}</small>}
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={async () => {
                        await formRef.current.submitForm();
                        handleClose();
                    }}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileEdit;