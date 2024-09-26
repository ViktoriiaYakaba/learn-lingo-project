import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../../helpers/validation';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.scss';
import { FiX } from "react-icons/fi";

const LogIn = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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
    dispatch(logInUser(values));
    navigate("/teachers");
       resetForm();
       onClose();
  };

  return (
      <div className={style.container} onClick={handleBackdropClick}>
          <div className={style.containerForm}>
              <div className={style.containerTitle}>
                <button className={style.btnClose} type='button' onClick={onClose}>
                      <FiX size={24} />
          </button>
          <h1 className={style.title}>Log In</h1>
          <p className={style.text}>
            Welcome back! Please enter your credentials to access your account and continue your search for a teacher.
          </p>
              </div> 
              <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
              >
                   {() => (
            <Form className={style.form}>
              <div className={style.formList}>
                <div className={style.contaierInput}>
                  <Field name="email" type="email" placeholder='Email' className={style.input} />
                  <ErrorMessage name="email" component="div" className={style.error} />
                </div>
                <div className={style.contaierInput}>
                  <Field name="password" type="password" placeholder='Password' className={style.input} />
                  <ErrorMessage name="password" component="div" className={style.error} />
                </div>
              </div>
              <button type='submit' className={style.btn}>Log In</button>
            </Form>
          )}
        </Formik>
          </div> 
    </div>
  )
}

export default LogIn;
