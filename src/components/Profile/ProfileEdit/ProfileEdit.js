import React, { Fragment, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, Link } from 'react-router-dom';
import { ProfileEditSchema } from './profileedit.schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../user-context';
import { UserService } from '../../../services/user-service';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import CropAvatar from './CropAvatar/CropAvatar';
import config from '../../../config/index';
import './ProfileEdit.scss';

function ProfileEdit(props) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);


    const buildFormData = (values) => {
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key]);
        }
        return data;
    };

    const submit = async (values) => {
        console.log(values)
        const data = buildFormData(values);

        const res = await fetch(`${config.apiUrl}/users/${user._id}`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });

        // if (res.status === 200) {
        //     getUser();
        // }
        // } else if (res.status === 409) {
        //     setError(true);
        // } else {
        //     console.log('unknown')
        // }
        return res;
    };

    async function getUser() {
        const user = await UserService.get();
        setUser(user);
        if (user) {
            history.push('/');
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>


            <div className="ProfileEdit modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                initialValues={{ username: '', bio: '', avatar: '' }}
                                validationSchema={ProfileEditSchema}
                                validateOnChange={true}
                                onSubmit={submit}
                            >

                                {({ errors, touched, isSubmitting, setFieldValue }) => (
                                    <Form className="form d-flex flex-column h-100" noValidate>

                                        <div className="col-12 cropper-container">
                                            <CropAvatar onChange={value => {
                                                setFieldValue('avatar', value);
                                            }} />
                                        </div>


                                        <div className="col-12 inputs-container">
                                            <div className="form-group">
                                                <Field className='form-control' id="username" placeholder="Username" name="username" />
                                                <FontAwesomeIcon className="Register-form-icon" icon={faUserCircle} />
                                                {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
                                            </div>

                                            <div className="form-group m-0">
                                                <Field as="textarea" className="form-control" id="bio" placeholder="Bio" name="bio" />
                                                <FontAwesomeIcon className="Register-form-icon" icon={faLock} />
                                                {errors.bio && <small className="text-danger pl-2">{errors.bio}</small>}
                                            </div>


                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary" disabled={isSubmitting} >Save changes</button>
                                            </div>
                                        </div>


                                    </Form>

                                )}
                            </Formik>
                        </div>


                    </div>
                </div>
            </div>
        </Fragment >
    );
}

export default ProfileEdit;