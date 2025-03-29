import * as Yup from "yup";

export function initialValues(){
    return {
        nombres: "",
        primer_apellido: "",
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    }
}

export function validationSchema(){
    return Yup.object({
        nombres: Yup.string().required(true),
        primer_apellido: Yup.string().required(true),
        email: Yup.string().email("Email no es válido").required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),
    })
}