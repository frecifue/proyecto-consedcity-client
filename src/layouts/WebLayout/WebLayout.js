import React from "react";
import { Container } from "semantic-ui-react";
// import { TopBar, Footer } from "../../components/Web";
import "./WebLayout.scss";
import { TopBar, Footer } from "../../components/Web";

export function WebLayout(props) {
  const { children } = props;

  return (
    <div className="web-layout">
      <div className="web-layout__header">
        {/* <TopBar /> */}
      </div>

      {children}

      <div className="web-layout__footer">
        <Container>
          <Footer.Info />
          <Footer.Menu />
          {/* <Footer.Newsletter /> */}
        </Container>
        <Container>
          <span>© ALL RIGHTS RESERVED</span>
          {/* <span>AGUSTÍN NAVARRO GALDON | FRONTEND DEVELOPER</span> */}
        </Container>
      </div>
    </div>
  );
}