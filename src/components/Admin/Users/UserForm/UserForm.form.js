import * as Yup from "yup";

export function initialValues(user){
    return {
        avatar: user?.usu_avatar || "",
        fileAvatar: null,
        nombres: user?.usu_nombres || "",
        primer_apellido: user?.usu_primer_apellido || "",
        segundo_apellido: user?.usu_segundo_apellido || "",
        email: user?.usu_email || "",
        rol: user?.usu_rol || "",
        password: "",
    };
}

export function validationSchema(user){
    return Yup.object({
        nombres: Yup.string().required(true),
        primer_apellido: Yup.string().required(true),
        segundo_apellido: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        rol: Yup.string().required(true),
        password: user ? Yup.string() : Yup.string().required(true),
    })
}