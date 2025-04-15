import React, { useCallback, useEffect, useState } from 'react'
import "./UseForm.scss"
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './UserForm.form';
import { useDropzone } from 'react-dropzone';
import {image} from "../../../../assets"
import {User, TypeUser} from "../../../../api"
import {useAuth} from "../../../../hooks"
import { ENV } from '../../../../utils';
import { toast } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toastify';

const userController = new User()
const typeUserController = new TypeUser()

export function UserForm(props) {
    const {close, onReload, user} = props;
    const [roleOptions, setRoleOptions] = useState([]);
    const {accessToken} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                let response;
        
                if (!user) {
                    response = await userController.createUser(accessToken, formValue);
                } else {
                    response = await userController.updateUser(accessToken, user.usu_id, formValue);
                }
        
                if (response.status === 200) {
                    toast.success(!user ? "Usuario creado exitosamente" : "Usuario actualizado exitosamente", {
                        theme: "colored"
                    });
                    onReload();
                    close();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Usuario no encontrado", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
                }
            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al guardar usuario", { theme: "colored" });
            }
        }
        
    });

    // Cargar roles desde la API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await typeUserController.getTypeUsers(accessToken);
                const options = response
                    .map((type) => ({
                        key: type.tus_id,
                        text: type.tus_nombre,
                        value: type.tus_id,
                        disabled: type.tus_id === 1
                    }));
                setRoleOptions(options);
            } catch (error) {
                console.error("Error al cargar los roles:", error);
                toast.error("No se pudieron cargar los roles", { theme: "colored" });
            }
        };

        fetchRoles();
    }, [accessToken]);

    const onDropAccepted = useCallback((acceptedFiles)=>{
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar", file);
    }, [formik]);

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
        if(formik.values.fileAvatar){
            return formik.values.avatar;
        }else if(formik.values.avatar){
            return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return image.noAvatar;
    }

    return (
        <>
            <Form className='user-form' onSubmit={formik.handleSubmit}>
                <div className='user-form__avatar' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image avatar size="small" src={getAvatar()} />
                </div>

                <Form.Group widths="equal">
                    <Form.Input 
                        name="nombres" 
                        placeholder="Nombres"
                        onChange={formik.handleChange}
                        value={formik.values.nombres}
                        error={formik.errors.nombres}
                        />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input 
                        name="primer_apellido" 
                        placeholder="Primer Apellido"
                        onChange={formik.handleChange}
                        value={formik.values.primer_apellido}
                        error={formik.errors.primer_apellido}
                        />
                    <Form.Input 
                        name="segundo_apellido" 
                        placeholder="Segundo Apellido"
                        onChange={formik.handleChange}
                        value={formik.values.segundo_apellido}
                        error={formik.errors.segundo_apellido}
                        />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input 
                        name="email" 
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                        />
                    <Form.Dropdown 
                        placeholder='Seleccione un rol' 
                        options={roleOptions} 
                        selection 
                        onChange={(_,data)=> formik.setFieldValue("rol", data.value)}
                        value={formik.values.rol}
                        error={formik.errors.rol}
                        />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input 
                        name="password" 
                        type='password'
                        placeholder="Contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                        />
                </Form.Group>

                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    {user ? "Editar Usuario" : "Crear Usuario"}
                </Form.Button>
            </Form>
        </>
        
    )
}
