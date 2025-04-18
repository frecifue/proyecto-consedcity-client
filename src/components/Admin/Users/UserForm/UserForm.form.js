import * as Yup from "yup";

export function initialValues(user){
    return {
        avatar: user?.usu_avatar || "",
        fileAvatar: null,
        nombres: user?.usu_nombres || "",
        primer_apellido: user?.usu_primer_apellido || "",
        segundo_apellido: user?.usu_segundo_apellido || "",
        email: user?.usu_email || "",
        rol: user?.tipo_usuario.tus_id || "",
        password: "",
    };
}

export function validationSchema(user){
    return Yup.object({
        nombres: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(50, "No debe exceder los 50 caracteres")
            .required(true),
    
        primer_apellido: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(50, "No debe exceder los 50 caracteres")
            .required(true),
    
        segundo_apellido: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(50, "No debe exceder los 50 caracteres"),
    
        email: Yup.string()
            .email("Debe ser un email válido")
            .max(50, "No debe exceder los 50 caracteres")
            .required(true),
    
        rol: Yup.number()
            .required(true),
    
        password: user
            ? Yup.string()
            : Yup.string()
                .min(6, "La contraseña debe tener exactamente 6 caracteres")
                .max(6, "La contraseña debe tener exactamente 6 caracteres")
                .required(true)
    });
    
}