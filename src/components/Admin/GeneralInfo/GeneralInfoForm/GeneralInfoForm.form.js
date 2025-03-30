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
  };
}

export function validationSchema() {
  return Yup.object({
    quienes_somos: Yup.string().required(true),
    mision: Yup.string().required(true),
    vision: Yup.string().required(true),
    nuestro_trabajo: Yup.string().required(true),
    difusion: Yup.string().required(true),
    formacion: Yup.string().required(true),
    investigacion: Yup.string().required(true),
  });
}