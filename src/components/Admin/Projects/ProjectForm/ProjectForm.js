import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./ProjectForm.form";
import "./ProjectForm.scss";
import { toast } from "react-toastify";
import { Project } from "../../../../api";

const projectController = new Project();

export function ProjectForm(props) {
    const { onClose, onReload, project } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(project),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                let response;
        
                if (project) {
                    response = await projectController.updateProject(accessToken, project.pro_id, formValue);
                } else {
                    response = await projectController.createProject(accessToken, formValue);
                }
        
                if (response.status === 200) {
                    toast.success("Proyecto guardado exitosamente", { theme: "colored" });
                    onReload();
                    onClose();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Proyecto no encontrado", { theme: "colored" });
                } else if (response.status === 500) {
                    toast.error("Error en el servidor al guardar el proyecto", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
                }
            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al guardar el proyecto", { theme: "colored" });
            }
        },        
    });

    return (
        <Form className="project-form" onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input
                    name="nombre"
                    placeholder="Nombre del Proyecto"
                    maxLength={150} 
                    onChange={formik.handleChange}
                    value={formik.values.nombre}
                    error={formik.errors.nombre}
                />
                <Form.Input
                    name="anio"
                    type="number"
                    placeholder="Año"
                    min={1900}
                    max={new Date().getFullYear()} 
                    onChange={formik.handleChange}
                    value={formik.values.anio}
                    error={formik.errors.anio}
                />  
            </Form.Group>

            <Form.TextArea
                name="descripcion"
                placeholder="Descripción del Proyecto"
                className="readonly-input"
                maxLength={1000} 
                onChange={formik.handleChange}
                value={formik.values.descripcion}
                error={formik.errors.descripcion}
            />

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {project ? "Actualizar Proyecto" : "Crear Proyecto"}
            </Form.Button>
        </Form>
    );
}