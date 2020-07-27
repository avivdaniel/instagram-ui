import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { CommentCreateSchema } from './commentcreate.schema';
import { UserContext } from '../../../../user-context';
import Avatar from '../../../Avatar/Avatar';
import config from '../../../../config/index';
import PageLoader from '../../../PageLoader/PageLoader';
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
        <div className="CommentCreate col-12">
            <Formik
                initialValues={{ content: '' }}
                validationSchema={CommentCreateSchema}
                onSubmit={submit}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <hr />
                        <div className="form-group col-12 d-flex p-0">
                            <div className="PostPage-avatar-container col-2 p-0 d-flex justify-content-center align-items-center">
                                <Avatar size="md" image={user.avatar} />
                            </div>
                            <div className="input-group PostPage-commentInput-container col-10 p-0">

                                <div className="input-group-prepend">
                                    <button type="submit" className="PostPage-btn-post btn input-group-text text-uppercase" disabled={isSubmitting || errors.content}>post</button>
                                    {isSubmitting && <PageLoader />}
                                </div>

                                <Field className='form-control title-field'
                                    as="textarea"
                                    id="content"
                                    placeholder='write comment'
                                    name="content"
                                    className="form-control"
                                    aria-label="With textarea"
                                />
                                {/* {errors.content && <small className="text-danger pl-2">{errors.content}</small>} */}

                            </div>
                        </div>




                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CommentCreate;