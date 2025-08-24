import * as Yup from "yup";

export function initialValues(project) {
    return {
        nombre: project?.pro_nombre || "",
        descripcion: project?.pro_descripcion || "",
        anio: project?.pro_anio || ""
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
      });
}