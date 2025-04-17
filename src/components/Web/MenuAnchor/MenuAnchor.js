import React, { useEffect, useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Menu as MenuApi } from '../../../api';
import "./MenuAnchor.scss";
import { useLocation } from 'react-router-dom';

const menuController = new MenuApi();

export function MenuAnchor() {
    const [menu, setMenu] = useState([]);
    const location = useLocation(); // <--- obtenemos la ruta actual

    // Detectamos si estamos en la ruta de un post
    const isPostPage = location.pathname.startsWith('/blog/');

    useEffect(() => {
        (async () => {
        try {
            const response = await menuController.getMenu(1);
            setMenu(response); // Guardamos la respuesta directamente en el estado
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    // Función para manejar el desplazamiento suave
    const handleScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    // Función para manejar los clics en los items del menú
    const handleMenuItemClick = (path) => {
        // Si el link es una URL externa (comienza con http o https)
        if (path.startsWith('http://') || path.startsWith('https://')) {
            window.open(path, '_blank'); // Abre en una nueva pestaña
        }
        // Si el link es un ancla (comienza con #)
        else if (path.startsWith('#')) {
            handleScroll(path.slice(1)); // Llamamos a handleScroll con el id del ancla
        }
        // Si el path es vacío (para la acción de "home" o regresar arriba)
        else if (path === 'home') {
            window.location.href = '/'; // Fuerza la recarga de la página principal
        }
    };

    return (
        <Menu fluid fixed="top" inverted className="anchor-menu">
            <Menu.Item
                onClick={() => {
                    if (location.pathname === "/") {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        window.location.href = "/";
                    }
                }}
                >
                <Icon name="home" />
                ConsedCity
            </Menu.Item>

        {/* Mostrar solo el botón de "Home" si estamos en una página de post */}
        {!isPostPage && menu.map((item, index) => (
            item.men_activo && (
            <Menu.Item
                key={index}
                onClick={() => handleMenuItemClick(item.men_path)}
            >
                {item.men_titulo}
            </Menu.Item>
            )
        ))}
        </Menu>
    );
}
