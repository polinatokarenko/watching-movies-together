'use client';

/*css*/
import css from "./Modal.module.css";

/*modal portal*/
import { createPortal } from "react-dom";

/*hooks*/
import { useEffect, useId } from "react";

import { Formik, Form, Field } from 'formik';


interface ModalProps {
    onClose: () => void,
    title: string,
    subtitle?: string,
    inputRequireSvg?: string,
    inputSvg?: string,
    label?: string,
    placeholder?: string,
    inputName: string,
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

    return (
        createPortal(
            <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
                <div className={css.modal}>
                    <svg className={css.closeSvg} width={20} height={20} onClick={onClose}>
                        <use href="/images/sprite.svg#icon-cross"></use>
                    </svg>
                    <h1 className={css.title}>{title}</h1>
                    {subtitle && <p className={css.subtitle}>{subtitle}</p>}
                    <Formik initialValues={{ [inputName]: "" }} onSubmit={() => {}}>
                        <Form className={css.form}>
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
                                            className={`${css.input} ${inputName === 'roomCode' ? css.roomCodeInput : ''}`}
                                            id={`${fieldId}-${inputName}`}
                                            name={`${inputName}`}
                                            type={`${inputType}`}
                                            placeholder={placeholder}
                                            maxLength={inputName === 'roomCode' ? 8 : 20}
                                        />
                                    </div>
                                )}
                            </div>
                            <button className={css.button} type="submit">
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
                    </Formik>
                </div>
            </div>,
            document.body
        )
    )
}