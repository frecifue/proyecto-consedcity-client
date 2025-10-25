import * as Yup from "yup";

export function initialValues(generalInfo) {
  return {
    quienes_somos: generalInfo?.ing_quienes_somos || "",
    mision: generalInfo?.ing_mision || "",
    vision: generalInfo?.ing_vision || "",
    nuestro_trabajo: generalInfo?.ing_nuestro_trabajo || "",
    difusion: generalInfo?.ing_nuestro_trabajo_difusion || "",
    formacion: generalInfo?.ing_nuestro_trabajo_formacion || "",
    investigacion: generalInfo?.ing_nuestro_trabajo_investigacion || "",
    videojuegos: generalInfo?.ing_nuestro_trabajo_creacion_videojuegos || "",
  };
}

export function validationSchema() {
  return Yup.object({
    quienes_somos: Yup.string().required(true).max(2000, "Máximo 2000 caracteres"),
    mision: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    vision: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    nuestro_trabajo: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    difusion: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    formacion: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    investigacion: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
    videojuegos: Yup.string().required(true).max(1000, "Máximo 1000 caracteres"),
  });
}