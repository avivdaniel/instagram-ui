import React, { useContext, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { UserContext } from '../../user-context';
import { PostCreateSchema } from './postcreate.schema';
import { Link, useHistory } from 'react-router-dom';
import MenuAvatar from '../Menu/MenuAvatar/MenuAvatar';
import config from '../../config/index';
import Loader from '../Loader/Loader';
import Avatar from '../Avatar/Avatar';
import './CreatePost.scss';
import CropCreate from './CropCreate/CropCreate';

const initBackground = 'white';

function CreatePost(props) {
    // const imgRef = useRef(null);
    // const fileInputRef = useRef(null);
    const history = useHistory();
    const { user, setBackground } = useContext(UserContext);

    const builtFormData = (values) => {
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }

    const submit = async (values) => {
        const data = builtFormData(values);
        const res = await fetch(`${config.apiUrl}/posts`, {
            method: 'PUT',
            credentials: 'include',
            body: data
        });
        if (res.status === 201) {
            history.push('/');
        } else {
            console.log('unknown error');
        }
        return res;
    };

    // const onFileSelected = e => {
    //     const selectedFile = e.target.files[0];
    //     console.log(selectedFile);
    //     const reader = new FileReader();
    //     reader.onload = e => {
    //         imgRef.current.src = e.target.result;
    //         imgRef.current.title = selectedFile.name;
    //     };
    //     reader.readAsDataURL(selectedFile);
    // };


    useEffect(() => {
        setBackground(initBackground);
    }, []);

    return (
        <div className="CreatePost d-flex justify-content-center h-100">
            <Formik
                initialValues={{ image: '', title: '' }}
                validationSchema={PostCreateSchema}
                onSubmit={submit}
            >
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form className="form col-12 col-lg-6 w-100 h-100 d-flex flex-column justify-content-center align-items-center shadow-lg">

                        {/* Image displayer */}

                        {/* <div className="CreatePost-img-container col-12 d-flex justify-content-center align-items-center rounded"> */}

                        <CropCreate setFieldValue={setFieldValue} />

                        {/* </div> */}

                        {/* <div className="exam col-12 col-lg-6 p-0 d-flex justify-content-center align-items-center">
                            <div className="CreatePost-img-container col-12 d-flex justify-content-center align-items-center rounded" onClick={onImageDisplayerClick}>

                                <img ref={imgRef} height="200" />

                                <div className="form-group">
                                    <input className='form-control d-none' ref={fileInputRef} type="file" accept="image/*" id="image" placeholder="select image" name="image" onChange={(e) => {
                                        onFileSelected(e);
                                        setFieldValue('image', e.currentTarget.files[0]);
                                    }} />
                                    {errors.image && <small className="img-err text-danger pl-2">{errors.image}</small>}
                                </div>

                            </div>
                        </div> */}


                        {/* Title and Share */}
                        <div className="CreatePost-content-container col-12">
                            <div className="col-12 pl-0 pr-0 pt-2 d-flex flex-wrap">
                                <div className="col-2 p-0"><Avatar size='sm' /></div>

                                <div className="form-group col-10 d-flex align-items-center justify-content-center pr-0">
                                    <Field className='form-control title-field' as="textarea" id="title" placeholder={`${user && user.username}, whats on your mind?`} name="title" />
                                    {errors.title && <small className="text-danger pl-2">{errors.title}</small>}
                                </div>
                            </div>

                            <div className="col d-flex justify-content-end  text-right p-0">

                                <div className="CreatePost-btn col-8 col-lg-4 pb-2">
                                    <button type="submit" className="btn btn-primary btn-block text-uppercase" disabled={isSubmitting}>Share</button>
                                    {isSubmitting && <Loader isLoading={true} />}
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