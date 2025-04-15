import React, { useState } from "react";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { Tab } from "semantic-ui-react";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      menuItem: "Entrar",
      pane: (
        <Tab.Pane attached={false}>
          <LoginForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Registro",
      pane: (
        <Tab.Pane attached={false}>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">
      {/* <Icon.LogoWhite className="logo" /> */}
      <img src={Icon.LogoBlanco} alt="Logo" className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
        renderActiveOnly={false} // Evita problemas de renderizado con los panes
      />
    </div>
  );
}
