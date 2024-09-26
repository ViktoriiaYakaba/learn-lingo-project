import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchemaRegister } from '../../helpers/validation';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import style from './SingUp.module.scss'
import { FiX } from "react-icons/fi";

const SingUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const dispatch = useDispatch();

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
    
    const handleBackdropClick = (event) => {
    if (event.target.classList.contains(style.container)) {
        onClose();
    }
    };
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(registerUser(values));
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
      <div className={style.container} onClick={handleBackdropClick}>
          <div className={style.containerForm}>
              <div className={style.containerTitle}>
                <button className={style.btnClose} type='button' onClick={onClose}>
                      <FiX size={24} />
          </button>
          <h1 className={style.title}>Registration</h1>
          <p className={style.text}>
Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information          </p>
              </div> 
              <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchemaRegister}
          onSubmit={handleSubmit}
          
              >
                   {() => (
            <Form className={style.form}>
                          <div className={style.formList}>
                <div className={style.contaierInput}>
                  <Field name="name" type="text" placeholder='Name' className={style.input} />
                  <ErrorMessage name="name" component="div" className={style.error} />
                </div>              
                <div className={style.contaierInput}>
                  <Field name="email" type="email" placeholder='Email' className={style.input} />
                  <ErrorMessage name="email" component="div" className={style.error} />
                </div>
                <div className={style.contaierInput}>
                  <Field name="password" type="password" placeholder='Password' className={style.input} />
                  <ErrorMessage name="password" component="div" className={style.error} />
                </div>
              </div>
              <button type='submit' className={style.btn}>Register</button>
            </Form>
          )}
        </Formik>
          </div> 
    </div>
  )
}

export default SingUp;
