import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { RegisterSchema } from './register.schema';
import { Link, useHistory } from 'react-router-dom';
import RegisterModal from './RegisterModal/RegisterModal';
import config from '../../config/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './Register.scss';

function Register(props) {
    const history = useHistory();
    const [showError, setError] = useState(false);
    const submit = async (values) => {
        const res = await fetch(config.apiUrl + '/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (res.status === 201) {
            history.push('/login')
        } else if (res.status === 409) {
            setError(true);
        } else {
            console.log('unknown')
        }
        return res;
    };

    return (
        <div className="Register">
            <div className="Register-form d-flex flex-column justify-content-between">

                <Formik
                    initialValues={{ username: '', password: '', email: '', agreeTerms: false }}
                    validationSchema={RegisterSchema}
                    validateOnChange={true}
                    onSubmit={submit}
                >

                    {({ errors, touched, isSubmitting }) => (
                        <Form className="d-flex flex-wrap h-100" noValidate>

                            <div className="col-12 col-lg-6 d-flex flex-lg-cloumn justify-content-center align-items-center">
                                <div className="col-12 col-md-8 col-lg-8">
                                    <div className="Register-brand-container mt-4">
                                        <h2 className="Register-brand text-center">Instagram </h2>
                                        <h3 className="text-center">Sign up to see photos and videos from your friends.</h3>
                                    </div>

                                    <div className="form-group">
                                        <Field className='form-control' id="username" placeholder="Username" name="username" />
                                        <FontAwesomeIcon className="Register-form-icon" icon={faUserCircle} />
                                        {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
                                    </div>
                                    <div className="form-group">
                                        <Field type="email" className="form-control" id="email" placeholder="Email" name="email" />
                                        <FontAwesomeIcon className="Register-form-icon" icon={faEnvelope} />
                                        {errors.email && touched.email && <small className="text-danger pl-2">{errors.email}</small>}
                                    </div>
                                    <div className="form-group m-0">
                                        <Field type="password" className="form-control" id="password" placeholder="Password" name="password" />
                                        <FontAwesomeIcon className="Register-form-icon" icon={faLock} />
                                        {errors.password && touched.password && <small className="text-danger pl-2">{errors.password}</small>}
                                    </div>
                                    <div className="form-group form-check">
                                        <Field type="checkbox" className="form-check-input" id="agreeTerms" name="agreeTerms" />
                                        <label className="form-check-label" for="agreeTerms"><RegisterModal /></label>
                                        {errors.agreeTerms && touched.agreeTerms && <small className="text-danger d-block">{errors.agreeTerms}</small>}
                                    </div>

                                </div>
                            </div>


                            <div className="col-12 col-lg-6 Register-img-container d-flex align-items-end align-items-lg-center">
                                <div className="Register-button text-center p-4">
                                    <button type="submit" className="btn btn-primary text-uppercase btn-block" disabled={isSubmitting}>Register</button>
                                </div>
                            </div>

                        </Form>

                    )}
                </Formik>

                <div className="Register-footer">
                    <span> Have an account? <Link to="/login" className="text-reset">Sign In</Link></span>
                </div>

            </div>
        </div>
        //         // <div className="Register">
        //         //     <div className="Register-form col-12 p-0">
        //         //         <div className="pt-4 pr-4 pl-4">
        //         //             <h2 className="Register-brand text-center mt-3">Instagram </h2>
        //         //             <h3 className="p-2 text-center">Sign up to see photos and videos from your friends.</h3>
        //         //         </div>

        //         //         <Formik
        //         //             initialValues={{ username: '', password: '', email: '', agreeTerms: false }}
        //         //             validationSchema={RegisterSchema}
        //         //             validateOnChange={true}
        //         //             onSubmit={submit}
        //         //         >

        //         //             {({ errors, touched, isSubmitting }) => (
        //         //                 <Form className="mt-4" noValidate>
        //         //                     <div className="pt-2 pr-4 pl-4">
        //         //                         <div className="form-group">
        //         //                             <Field className='form-control' id="username" placeholder="Username" name="username" />
        //         //                             <FontAwesomeIcon className="Register-form-icon" icon={faUserCircle} />
        //         //                             {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
        //         //                         </div>
        //         //                         <div className="form-group">
        //         //                             <Field type="email" className="form-control" id="email" placeholder="Email" name="email" />
        //         //                             <FontAwesomeIcon className="Register-form-icon" icon={faEnvelope} />
        //         //                             {errors.email && touched.email && <small className="text-danger pl-2">{errors.email}</small>}
        //         //                         </div>
        //         //                         <div className="form-group m-0">
        //         //                             <Field type="password" className="form-control" id="password" placeholder="Password" name="password" />
        //         //                             <FontAwesomeIcon className="Register-form-icon" icon={faLock} />
        //         //                             {errors.password && touched.password && <small className="text-danger pl-2">{errors.password}</small>}
        //         //                         </div>
        //         //                         <div className="form-group form-check">
        //         //                             <Field type="checkbox" className="form-check-input" id="agreeTerms" name="agreeTerms" />
        //         //                             <label class="form-check-label" for="agreeTerms"><RegisterModal /></label>
        //         //                             {errors.agreeTerms && touched.agreeTerms && <small className="text-danger d-block">{errors.agreeTerms}</small>}
        //         //                         </div>
        //         //                     </div>

        //         //                     <div className="Register-img-container">
        //         //                         <div className="Register-button text-center p-4">
        //         //                             <button type="submit" className="btn btn-primary text-uppercase btn-block" disabled={isSubmitting}>Register</button>
        //         //                         </div>
        //         //                     </div>
        //         //                 </Form>

        //         //             )}

        //         //         </Formik>
        //         //     </div>
        //         //     <div className="Register-footer col-12">
        //         //         <span> Have an account? <Link to="/login" className="text-reset">Sign In</Link></span>
        //         //     </div>
        //         // </div>
    );
}

export default Register;