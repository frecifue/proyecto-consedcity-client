import * as Yup from "yup";

export function initialValues(){
    return {
        nombre_contacto: '',
        email_contacto: '',
        mensaje_contacto: '',
    };
}

export function validationSchema(){
    return Yup.object({
        nombre_contacto: Yup.string().required(true),
        email_contacto: Yup.string().email('Correo electrónico no válido').required(true),
        mensaje_contacto: Yup.string().required(true)
    })
}