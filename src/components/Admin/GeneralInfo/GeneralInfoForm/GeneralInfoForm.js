import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { GeneralInfo } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./GeneralInfoForm.form";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const generalInfoController = new GeneralInfo();

export function GeneralInfoForm() {
    const { accessToken } = useAuth();
    const [generalInfo, setGeneralInfo] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await generalInfoController.getGeneralInfo();
                setGeneralInfo(data[0]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const formik = useFormik({
        initialValues: initialValues(generalInfo), // Se inicializa con datos reales
        validationSchema: validationSchema(),
        enableReinitialize: true, // Permite actualizar los valores cuando generalInfo cambie
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    quienes_somos: formValue.quienes_somos,
                    mision: formValue.mision,
                    vision: formValue.vision,
                    nuestro_trabajo: formValue.nuestro_trabajo,
                    difusion: formValue.difusion,
                    formacion: formValue.formacion,
                    investigacion: formValue.investigacion,
                    videojuegos: formValue.videojuegos,
                };
        
                let response;
        
                // Verificar si es creación o actualización de información general
                if (!generalInfo) {
                    // Crear información general
                    response = await generalInfoController.createGeneralInfo(accessToken, data);
                } else {
                    // Actualizar información general
                    response = await generalInfoController.updateGeneralInfo(accessToken, generalInfo.ing_id, data);
                }
        
                // Comprobamos la respuesta y mostramos un mensaje de éxito o error
                if (response.status === 200 || response.status === 201) {
                    toast.success(!generalInfo ? "Información General creada exitosamente" : "Información General actualizada", { theme: "colored" });
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning("Información General no encontrada", { theme: "colored" });
                } else if (response.status === 500) {
                    toast.error("Error interno del servidor", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un problema inesperado", { theme: "colored" });
                }
        
                // Recargar datos después de guardar
                const updatedInfo = await generalInfoController.getGeneralInfo();
                setGeneralInfo(updatedInfo.data[0]);
                
            } catch (error) {
                console.error(error);
                toast.error("Ha ocurrido un problema al procesar la información general", { theme: "colored" });
            }
        },
             
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {/* Sección: Quiénes Somos */}
            <h3>Quiénes Somos</h3>
            <hr/>
            {/* <Form.Group widths="equal" style={{ marginBottom: "1rem"}}> */}
                {/* <Form.TextArea
                    label="Descripción"
                    name="quienes_somos"
                    placeholder="Escribe sobre quiénes somos..."
                    maxLength={500} 
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.quienes_somos}
                    error={formik.errors.quienes_somos}
                /> */}
                <Editor 
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{ 
                        height: 400, 
                        menubar: true, 
                        contextmenu: false,
                        plugins: [
                            "link",
                        ],
                        toolbar: "undo redo | bold italic | link",
                    }}
                    initialValue={formik.values.quienes_somos}
                    onBlur={(e) => formik.setFieldValue("quienes_somos", e.target.getContent())}
                /> 
            {/* </Form.Group> */}

            {/* Sección: Misión y Visión */}
            <h3>Misión y Visión</h3>
            <hr/>
            <Form.Group widths="equal" style={{ marginBottom: "1rem" }}>
                <Form.TextArea
                    label="Misión"
                    name="mision"
                    placeholder="Escribe la misión..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={5}
                    value={formik.values.mision}
                    error={formik.errors.mision}
                />
                <Form.TextArea
                    label="Visión"
                    name="vision"
                    placeholder="Escribe la visión..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={5}
                    value={formik.values.vision}
                    error={formik.errors.vision}
                />
            </Form.Group>

            {/* Sección: Nuestro Trabajo */}
            <h3>Nuestro Trabajo</h3>
            <hr/>
            <Form.Group widths="equal" style={{ marginBottom: "1rem" }}>
                <Form.TextArea
                    label="Descripción"
                    name="nuestro_trabajo"
                    placeholder="Explica nuestro trabajo..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={5}
                    value={formik.values.nuestro_trabajo}
                    error={formik.errors.nuestro_trabajo}
                />
            </Form.Group>

            {/* Sección: Otras Actividades */}
            <h3>Actividades</h3>
            <hr/>
            <Form.Group widths="equal" style={{ marginBottom: "1rem" }}>
                <Form.TextArea
                    label="Difusión"
                    name="difusion"
                    placeholder="Explica la difusión..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.difusion}
                    error={formik.errors.difusion}
                />
                <Form.TextArea
                    label="Formación"
                    name="formacion"
                    placeholder="Explica la formación..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.formacion}
                    error={formik.errors.formacion}
                />
                <Form.TextArea
                    label="Investigación"
                    name="investigacion"
                    placeholder="Explica la investigación..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.investigacion}
                    error={formik.errors.investigacion}
                />
                <Form.TextArea
                    label="Videojuegos"
                    name="videojuegos"
                    placeholder="Explica la creación de videojuegos..."
                    maxLength={1000} 
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.videojuegos}
                    error={formik.errors.videojuegos}
                />
            </Form.Group>

            {/* Botón de Envío */}
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Actualizar Información General
            </Form.Button>
        </Form>
    );
}
