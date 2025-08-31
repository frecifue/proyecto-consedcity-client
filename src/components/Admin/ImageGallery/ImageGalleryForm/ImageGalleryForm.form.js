import * as Yup from "yup";

export function initialValues(img){
    return {
        imagen: img?.gim_imagen || "",
        fileImagen: null,
        nombre: img?.gim_nombre || "",
        orden: img?.gim_orden || "",
        en_home: img?.gim_en_home ?? false, 
    };
}

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(100, "Máximo 100 caracteres")
            .required(true),
      
        orden: Yup.number()
            .min(1, "El orden debe ser al menos 1")
            .max(1000, "El orden no puede ser mayor a 1000")
            .required(true),

        imagen: Yup.string()
            .required(true),

        en_home: Yup.boolean().required(true),
      });
      
}