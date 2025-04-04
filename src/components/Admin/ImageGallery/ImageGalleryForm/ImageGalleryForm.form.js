import * as Yup from "yup";

export function initialValues(img){
    return {
        imagen: img?.gim_imagen || "",
        fileImagen: null,
        nombre: img?.gim_nombre || "",
        orden: img?.gim_orden || "",
    };
}

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string().required(true),
        orden: Yup.number().required(true),
    })
}