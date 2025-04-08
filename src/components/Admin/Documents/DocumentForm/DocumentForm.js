import React, { useCallback } from "react";
import { Form } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Documents } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./DocumentForm.form";
import "./DocumentForm.scss";

const documentController = new Documents();

export function DocumentForm(props) {
  const { onClose, onReload, document } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(document),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (document) {
          await documentController.updateDocument(accessToken, document.doc_id, formValue);
        } else {
          await documentController.createDocument(accessToken, formValue);
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
    formik.setFieldValue("documento", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  }, [formik]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxSize: 5 * 1024 * 1024, // 5 MB
    onDrop,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach(err => {
          if (err.code === "file-too-large") {
            alert(`❌ El archivo "${file.name}" es demasiado grande. Máximo permitido: 5MB.`);
          } else if (err.code === "file-invalid-type") {
            alert(`❌ El archivo "${file.name}" tiene un formato no permitido. Solo se aceptan archivos PDF.`);
          }
        });
      });
    }
  });

  const getFilePreview = () => {
    if (formik.values.file) {
      return formik.values.file.name;
    } else if (formik.values.documento) {
      const fullPath = `${ENV.BASE_PATH}/${formik.values.documento}`;
      const fileName = fullPath.split("/").pop();
      return fileName;
    }
    return null;
  };

  return (
    <Form className="document-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="titulo"
          placeholder="Título del documento"
          onChange={formik.handleChange}
          value={formik.values.titulo}
          error={formik.errors.titulo}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="path_doc"
          placeholder="URL del documento"
          onChange={formik.handleChange}
          value={formik.values.path_doc}
          error={formik.errors.path_doc}
        />
        <Form.Input
          name="orden"
          type="number"
          placeholder="Orden del documento"
          onChange={formik.handleChange}
          value={formik.values.orden}
          error={formik.errors.orden}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.TextArea
          name="descripcion"
          placeholder="Descripción del documento"
          rows={5}
          onChange={formik.handleChange}
          value={formik.values.descripcion}
          error={formik.errors.descripcion}
        />
      </Form.Group>

      <div className="document-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getFilePreview() ? (
          <div className="document-form__file-info">
            <i className="file pdf outline icon large"></i>
            <p>{getFilePreview()}</p>
          </div>
        ) : (
          <div>
            <i className="file pdf outline icon large"></i>
            <p>Arrastra aquí un archivo PDF (máx. 5MB) o haz clic para seleccionar</p>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {document ? "Actualizar Documento" : "Crear Documento"}
      </Form.Button>
    </Form>
  );
}
