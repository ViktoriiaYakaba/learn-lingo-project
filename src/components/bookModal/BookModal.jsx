import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchemaBook } from '../../helpers/validation';
import style from './BookModal.module.scss';
import SvgIcon from '../../icon/SvgIcon';

const BookModal = ({ isOpen, onClose, teacher }) => {
    if (!isOpen) return null;

    const closeButtonRef = useRef();

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        onClose();
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    const handleBackdropClick = (event) => {
        if (event.target.classList.contains(style.modalOverlay)) {
            onClose();
        }
    };

    return (
        <div className={style.modalOverlay} onClick={handleBackdropClick}>
            <div className={style.modalContent} role="dialog" aria-modal="true">
                <button
                    type="button"
                    onClick={onClose}
                    className={style.closeButton}
                    ref={closeButtonRef}
                >
                    <SvgIcon width="24" height="24" icon="normal-heart" />
                </button>
                <h2 className={style.modalTitle}>Book a Trial Lesson</h2>
                <p className={style.modalText}>{teacher.lesson_info}</p>
                <div className={style.teacherInfo}>
                    <img src={teacher.avatar_url} alt={teacher.name} className={style.teacherImage} />
                    <div className={style.teacherDetails}>
                        <p className={style.teacher}>Your teacher</p>
                        <p className={style.teacherName}>{teacher.name} {teacher.surname}</p>
                    </div>
                </div>
                <Formik
                    initialValues={{ name: '', email: '', phone: '', lessonOption: '' }}
                    validationSchema={validationSchemaBook}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={style.form}>
                            <div className={style.formGroup}>
                                <label className={style.formLabel}>What is your main reason for learning English?</label>
                                <div className={style.radioGroup}>
                                    <label>
                                        <Field type="radio" name="lessonOption" value="Option 1" />
                                        <span></span>
                                        Career and business
                                    </label>
                                    <label>
                                        <Field type="radio" name="lessonOption" value="Option 2" />
                                        <span></span>
                                        Lesson for kids
                                    </label>
                                    <label>
                                        <Field type="radio" name="lessonOption" value="Option 3" />
                                        <span></span>
                                        Living abroad
                                    </label>
                                    <label>
                                        <Field type="radio" name="lessonOption" value="Option 4" />
                                        <span></span>
                                        Exams and coursework
                                    </label>
                                    <label>
                                        <Field type="radio" name="lessonOption" value="Option 5" />
                                        <span></span>
                                        Culture, travel or hobby
                                    </label>
                                    <ErrorMessage name="lessonOption" component="div" className={style.errorMessage} />
                                </div>
                            </div>
                            <div className={style.formGroup}>
                                <div className={style.formGroupItem}>
                                    <Field type="text" name="name" placeholder='Full name' className={style.inputField} />
                                    <ErrorMessage name="name" component="div" className={style.errorMessage} />
                                </div>
                                <div className={style.formGroupItem}>
                                    <Field type="email" name="email" placeholder='Email' className={style.inputField} />
                                    <ErrorMessage name="email" component="div" className={style.errorMessage} />
                                </div>
                                <div className={style.formGroupItem}>
                                    <Field type="text" name="phone" placeholder='Phone number' className={style.inputField} />
                                    <ErrorMessage name="phone" component="div" className={style.errorMessage} />
                                </div>
                            </div>
                            <button type="submit" className={style.submitButton} disabled={isSubmitting}>
                                Book
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BookModal;
