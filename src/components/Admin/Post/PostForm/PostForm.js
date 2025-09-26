import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./PostForm.form";
import "./PostForm.scss";
import { toast } from "react-toastify";

const postController = new Post();

export function PostForm(props) {
    const { onClose, onReload, post } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(post),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                let response;
        
                if (post) {
                    response = await postController.updatePost(accessToken, post.pos_id, formValue);
                } else {
                    response = await postController.createPost(accessToken, formValue);
                }
        
                if (response.status === 200) {
                    toast.success("Noticia guardada exitosamente", { theme: "colored" });
                    onReload();
                    onClose();
                } else if (response.status === 400) {
                    toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
                } else if (response.status === 404) {
                    toast.warning(response.data?.msg || "Noticia no encontrada", { theme: "colored" });
                } else if (response.status === 500) {
                    toast.error("Error en el servidor al guardar la noticia", { theme: "colored" });
                } else {
                    toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
                }
            } catch (error) {
                console.error(error);
                toast.error("Error inesperado al guardar la noticia", { theme: "colored" });
            }
        },        
    });

    const onDropAccepted = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            formik.setFieldValue("img_principal", URL.createObjectURL(file));
            formik.setFieldValue("file", file);
        }
    }, [formik]);
    
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize: 5 * 1024 * 1024, // 2MB
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

    const handleTituloChange = (e, { value }) => {
        formik.setFieldValue("titulo", value);
        
        const slug = value
          .toLowerCase()
          .normalize("NFD")                   // elimina acentos
          .replace(/[\u0300-\u036f]/g, "")   // elimina caracteres unicode
          .replace(/[^a-z0-9\s-]/g, "")      // elimina caracteres especiales
          .trim()
          .replace(/\s+/g, "-");             // reemplaza espacios por guiones
      
        formik.setFieldValue("path_post", slug);
    };
    

    const getMiniature = () => {
        if (formik.values.file) {
        return formik.values.img_principal;
        } else if (formik.values.img_principal) {
        return `${ENV.BASE_PATH}/${formik.values.img_principal}`;
        }
        return null;
    };

    return (
        <Form className="post-form" onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input
                    name="titulo"
                    placeholder="Titulo de la noticia"
                    maxLength={150} 
                    onChange={handleTituloChange}
                    value={formik.values.titulo}
                    error={formik.errors.titulo}
                />
                <Form.Input
                    name="path_post"
                    placeholder="URL de la noticia"
                    readOnly
                    className="readonly-input"
                    maxLength={150} 
                    onChange={formik.handleChange}
                    value={formik.values.path_post}
                    error={formik.errors.path_post}
                />
            </Form.Group>

            <Form.Checkbox
                toggle
                label="Mostrar en Home"
                name="en_home"
                checked={formik.values.en_home}
                onChange={(_, data) => formik.setFieldValue("en_home", data.checked)}
                error={formik.errors.en_home}
            />
            
            <Editor 
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                init={{ 
                    height: 400, 
                    menubar: true, 
                    contextmenu: false,
                    // plugins: [
                    //     "advlist autolink lists link image charmap print preview anchor",
                    //     "searchreplace visualblocks code fullscreen",
                    //     "insertdatetime media table paste code help wordcount",
                    // ],
                    // toolbar: 
                    //     "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link", 
                    plugins: [
                        "link",
                    ],
                    toolbar: "undo redo | bold italic | link",
                }}
                initialValue={formik.values.contenido}
                onBlur={(e) => formik.setFieldValue("contenido", e.target.getContent())}
                    /> 

            <div className="post-form__miniature" {...getRootProps()}>
                <input {...getInputProps()} />
                {getMiniature() ? (
                    <Image size="small" src={getMiniature()} />
                ) : (
                <div>
                    <span>Arrastra una imagen aquí o haz clic para seleccionar</span>
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                    Solo se permiten archivos JPG o PNG de hasta 5MB.
                    </p>
                </div>
                )}
            </div>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {post ? "Actualizar Noticia" : "Crear Noticia"}
            </Form.Button>
        </Form>
    );
}