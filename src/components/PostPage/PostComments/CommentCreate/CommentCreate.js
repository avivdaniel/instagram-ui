import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { CommentCreateSchema } from './commentcreate.schema';
import AppLoader from '../../../AppLoader/AppLoader';
import config from '../../../../config/index';

function CommentCreate(props) {
    const postId = props.id;
    const history = useHistory();
    const submit = async (values) => {
        console.log(values);
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
            console.log(comment);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ content: '' }}
                validationSchema={CommentCreateSchema}
                onSubmit={submit}
            >
                {({ errors, isSubmitting }) => (
                    <Form>

                        <div className="form-group col-10 col-lg-8 d-flex align-items-center justify-content-center pr-0">
                            <Field className='form-control title-field'
                                as="textarea"
                                id="content"
                                placeholder='write comment'
                                name="content"
                            />
                            {errors.content && <small className="text-danger pl-2">{errors.content}</small>}
                        </div>



                        <div className="">
                            <button type="submit" className="btn btn-block text-uppercase" disabled={isSubmitting}>post</button>
                            {isSubmitting && <AppLoader />}
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CommentCreate;