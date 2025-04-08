import * as Yup from "yup";

export function initialValues(document) {
  return {
    titulo: document?.doc_titulo || "",
    descripcion: document?.doc_descripcion || "",
    path_doc: document?.doc_path || "",
    orden: document?.doc_orden || "",
    documento: document?.doc_documento || "",
    file: null,
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string().required(true),
    descripcion: Yup.string().required(false),
    path_doc: Yup.string().required(true),
    documento: Yup.string().required(true),
  });
}