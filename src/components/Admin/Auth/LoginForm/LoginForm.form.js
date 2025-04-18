import * as Yup from "yup";

export function initialValues(){
    return {
        email: "",
        password: "",
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("Debe ser un email válido")
            .max(50, "El email no puede tener más de 50 caracteres")
            .required(true),
    
        password: Yup.string()
            .min(6, "La contraseña debe tener exactamente 6 caracteres")
            .max(6, "La contraseña debe tener exactamente 6 caracteres")
            .required(true),
    })
}