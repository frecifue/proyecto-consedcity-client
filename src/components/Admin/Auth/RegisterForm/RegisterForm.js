import React, {useState} from 'react'
import {Form} from "semantic-ui-react"
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.form'
import "./RegisterForm.scss"
import { Auth } from '../../../../api/auth'

const authController = new Auth()

export function RegisterForm(props) {

    const {openLogin} = props;

    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                setError("");
                await authController.register(formValue)
                openLogin();
            } catch (error) {
                console.error(error)
                setError("Error al registrarse")
            }
        }
    });

  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="nombres" 
            placeholder="Nombres" 
            onChange={formik.handleChange} 
            value={formik.values.nombres}
            error={formik.errors.nombres}
            />
        <Form.Input 
            name="primer_apellido" 
            placeholder="Apellido Paterno" 
            onChange={formik.handleChange} 
            value={formik.values.primer_apellido}
            error={formik.errors.primer_apellido}
            />
        <Form.Input 
            name="email" 
            placeholder="Email" 
            onChange={formik.handleChange} 
            value={formik.values.email}
            error={formik.errors.email}
            />
        <Form.Input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            onChange={formik.handleChange} 
            value={formik.values.password}
            error={formik.errors.password}
            />
        <Form.Input 
            name="repeatPassword" 
            type="password" 
            placeholder="Repita Contraseña"  
            onChange={formik.handleChange} 
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            />
        <Form.Checkbox 
            name='conditionsAccepted' 
            label="Acepto que se almacenará esta información en este sistema" 
            onChange={(_,data)=> formik.setFieldValue("conditionsAccepted", data.checked)} 
            checked={formik.values.conditionsAccepted}
            error={formik.errors.conditionsAccepted}
            />

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            Registrarse
        </Form.Button>
        <p className='register-form__error'>{error}</p>
    </Form>
  )
}
