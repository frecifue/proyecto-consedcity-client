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
        title: Yup.string()
            .min(3, "Debe tener al menos 3 caracteres")
            .max(50, "No debe exceder los 50 caracteres")
            .required(true),
    
        path: Yup.string()
            .min(3, "Debe tener al menos 3 caracteres")
            .max(200, "No debe exceder los 200 caracteres")
            .required(true),
    
        order: Yup.number()
            .min(1, "El orden debe ser al menos 1")
            .max(1000, "El orden no debe ser mayor a 1000")
            .required(true),
    });
}