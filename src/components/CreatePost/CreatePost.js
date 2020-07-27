import React, { useContext, useRef, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { UserContext } from '../../user-context';
import { PostCreateSchema } from './postcreate.schema';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import PageLoader from '../PageLoader/PageLoader';
import { PostCreateFirstStep } from './PostCreateFirstStep/PostCreateFirstStep';
import { PostCreateSecontStep } from './PostCreateSecontStep/PostCreateSecontStep';
import './CreatePost.scss';

const initBackground = '#fafafa';


const renderStep = (step, values, errors, setFieldValue, submitForm, isSubmitting) => {
    switch (step) {
        case 1:
            return <PostCreateFirstStep errors={errors} submitForm={submitForm} setFieldValue={setFieldValue} />
        case 2:
            return <PostCreateSecontStep errors={errors} submitForm={submitForm} setFieldValue={setFieldValue} />
        default:
            return <PostCreateFirstStep errors={errors} setFieldValue={setFieldValue} />;
    }
}


export const CreatePost = (props) => {
    const [isLoading, setLoading] = useState(true);
    const { user, setBackground } = useContext(UserContext);
    const [step, setStep] = useState(1);
    const history = useHistory();

    const formData = {
        isSecondButton: false,
        image: '',
        title: ''
    }

    const handleSubmit = async (values) => {
        if (values.isSecondButton) {
            setStep(step => step + 1);
            console.log("hey first!")
            console.log(values)
        } else {
            setStep(step => step + 1);
            console.log('onlysecond!!!')
            const data = buildFormData(values);
            await fetch(`${config.apiUrl}/posts`, {
                method: 'PUT',
                credentials: 'include',
                body: data
            });
            history.push('/');
        }
    }


    function buildFormData(values) {
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key]);
        }
        return data;
    };


    useEffect(() => {
        setBackground(initBackground);
        setLoading(false);
    }, []);

    return (

        <div className="CreatePost container d-flex flex-column h-100">
            {isLoading && <PageLoader />}
            <Formik
                initialValues={{ ...FormData }}
                validationSchema={PostCreateSchema}
                onSubmit={handleSubmit}
            >

                {({ values, errors, touched, setFieldValue, submitForm, isSubmitting }) => (
                    <Form className="h-100 d-flex flex-column">
                        {renderStep(step, values, errors, setFieldValue, submitForm, isSubmitting)}
                    </Form>
                )}

            </Formik>


        </div >


    );
}
