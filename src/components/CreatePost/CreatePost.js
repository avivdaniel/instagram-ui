import React, { useContext, useRef, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { UserContext } from '../../user-context';
import { PostCreateSchema } from './postcreate.schema';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import CropCreate from './CropCreate/CropCreate';
import showResult from './CropCreate/CropCreate';
import './CreatePost.scss';
import PageLoader from '../PageLoader/PageLoader';

const initBackground = '#fafafa';

function CreatePost(props) {
    const [isLoading, setLoading] = useState(true);
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
        const data = buildFormData(values);
        await fetch(`${config.apiUrl}/posts`, {
            method: 'PUT',
            credentials: 'include',
            body: data
        });
        history.push('/');
    };


    useEffect(() => {
        setBackground(initBackground);
        setLoading(false);
    }, []);

    return (

        <div className="CreatePost d-flex flex-column h-100">
            {isLoading && <PageLoader />}
            <div className="CreatePost-bg"></div>
            <Formik
                initialValues={{ image: '', title: '' }}
                validationSchema={PostCreateSchema}
                onSubmit={submit}
            >
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form className="form d-flex flex-column h-100">

                        {/* Title and Share */}
                        <div className="CreatePost-content-container col-12 p-3 ">
                            {/* <div className="col-12 pl-0 pr-0 pt-2 d-flex flex-wrap justify-content-center">
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
                            </div> */}

                            <div className="col-12">
                                <div className="col-2 p-0 avt"><Avatar size='lg' image={user.avatar} /></div>

                                <div className="form-group">
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
                                    {isSubmitting && <PageLoader />}
                                </div>

                            </div>
                            <hr className="my-1"></hr>


                            {/* cropper and Share */}
                            <CropCreate onChange={(value) => {
                                setFieldValue('image', value);
                            }} />
                            {errors.image && <small className="text-danger pl-2">{errors.image}</small>}


                        </div>




                    </Form>
                )}
            </Formik>
        </div>


    );
}

export default CreatePost;