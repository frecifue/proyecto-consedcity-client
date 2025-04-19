import React from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";
import { toast } from "react-toastify";

const menuController = new Menu();

export function MenuForm(props) {
    const { onClose, onReload, menu } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    titulo: formValue.title,
                    path: menu ? formValue.path : `${formValue.protocol}${formValue.path}`,
                    orden: formValue.order,
                };
        
                let response;
        
                // Verificar si es creación o actualización de menú
                if (menu) {
                    // Actualizar menú
                    response = await menuController.updateMenu(accessToken, menu.men_id, data);
                } else {
                    // Crear menú
                    response = await menuController.createMenu(accessToken, data);
                }
        
                // Comprobamos la respuesta y mostramos un mensaje de éxito o error
                if (response.status === 200) {
                    toast.success(!menu ? "Menú creado exitosamente" : "Menú actualizado exitosamente", { theme: "colored" });
                    onReload();
                    onClose();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Menú no encontrado", { theme: "colored" });
                } else if (response.status === 500) {
                    toast.error("Error interno del servidor", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un problema inesperado", { theme: "colored" });
                }
        
            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al procesar el menú", { theme: "colored" });
            }
        },        
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
        <Form.Input
            name="title"
            placeholder="Titulo"
            maxLength={50} 
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
        />
        <Form.Input
            name="order"
            type="number"
            placeholder="Orden"
            min={1}
            max={1000}
            onChange={formik.handleChange}
            value={formik.values.order}
            error={formik.errors.order}
        />
        </Form.Group>

        <Input
        name="path"
        placeholder="URL"
        fluid
        maxLength={200} 
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
            !menu ? (
            <Dropdown
                options={options}
                onChange={(_, data) =>
                formik.setFieldValue("protocol", data.value)
                }
                value={formik.values.protocol}
                error={formik.errors.protocol}
            />
            ) : null
        }
        />

        <Form.Group />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {menu ? "Actualizar menú" : "Crear menú"}
        </Form.Button>
    </Form>
  );
}

const options = [
  { key: "https://", text: "https://", value: "https://" },
  { key: "http://", text: "http://", value: "http://" },
  { key: "/", text: "/", value: "/" },
  { key: "#", text: "#", value: "#" },
];