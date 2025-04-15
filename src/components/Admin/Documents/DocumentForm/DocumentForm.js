import React, { useCallback } from "react";
import { Form } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Documents } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./DocumentForm.form";
import "./DocumentForm.scss";
import { toast } from "react-toastify";

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
				let response;
		
				// Verificar si es creación o actualización de documento
				if (!document) {
					// Crear documento
					response = await documentController.createDocument(accessToken, formValue);
				} else {
					// Actualizar documento
					response = await documentController.updateDocument(accessToken, document.doc_id, formValue);
				}
		
				// Comprobamos la respuesta y mostramos un mensaje de éxito o error
				if (response.status === 200) {
					toast.success(!document ? "Documento creado exitosamente" : "Documento actualizado exitosamente", { theme: "colored" });
					onReload();
					onClose();
				} else if (response.status === 400) {
					toast.warning(response.data?.msg || "Error en los datos del formulario", { theme: "colored" });
				} else if (response.status === 404) {
					toast.warning(response.data?.msg || "Documento no encontrado", { theme: "colored" });
				} else if (response.status === 500) {
					toast.error("Error interno del servidor", { theme: "colored" });
				} else {
					toast.error("Ha ocurrido un problema inesperado", { theme: "colored" });
				}
			} catch (error) {
				console.error(error);
				toast.error("Error inesperado al guardar el documento", { theme: "colored" });
			}
		},
		
	});

	const onDropAccepted = useCallback((acceptedFile) => {
	const file = acceptedFile[0];
	formik.setFieldValue("documento", URL.createObjectURL(file));
	formik.setFieldValue("file", file);
	}, [formik]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
		"application/pdf": [],
		},
		maxSize: 5 * 1024 * 1024, // 5 MB
		onDropAccepted,
		onDropRejected: (fileRejections) => {
		fileRejections.forEach(({ file, errors }) => {
			errors.forEach(err => {
			if (err.code === "file-too-large") {
				toast.warning(`❌ El archivo "${file.name}" es demasiado grande. Máximo permitido: 5MB.`, { theme: "colored" });
			} else if (err.code === "file-invalid-type") {
				toast.warning(`❌ El archivo "${file.name}" tiene un formato no permitido. Solo se aceptan archivos PDF.`, { theme: "colored" });
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
