import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { CommentCreateSchema } from './commentcreate.schema';
import { UserContext } from '../../../../user-context';
import Avatar from '../../../Avatar/Avatar';
import config from '../../../../config/index';
import PageLoader from '../../../PageLoader/PageLoader';
import { Link } from 'react-router-dom';
import './CommentCreate.scss';

function CommentCreate(props) {
    const postId = props.id;
    const { user } = useContext(UserContext);
    const history = useHistory();

    const submit = async (values, { resetForm }) => {
        const res = await fetch(`${config.apiUrl}/posts/${postId}/comment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(values)
        })
        const comment = await res.json();
        if (res.status === 201) {
            props.onAddComment(comment);
            resetForm();
        }
    };

    return (
        <div className="CommentCreate ">
            <hr />
            <div className="d-flex">

                <div className="avatar-container d-flex align-items-center px-2">
                    <Link to={`/profile/${user._id}`}>
                        <Avatar size="md" image={user.avatar} />
                    </Link>

                </div>


                <Formik
                    initialValues={{ content: '' }}
                    validationSchema={CommentCreateSchema}
                    onSubmit={submit}
                >
                    {({ errors, isSubmitting }) => (
                        <Form className="comment-form">

                            <div className="input-group mb-3">
                                <Field className="form-control"
                                    as="textarea"
                                    id="content"
                                    placeholder='Write comment...'
                                    name="content"
                                    aria-describedby="basic-addon2"

                                />


                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-outline-primary text-uppercase" disabled={isSubmitting || errors.content}>post</button>
                                    {isSubmitting && <PageLoader />}

                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    );
}

export default CommentCreate;