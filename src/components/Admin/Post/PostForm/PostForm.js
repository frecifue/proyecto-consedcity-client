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
        if (post) {
          await postController.updatePost(accessToken, post.pos_id, formValue);
        } else {
          await postController.createPost(accessToken, formValue);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("img_principal", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  }, [formik]);

  const { getRootProps, getInputProps } = useDropzone({
      accept: {
          'image/jpeg': [],
          'image/png': [],
      },
      maxSize: 2 * 1024 * 1024, // 2 MB en bytes
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
          onChange={formik.handleChange}
          value={formik.values.titulo}
          error={formik.errors.titulo}
        />
        <Form.Input
          name="path_post"
          placeholder="URL de la noticia"
          onChange={formik.handleChange}
          value={formik.values.path_post}
          error={formik.errors.path_post}
        />
      </Form.Group>

      {/* <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        initialValue={formik.values.content}
        onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
      /> */}
      <Editor 
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                init={{ 
                    height: 400, 
                    menubar: false, 
                    plugins: [ 
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar: 
                        "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat", 
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
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {post ? "Actualizar Noticia" : "Crear Noticia"}
      </Form.Button>
    </Form>
  );
}