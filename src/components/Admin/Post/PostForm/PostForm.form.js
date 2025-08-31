import * as Yup from "yup";

export function initialValues(post) {
    return {
        titulo: post?.pos_titulo || "",
        path_post: post?.pos_path || "",
        contenido: post?.pos_contenido || "",
        img_principal: post?.pos_img_principal || "",
        file: null,
        en_home: post?.pos_en_home ?? false, 
    };
}

export function validationSchema() {
    return Yup.object({
        titulo: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(150, "Máximo 150 caracteres")
            .required(true),
      
        path_post: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(150, "Máximo 150 caracteres")
            .required(true),
      
        contenido: Yup.string()
            .required(true),
      
        img_principal: Yup.string()
            .required(true),

        en_home: Yup.boolean().required(true),
      });
      
}