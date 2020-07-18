import React, { useContext, useRef, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { UserContext } from '../../user-context';
import { PostCreateSchema } from './postcreate.schema';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/index';
import AppLoader from '../AppLoader/AppLoader';
import Avatar from '../Avatar/Avatar';
import CropCreate from './CropCreate/CropCreate';
import showResult from './CropCreate/CropCreate';
import './CreatePost.scss';

const initBackground = 'white';

function CreatePost(props) {
    const [isLoading, setisLoading] = useState(true);
    const history = useHistory();
    const { user, setBackground } = useContext(UserContext);

    const buildFormData = (values) => {
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key]);
        }
        return data;
    };

    const submit = async (values) => {
        console.log('clicked')
        const data = buildFormData(values);
        console.log(values);
        console.log(data);
        await fetch(`${config.apiUrl}/posts`, {
            method: 'PUT',
            credentials: 'include',
            body: data
        });
        history.push('/');
    };

    // const countLettersLeft = (e) => {
    //     console.log(e.target.value)
    // }


    useEffect(() => {
        setBackground(initBackground);
    }, []);

    return (
        <div className="CreatePost container-fluid d-flex justify-content-center h-100">
            <Formik
                initialValues={{ image: '', title: '' }}
                // validationSchema={PostCreateSchema}
                onSubmit={submit}
            >
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form className="form col-12 col-lg-6 w-100 h-100 d-flex flex-column justify-content-center align-items-center shadow-lg">

                        <CropCreate setFieldValue={setFieldValue} />
                        {/* {errors.image && <small className="text-danger pl-2">{errors.image}</small>} */}

                        {/* Title and Share */}
                        <div className="CreatePost-content-container col-12 p-3 ">
                            <div className="col-12 pl-0 pr-0 pt-2 d-flex flex-wrap justify-content-center">
                                <div className="col-2 p-0"><Avatar size='md' image={user.avatar} /></div>

                                <div className="form-group col-10 col-lg-8 d-flex align-items-center justify-content-center pr-0">
                                    <Field className='form-control title-field'
                                        as="textarea"
                                        id="title"
                                        placeholder={`${user && user.username}, whats on your mind?`}
                                        name="title"
                                    />
                                    {errors.title && <small className="text-danger pl-2">{errors.title}</small>}
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-center p-0">

                                <div className="CreatePost-btn col-4 col-lg-2 pb-2">
                                    <button type="submit" className="btn btn-primary btn-block text-uppercase" disabled={isSubmitting || errors.image}>Share</button>
                                    {isSubmitting && <AppLoader />}
                                </div>

                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>


    );
}

export default CreatePost;