import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.form'
import { Auth } from '../../../../api/auth'
import {useAuth} from "../../../../hooks"

const authController = new Auth()


export function LoginForm() {
    const {login} = useAuth();
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                setError("");
                const response = await authController.login(formValue)

                // setear los tokens en localstorage
                authController.setAccessToken(response.access)
                authController.setRefreshToken(response.refresh)
                login(response.access)
            } catch (error) {
                console.error(error)
                setError("Error al logear")
            }
        }
    });


    return (

        <Form className='register-form' onSubmit={formik.handleSubmit}>  
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
            

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                Ingresar
            </Form.Button>
            <p className='register-form__error'>{error}</p>
        </Form>
    )
}
