import * as Yup from "yup";

export function initialValues(project) {
    return {
        nombre: project?.pro_nombre || "",
        descripcion: project?.pro_descripcion || "",
        anio: project?.pro_anio || "",
        descripcion_corta: project?.pro_desc_corta || "",
        orden: project?.pro_orden || "",
        path: project?.pro_path || "",
    };
}

export function validationSchema() {
    return Yup.object({
        nombre: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(150, "Máximo 150 caracteres")
            .required(true),
      
        descripcion: Yup.string()
            .min(10, "Debe tener al menos 10 caracteres")
            .max(1000, "Máximo 1000 caracteres")
            .required(true),
      
        anio: Yup.number()
            .typeError("El año debe ser un número válido")
            .integer("El año debe ser un número entero")
            .min(1900, "El año no puede ser menor a 1900")
            .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`)
            .required(true),

        descripcion_corta: Yup.string()
            .min(5, "Debe tener al menos 5 caracteres")
            .max(200, "Máximo 200 caracteres")
            .required(true),

        orden: Yup.number()
            .typeError("El orden debe ser un número válido")
            .integer("El orden debe ser un número entero")
            .min(0, "El orden no puede ser negativo")
            .required(true),

        path: Yup.string()
            .matches(
                /^[a-z0-9]+(-[a-z0-9]+)*$/,
                "El path solo puede contener letras minúsculas, números y guiones, sin espacios ni caracteres especiales"
            )
            .required(true)
            .max(100, "Máximo 100 caracteres"),
      });
}