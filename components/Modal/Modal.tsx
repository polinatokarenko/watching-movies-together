'use client';

/*css*/
import css from "./Modal.module.css";

/*modal portal*/
import { createPortal } from "react-dom";

/*hooks*/
import { useEffect, useId, useState } from "react";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

import { UsernameSchema, RoomCodeSchema } from "@/lib/validation/roomSchemas";

export interface ModalProps {
    onClose: () => void,
    title: string,
    subtitle?: string,
    inputRequireSvg?: string,
    inputSvg?: string,
    label?: string,
    placeholder?: string,
    inputName: 'username' | 'roomCode',
    inputType?: string,
    button: string,
    buttonSvg?: string
}

export default function Modal({ onClose, title, subtitle, inputRequireSvg, inputSvg, label, placeholder, inputName, inputType, button, buttonSvg }: ModalProps) {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };


    useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
      };
        
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

	  return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.body.style.overflow = "";
	  };
	}, [onClose]);

    const fieldId = useId();

    type FormValues = Record<string, string>;

    const initialValues: FormValues = {
        [inputName]: "",
    };

    const handleSubmit = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        console.log("Form data:", values);
        setIsLengthError(false);
        actions.resetForm();
    };

    const maxLength = {
        username: 20,
        roomCode: 6,
    };

    const [isLengthError, setIsLengthError] = useState(false);

    return (
        createPortal(
            <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
                <div className={css.modal}>
                    <svg className={css.closeSvg} width={20} height={20} onClick={onClose}>
                        <use href="/images/sprite.svg#icon-cross"></use>
                    </svg>
                    <h1 className={css.title}>{title}</h1>
                    {subtitle && <p className={css.subtitle}>{subtitle}</p>}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={inputName === 'username' ? UsernameSchema : RoomCodeSchema}>
                        {({values, setFieldValue, errors, touched}) => {
                            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;
                                if (value.length > maxLength[inputName]) {
                                    setIsLengthError(true);
                                } else {
                                    setIsLengthError(false);
                                    setFieldValue(inputName, value);
                                }
                            };
                            
                            return (
                                <Form className={css.form} id="modal-form">
                                    <div className={css.inputContainer}>
                                        {inputRequireSvg ? (
                                            <div className={css.labelContainer}>
                                                <label className={css.label} htmlFor={`${fieldId}-${inputName}`}>
                                                    {label}
                                            </label>
                                            <svg className={css.labelSvg} width={5} height={4.8}>
                                                <use href={inputRequireSvg} />
                                            </svg>
                                        </div>
                                    ) :
                                        <label className={css.label} htmlFor={`${fieldId}-${inputName}`}>
                                            {label}
                                        </label>}
                                        {placeholder && (
                                            <div className={css.inputSvgContainer}>
                                                {inputSvg && (
                                                    <svg className={css.inputSvg} width={15} height={14.41}>
                                                        <use href={inputSvg} />
                                                    </svg>
                                                )}
                                                <Field
                                                    className={`${css.input} ${inputName === 'roomCode' ? css.roomCodeInput : ''} ${(errors[inputName] && touched[inputName]) || isLengthError ? css.inputError : ''}`}
                                                    id={`${fieldId}-${inputName}`}
                                                    name={inputName}
                                                    type={inputType ?? 'text'}
                                                    placeholder={placeholder}
                                                    onChange={handleChange}
                                                />
                                                <span className={css.counter}>
                                                    {values[inputName].length}/{maxLength[inputName]}
                                                </span>
                                            </div>
                                        )}
                                        <div className={css.errorContainer}>
                                            {(errors[inputName] && touched[inputName] || isLengthError) && (
                                                <>
                                                <svg width={15} height={15}>
                                                    <use href="/images/sprite.svg#icon-attention" />
                                                </svg>
                                                {!isLengthError ? (
                                                    <ErrorMessage
                                                    className={css.error}
                                                    name={inputName}
                                                    component="span"
                                                    />
                                                ) : (
                                                <span className={css.error}>
                                                    Max length is {maxLength[inputName]} characters
                                                </span>
                                                )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button className={css.button} type="submit" form="modal-form">
                                    {buttonSvg && (
                                        <svg className={css.buttonSvg} width={13} height={13}>
                                            <use href={buttonSvg} />
                                        </svg>
                                    )}
                                    <span className={`${css.blob} ${css.blob1}`}></span>
                                    <span className={`${css.blob} ${css.blob2}`}></span>
                                    <span className={`${css.blob} ${css.blob3}`}></span>
                                    <span className={css.buttonText}>{button}</span>
                                    </button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>,
            document.body
        )
    )
}