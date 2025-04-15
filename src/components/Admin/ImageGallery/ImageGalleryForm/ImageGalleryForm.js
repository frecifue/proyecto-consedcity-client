import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ImageGalleryForm.form';
import { useDropzone } from 'react-dropzone';
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
import { ImageGallery } from '../../../../api';
import "./ImageGalleryForm.scss";
import { toast } from 'react-toastify';

const imgGalleryController = new ImageGallery();

export function ImageGalleryForm(props) {
    const { onClose, onReload, imgGallery } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(imgGallery),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    nombre: formValue.nombre,
                    orden: formValue.orden,
                    imagen: formValue.fileImagen,
                };

                let response;

                if (!imgGallery) {
                    response = await imgGalleryController.createImageGallery(accessToken, data);
                } else {
                    response = await imgGalleryController.updateImageGallery(accessToken, imgGallery.gim_id, data);
                }

                if (response.status === 200) {
                    toast.success(!imgGallery ? "Imagen registrada exitosamente" : "Imagen actualizada exitosamente", { theme: "colored" });
                    onReload();
                    onClose();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Imagen no encontrada", { theme: "colored" });
                } else if (response.status === 500) {
                    toast.error("Error interno del servidor", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un problema inesperado", { theme: "colored" });
                }

            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al procesar la imagen", { theme: "colored" });
            }
        }
    });

    const onDropAccepted = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            // Limpia la imagen previa (por si se vuelve a subir)
            formik.setFieldValue("imagen", URL.createObjectURL(file));
            formik.setFieldValue("fileImagen", file);
        }
    }, [formik]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize: 5 * 1024 * 1024,
        onDropAccepted,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(({ file, errors }) => {
                errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        toast.warning(`❌ El archivo "${file.name}" es demasiado grande. Máximo permitido: 5MB.`, { theme: "colored" });
                    } else if (err.code === "file-invalid-type") {
                        toast.warning(`❌ El archivo "${file.name}" tiene un formato no permitido. Solo se aceptan imágenes JPEG y PNG.`, { theme: "colored" });
                    }
                });
            });
        }
    });

    const getAvatar = () => {
        if (formik.values.fileImagen) {
            return formik.values.imagen;
        } else if (formik.values.imagen) {
            return `${ENV.BASE_PATH}/${formik.values.imagen}`;
        }
        return null;
    };

    return (
        <Form className="img-gallery-form" onSubmit={formik.handleSubmit}>
            <div className="img-gallery-form__image" {...getRootProps()}>
                <input {...getInputProps()} />
                {getAvatar() ? (
                    <Image src={getAvatar()} size="large" />
                ) : (
                    <div>
                        <span>Arrastra o haz clic para subir una imagen</span>
                        <p>Formatos permitidos: JPG, PNG. Máximo 5MB.</p>
                    </div>
                )}
            </div>

            <Form.Group widths="equal">
                <Form.Input
                    name="nombre"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.nombre}
                    error={formik.errors.nombre}
                />
                <Form.Input
                    name="orden"
                    type="number"
                    placeholder="Orden"
                    onChange={formik.handleChange}
                    value={formik.values.orden}
                    error={formik.errors.orden}
                />
            </Form.Group>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {imgGallery ? "Editar Imagen" : "Crear Imagen"}
            </Form.Button>
        </Form>
    );
}
