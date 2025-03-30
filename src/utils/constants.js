export const ENV = {
    BASE_PATH: `http://${process.env.REACT_APP_SERVER_IP}`,
    BASE_API: process.env.REACT_APP_BASE_API,
    JWT: {
        ACCESS: process.env.REACT_APP_ACCESS_TOKEN_NAME,
        REFRESH: process.env.REACT_APP_REFRESH_TOKEN_NAME,
    },
    API_ROUTES: {
        AUTH: {
            REGISTER: "auth/register",
            LOGIN: "auth/login",
            REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        },
        USER: {
            GET_ME: "user/me",
            GET_USERS: "users",
            CREATE_USER: "user",
            UPDATE_USER: "user",
            DELETE_USER: "user",
        },
        MENU:{
            GET_MENUS: "menus",
            CREATE_MENU: "menu",
            UPDATE_MENU: "menu",
            DELETE_MENU: "menu",
        },
        POST:{
            GET_POST: "posts",
            CREATE_POST: "post",
            UPDATE_POST: "post",
            DELETE_POST: "post",
            GET_POST_PATH: "post"
        },
        TEAM:{
            GET_TEAM: "teams",
            CREATE_TEAM: "team",
            UPDATE_TEAM: "team",
            DELETE_TEAM: "team",
        },
        GENERAL_INFO:{
            GET_GENERAL_INFO: "general_info",
            CREATE_GENERAL_INFO: "general_info",
            UPDATE_GENERAL_INFO: "general_info",
            DELETE_GENERAL_INFO: "general_info",
        },
        CONTACT:{
            CONTACT: "contact",
        },
        IMAGE_GALLERY:{
            GET_IMAGE_GALLERY: "image_gallery",
        }
    },
};
