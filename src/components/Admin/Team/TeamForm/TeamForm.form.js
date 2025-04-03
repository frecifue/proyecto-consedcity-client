import * as Yup from "yup";

export function initialValues(team){
    return {
        foto_perfil: team?.equ_foto_perfil || "",
        fileFotoPerfil: null,
        nombre: team?.equ_nombre || "",
        descripcion: team?.equ_descripcion || "",
        orden: team?.equ_orden || "",
    };
}

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string().required(true),
        descripcion: Yup.string().required(true),
        orden: Yup.string().required(true),
    })
}