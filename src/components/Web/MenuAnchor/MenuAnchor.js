import React, { useEffect, useState, useRef } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Menu as MenuApi } from '../../../api';
import "./MenuAnchor.scss";
import { useLocation, useNavigate } from 'react-router-dom';

const menuController = new MenuApi();

export function MenuAnchor() {
    const [menu, setMenu] = useState([]);
    const location = useLocation(); 
    const navigate = useNavigate();

    const historyStack = useRef([]); // stack de rutas internas

    const isBlogPage = location.pathname.startsWith('/blog/');
    const isProjectPage = location.pathname.startsWith('/project/');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await menuController.getMenu(1);
                setMenu(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // Apilar ruta actual cada vez que cambia location (solo rutas internas)
    useEffect(() => {
        if (!location.pathname.startsWith('/blog/') && !location.pathname.startsWith('/project/') && location.pathname !== '/') return;

        const last = historyStack.current[historyStack.current.length - 1];
        if (last !== location.pathname) {
            historyStack.current.push(location.pathname);
        }
    }, [location.pathname]);

    const handleScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleMenuItemClick = (path) => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            window.open(path, '_blank');
        } else if (path.startsWith('#')) {
            handleScroll(path.slice(1));
        } else if (path === 'home') {
            navigate('/');
        } else if (path === 'back') {
            // Sacamos la ruta anterior del stack
            historyStack.current.pop(); // quitamos la actual
            const previous = historyStack.current.pop() || '/'; // obtenemos la anterior
            navigate(previous);
        } else {
            // Navegación interna
            navigate(path);
        }
    };

    return (
        <Menu fluid fixed="top" inverted className="anchor-menu">
            <Menu.Item onClick={() => handleMenuItemClick('home')}>
                <Icon name="home" />
                ConsedCity
            </Menu.Item>

            {(isBlogPage || isProjectPage) && (
                <Menu.Item onClick={() => handleMenuItemClick('back')}>
                    <Icon name="arrow left" />
                    Regresar
                </Menu.Item>
            )}

            {!isBlogPage && !isProjectPage && menu.map((item, index) => (
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
