import React, { useCallback } from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ImageGalleryForm.form'
import { useDropzone } from 'react-dropzone';
import {useAuth} from "../../../../hooks"
import { ENV } from '../../../../utils';
import { ImageGallery } from '../../../../api';
import "./ImageGalleryForm.scss"
import { toast } from 'react-toastify';


const imgGalleryController = new ImageGallery()

export function ImageGalleryForm(props) {
    const {onClose, onReload, imgGallery} = props;
    const {accessToken} = useAuth();

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
        
                // Verificar si es creación o actualización de la galería de imágenes
                if (!imgGallery) {
                    // Crear nueva imagen
                    response = await imgGalleryController.createImageGallery(accessToken, data);
                } else {
                    // Actualizar imagen existente
                    response = await imgGalleryController.updateImageGallery(accessToken, imgGallery.gim_id, data);
                }
        
                // Comprobamos la respuesta y mostramos un mensaje de éxito o error
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
        },        
            
    });

    const onDrop = useCallback((acceptedFiles)=>{
        const file = acceptedFiles[0];
        formik.setFieldValue("imagen", URL.createObjectURL(file))
        formik.setFieldValue("fileImagen", file);
    }, [formik]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize: 5 * 1024 * 1024, // 2 MB en bytes
        onDrop,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(({ file, errors }) => {
                errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        alert(`❌ El archivo "${file.name}" es demasiado grande. Máximo permitido: 2MB.`);
                    } else if (err.code === "file-invalid-type") {
                        alert(`❌ El archivo "${file.name}" tiene un formato no permitido. Solo se aceptan imágenes JPEG, PNG.`);
                    }
                });
            });
        }
    });

    const getAvatar = () =>{
        if(formik.values.fileImagen){
            return formik.values.imagen;
        }else if(formik.values.imagen){
            return `${ENV.BASE_PATH}/${formik.values.imagen}`
        }
        return null;
    }

    return (
        <>
            <Form className='img-gallery-form' onSubmit={formik.handleSubmit}>
                <div className="img-gallery-form__image" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {getAvatar() ? (
                          <Image size="small" src={getAvatar()} />
                        ) : (
                          <div>
                            <span>Arrastra tu imagen</span>
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


                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    {imgGallery ? "Editar Imágen" : "Crear Imágen"}
                </Form.Button>
            </Form>
            {/* <ToastContainer /> */}
        </>
        
    )
}
