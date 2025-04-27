import { useState, useEffect, useCallback, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (accessToken) => {
        try {
            const response = await userController.get_me(accessToken);
            delete response.usu_password;
            setUser(response);
            setToken(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const reLogin = useCallback(async (refreshToken) => {
        try {
            const { accessToken } = await authController.refreshAccessToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        authController.removeTokens(); // Eliminar los tokens desde el controlador
    }, []);

    // Detectar cambios en los tokens desde otras pestañas
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === process.env.REACT_APP_ACCESS_TOKEN_NAME || event.key === process.env.REACT_APP_REFRESH_TOKEN_NAME) {
                console.log('Tokens cambiaron desde otra pestaña. Cerrando sesión...');
                logout();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [logout]);

    useEffect(() => {
        (async () => {
            const accessToken = authController.getAccessToken(); 
            const refreshToken = authController.getRefreshToken();

            if (!accessToken || !refreshToken) {
                logout();
                setLoading(false);
                return;
            }

            if (hasExpiredToken(accessToken)) {
                if (hasExpiredToken(refreshToken)) {
                    logout();
                    setLoading(false);
                } else {
                    await reLogin(refreshToken);
                    setLoading(false);
                }
            } else {
                await login(accessToken);
                setLoading(false);
            }
        })();
    }, [reLogin, logout]);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ accessToken: token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
