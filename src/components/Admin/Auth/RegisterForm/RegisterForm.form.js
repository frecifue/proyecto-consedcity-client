import * as Yup from "yup";

export function initialValues(){
    return {
        nombres: "",
        primer_apellido: "",
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    }
}

export function validationSchema(){
    return Yup.object({
        nombres: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(50, "El nombre no puede tener más de 50 caracteres")
            .required(true),
    
        primer_apellido: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(50, "El apellido no puede tener más de 50 caracteres")
            .required(true),
    
        email: Yup.string()
            .email("Debe ser un email válido")
            .max(50, "El email no puede tener más de 50 caracteres")
            .required(true),
    
        password: Yup.string()
            .min(6, "La contraseña debe tener exactamente 6 caracteres")
            .max(6, "La contraseña debe tener exactamente 6 caracteres")
            .required(true),
    
        repeatPassword: Yup.string()
            .required(true)
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
    
        conditionsAccepted: Yup.bool()
            .oneOf([true], "Debe aceptar los términos y condiciones")
            .required(true),
    });
}