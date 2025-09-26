export const ENV = {
    BASE_PATH: `${process.env.REACT_APP_SERVER_IP}`,
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
            GET_POST_PATH: "post",
            ADD_DOCUMENTS: "post/:posId/add-documents",
            ADD_IMAGES: "post/:posId/add-images"
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
            GET_IMAGES_GALLERY: "images_gallery",
            GET_IMAGE_GALLERY: "image_gallery",
            CREATE_IMAGE_GALLERY: "image_gallery",
            UPDATE_IMAGE_GALLERY: "image_gallery",
            DELETE_IMAGE_GALLERY: "image_gallery",
        },
        DOCUMENTS:{
            GET_DOCUMENTS: "documents",
            CREATE_DOCUMENT: "document",
            UPDATE_DOCUMENT: "document",
            DELETE_DOCUMENT: "document",
        },
        TYPE_USER:{
            GET_TYPE_USERS: "type-users"
        },
        PROJECTS:{
            GET_PROJECTS: "projects",
            GET_PROJECT: "project",
            CREATE_PROJECT: "project",
            UPDATE_PROJECT: "project",
            DELETE_PROJECT: "project",
            ADD_DOCUMENTS: "project/:proId/add-documents",
            ADD_IMAGES: "project/:proId/add-images",
            ADD_POSTS: "project/:proId/add-posts",
            ADD_TEAMS: "project/:proId/add-teams"
        }
    },
};
