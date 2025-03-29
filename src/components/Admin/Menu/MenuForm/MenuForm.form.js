import * as Yup from "yup";

export function initialValues(menu) {
  return {
    title: menu?.men_titulo || "",
    path: menu?.men_path || "",
    protocol: "https://",
    active: menu?.men_activo || true,
    order: menu?.men_orden || undefined,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    path: Yup.string().required(true),
    order: Yup.number().required(true),
  });
}