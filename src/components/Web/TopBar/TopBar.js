import React, { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Icon } from "../../../assets";
import { Menu } from "../../../api";
import { socialData } from "../../../utils";
import "./TopBar.scss";

const menuController = new Menu();

export function TopBar() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await menuController.getMenu(true);
        setMenu(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            {/* <Icon.LogoWhite /> */}
            <img src={Icon.LogoColor} alt="Logo" className="logo" />
          </Link>

          <div className="menu">
            {map(menu, (item) => (
              <a key={item.men_id} href={item.men_path}>
                {item.men_titulo}
              </a>
            ))}
          </div>
        </div>

        <div>
          {map(socialData, (social) => (
            <Button
              key={social.type}
              as="a"
              target="_blank"
              href={social.link}
              color={social.type}
              icon={social.icon || social.type}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}