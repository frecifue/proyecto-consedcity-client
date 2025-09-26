import * as Yup from "yup";

export function initialValues(team){
    return {
        foto_perfil: team?.equ_foto_perfil || "",
        fileFotoPerfil: null,
        nombre: team?.equ_nombre || "",
        descripcion: team?.equ_descripcion || "",
        orden: team?.equ_orden || "",
        en_home: team?.equ_en_home ?? false, 
    };
}

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string()
            .min(3, "Debe tener al menos 3 caracteres")
            .max(100, "Máximo 100 caracteres")
            .required(true),

        descripcion: Yup.string()
            .min(3, "Debe tener al menos 3 caracteres")
            .max(200, "Máximo 200 caracteres")
            .required(true),

        orden: Yup.number()
            .min(1, "Debe ser mayor o igual a 1")
            .max(1000, "Debe ser menor o igual a 1000")
            .required(true),

        en_home: Yup.boolean().required(true),
    });
}
