import React, { useState } from 'react';
import './ContactForm.scss';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./ContactForm.form";
import { Form, Message } from 'semantic-ui-react';
import { Contact } from '../../../../api';

const contactController = new Contact();

export function ContactForm() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            try {

                const data = {
                    nombre_contacto: values.nombre_contacto,
                    email_contacto: values.email_contacto,
                    mensaje_contacto: values.mensaje_contacto,

                }

                const response = await contactController.contact(data);  // Obtiene el Response completo
            
                if (response.status === 200) {
                    setSuccessMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo.");
                    setErrorMessage(null);
                    resetForm();
                    setTimeout(() => setSuccessMessage(null), 5000);
                } else {
                    throw new Error(); 
                }
            } catch (error) {
                setErrorMessage("Hubo un problema al enviar el mensaje. Inténtalo más tarde.");
                setSuccessMessage(null);
            }
        },
    });

    return (
        <section className="contact-section" id="contact-section">
            <h2 className="contact-section__title">CONTÁCTANOS</h2>

            <div className="contact-section__content">
                <div className="contact-section__layout">
                    <div className="contact-section__left">
                        <p>¿Te gustaría colaborar con nosotros/as? ¿Quieres estar al tanto de nuestros próximos eventos? ¿Estás interesado en contribuir con fondos o materiales? O tal vez solo deseas ponerte en contacto o hacer una consulta.</p>
                        <p>Puedes ponerte en contacto con nosotros/as mediante el formulario o a través de nuestras redes sociales.</p>
                    </div>
                    <div className="contact-section__right">
                        <h2>Ingresa tu información</h2>
                        
                        {successMessage && (
                            <Message positive>
                                <p>{successMessage}</p>
                            </Message>
                        )}

                        {errorMessage && (
                            <Message negative>
                                <p>{errorMessage}</p>
                            </Message>
                        )}

                        <Form onSubmit={formik.handleSubmit} className="form">
                            <Form.Group widths="equal">
                                <Form.Input
                                    name="nombre_contacto"
                                    placeholder="Ingresa tu nombre"
                                    onChange={formik.handleChange}
                                    maxLength={100}
                                    value={formik.values.nombre_contacto}
                                    error={formik.errors.nombre_contacto}
                                />
                            </Form.Group>
                            
                            <Form.Group widths="equal">
                                <Form.Input
                                    name="email_contacto"
                                    type="email"
                                    placeholder="Ingresa tu email"
                                    onChange={formik.handleChange}
                                    maxLength={100}
                                    value={formik.values.email_contacto}
                                    error={formik.errors.email_contacto}
                                />
                            </Form.Group>
                        
                            <Form.Group widths="equal">
                                <Form.TextArea
                                    id="mensaje_contacto"
                                    name="mensaje_contacto"
                                    placeholder="Ingresa tu mensaje"
                                    rows="4"
                                    onChange={formik.handleChange}
                                    maxLength={1000}
                                    value={formik.values.mensaje_contacto}
                                    error={formik.errors.mensaje_contacto}
                                />
                            </Form.Group>
                        
                            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                                ENVIAR
                            </Form.Button>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
