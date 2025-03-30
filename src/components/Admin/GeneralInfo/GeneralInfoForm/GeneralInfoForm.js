import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { GeneralInfo } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./GeneralInfoForm.form";

const generalInfoController = new GeneralInfo();

export function GeneralInfoForm() {
    const { accessToken } = useAuth();
    const [generalInfo, setGeneralInfo] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await generalInfoController.getGeneralInfo();
                setGeneralInfo(response[0]);
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
                };

                if (generalInfo) {
                    await generalInfoController.updateGeneralInfo(accessToken, generalInfo.ing_id, data);
                } else {
                    await generalInfoController.createGeneralInfo(accessToken, data);
                }

                // Recargar datos después de guardar
                const updatedInfo = await generalInfoController.getGeneralInfo();
                setGeneralInfo(updatedInfo[0]);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {/* Sección: Quiénes Somos */}
            <h3>Quiénes Somos</h3>
            <hr/>
            <Form.Group widths="equal" style={{ marginBottom: "1rem" }}>
                <Form.TextArea
                    label="Descripción"
                    name="quienes_somos"
                    placeholder="Escribe sobre quiénes somos..."
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.quienes_somos}
                    error={formik.errors.quienes_somos}
                />
            </Form.Group>

            {/* Sección: Misión y Visión */}
            <h3>Misión y Visión</h3>
            <hr/>
            <Form.Group widths="equal" style={{ marginBottom: "1rem" }}>
                <Form.TextArea
                    label="Misión"
                    name="mision"
                    placeholder="Escribe la misión..."
                    onChange={formik.handleChange}
                    rows={5}
                    value={formik.values.mision}
                    error={formik.errors.mision}
                />
                <Form.TextArea
                    label="Visión"
                    name="vision"
                    placeholder="Escribe la visión..."
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
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.difusion}
                    error={formik.errors.difusion}
                />
                <Form.TextArea
                    label="Formación"
                    name="formacion"
                    placeholder="Explica la formación..."
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.formacion}
                    error={formik.errors.formacion}
                />
                <Form.TextArea
                    label="Investigación"
                    name="investigacion"
                    placeholder="Explica la investigación..."
                    onChange={formik.handleChange}
                    rows={7}
                    value={formik.values.investigacion}
                    error={formik.errors.investigacion}
                />
            </Form.Group>

            {/* Botón de Envío */}
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Actualizar Información General
            </Form.Button>
        </Form>
    );
}
