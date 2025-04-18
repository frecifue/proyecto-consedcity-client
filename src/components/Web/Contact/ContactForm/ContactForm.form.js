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
        nombre_contacto: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")    
            .max(100, "Máximo 100 caracteres")
            .required(true),
    
        email_contacto: Yup.string()
            .email("El email no es válido")
            .required(true),
    
        mensaje_contacto: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(1000, "Máximo 1000 caracteres")
            .required(true),
      });
}