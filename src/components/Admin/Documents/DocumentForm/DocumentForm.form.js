import * as Yup from "yup";

export function initialValues(document) {
    return {
        titulo: document?.doc_titulo || "",
        descripcion: document?.doc_descripcion || "",
        orden: document?.doc_orden || "",
        documento: document?.doc_documento || "",
        file: null,
    };
}

export function validationSchema() {
    return Yup.object({
        titulo: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(255, "El título no puede tener más de 255 caracteres")
            .required(true),
        
        orden: Yup.number()
            .min(1, "El orden debe ser al menos 1")
            .max(1000, "El orden no puede ser mayor a 1000")
            .required(true),
    
        descripcion: Yup.string()
            .max(255, "La descripción no puede tener más de 255 caracteres")
            .notRequired(), // La descripción es opcional
    
        documento: Yup.string()
            .required(true),
      });
}