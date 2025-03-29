import * as Yup from "yup";

export function initialValues(post) {
  return {
    titulo: post?.pos_titulo || "",
    path_post: post?.pos_path || "",
    contenido: post?.pos_contenido || "",
    img_principal: post?.pos_img_principal || "",
    file: null,
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string().required(true),
    path_post: Yup.string().required(true),
    contenido: Yup.string().required(true),
    img_principal: Yup.string().required(true),
  });
}