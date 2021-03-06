import React, { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from './login.schema'
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/index';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faAt } from '@fortawesome/free-solid-svg-icons'
import './Login.scss';

const initBackground = '#00b7d6';
function Login(props) {
    const { setBackground, setUser } = useContext(UserContext);
    const history = useHistory();
    const [showError, setError] = useState(false);

    useEffect(() => {
        setBackground(initBackground);
    }, [])

    const submit = async (values) => {
        const res = await fetch(config.apiUrl + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(values)
        });
        if (res.status === 200) {
            const loggedUser = await res.json();
            setUser(loggedUser);
            history.push('/')
        } else if (res.status === 401) {
            setError(true);
        } else {
            console.log('unknown error')
        }
        return res;
    }
    return (
        <div className="Login">
            <div className="Login-form d-flex flex-column justify-content-between">

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={submit}
                >

                    {({ errors, touched, isSubmitting }) => (
                        <Form className="d-flex flex-wrap h-100" noValidate>

                            <div className="col-12 col-lg-6 d-flex flex-lg-cloumn justify-content-center align-items-center">
                                <div className="col-12 col-md-8 col-lg-8">
                                    <div className="Login-brand-container mt-4">
                                        <h2 className="Login-brand text-center">Instagram </h2>
                                        <h3 className="text-center">Welcome Back.</h3>
                                        {showError && <div className="d-flex justify-content-center">
                                            <small className="text-danger pl-2">Username or Password is inncorrect.</small>
                                        </div>

                                        }
                                    </div>

                                    <div className="form-group">
                                        <Field className='form-control' id="username" placeholder="Username" name="username" />
                                        <FontAwesomeIcon className="Login-form-icon" icon={faAt} />
                                        {errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small>}
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" className="form-control" id="password" placeholder="Password" name="password" />
                                        <FontAwesomeIcon className="Login-form-icon" icon={faLock} />
                                        {errors.password && touched.password && <small className="text-danger pl-2">{errors.password}</small>}
                                    </div>

                                </div>
                            </div>


                            <div className="col-12 col-lg-6 Login-img-container d-flex align-items-end align-items-lg-center">
                                <div className="Login-button text-center p-4">
                                    <button type="submit" className="btn btn-primary text-uppercase btn-block" disabled={isSubmitting}>Sign In</button>
                                </div>
                            </div>

                        </Form>

                    )}
                </Formik>

                <div className="Login-footer">
                    <span> Don't have an account? <Link to="/register" className="text-reset">Sign Up</Link></span>
                </div>

            </div>
        </div>

    );
}

export default Login;