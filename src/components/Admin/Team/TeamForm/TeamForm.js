import React, { useCallback } from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './TeamForm.form';
import { useDropzone } from 'react-dropzone';
import {image} from "../../../../assets"
import {Team} from "../../../../api"
import {useAuth} from "../../../../hooks"
import { ENV } from '../../../../utils';
import "./TeamForm.scss";
import { toast } from 'react-toastify';

const teamController = new Team()

export function TeamForm(props) {
    const {close, onReload, team} = props;
    const {accessToken} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(team),
        validationSchema: validationSchema(team),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                let response;
                
                if (!team) {
                    response = await teamController.createTeam(accessToken, formValue);
                } else {
                    response = await teamController.updateTeam(accessToken, team.equ_id, formValue);
                }
                
                // Comprobamos la respuesta y mostramos un mensaje de éxito o error
                if (response.status === 200) {
                    toast.success(!team ? "Equipo creado exitosamente" : "Equipo actualizado exitosamente", { theme: "colored" });
                    onReload();
                    close();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Equipo no encontrado", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
                }
            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al guardar equipo", { theme: "colored" });
            }
        }
        
    });

    const onDropAccepted = useCallback((acceptedFiles)=>{
        const file = acceptedFiles[0];
        formik.setFieldValue("foto_perfil", URL.createObjectURL(file))
        formik.setFieldValue("fileFotoPerfil", file);
    }, [formik])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize: 5 * 1024 * 1024, // 5 MB en bytes
        onDropAccepted,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(({ file, errors }) => {
                errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        toast.warning(`❌ El archivo "${file.name}" es demasiado grande. Máximo permitido: 5MB.`, { theme: "colored" });
                    } else if (err.code === "file-invalid-type") {
                        toast.warning(`❌ El archivo "${file.name}" tiene un formato no permitido. Solo se aceptan imágenes JPEG, PNG.`, { theme: "colored" });
                    }
                });
            });
        }
    });

    const getAvatar = () =>{
        if(formik.values.fileFotoPerfil){
            return formik.values.foto_perfil;
        }else if(formik.values.foto_perfil){
            return `${ENV.BASE_PATH}/${formik.values.foto_perfil}`
        }
        return image.noAvatar;
    }

    return (
        <>
            <Form className='team-form' onSubmit={formik.handleSubmit}>
                <div className='team-form__avatar' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image avatar size="small" src={getAvatar()} />
                </div>

                <Form.Group widths="equal">
                    <Form.Input 
                        name="nombre" 
                        placeholder="Nombres"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                        error={formik.errors.nombre}
                        />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.TextArea 
                        name="descripcion" 
                        rows={3}
                        maxlength={200}
                        placeholder="Descripción"
                        onChange={formik.handleChange}
                        value={formik.values.descripcion}
                        error={formik.errors.descripcion}
                        />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input 
                        name="orden"
                        type='number' 
                        placeholder="Orden"
                        onChange={formik.handleChange}
                        value={formik.values.orden}
                        error={formik.errors.orden}
                        />
                </Form.Group>

                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    {team ? "Editar Equipo" : "Crear Equipo"}
                </Form.Button>
            </Form>
        </>
        
    )
}
