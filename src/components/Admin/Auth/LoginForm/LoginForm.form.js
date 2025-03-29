import * as Yup from "yup";

export function initialValues(){
    return {
        email: "",
        password: "",
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email("Email no es válido").required(true),
        password: Yup.string().required(true),
    })
}