import * as Yup from "yup";

export function initialValues(){
    return {
        email: "",
        password: "",
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email("Email no es v�lido").required(true),
        password: Yup.string().required(true),
    })
}