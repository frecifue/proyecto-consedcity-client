import React from "react";
import { Container } from "semantic-ui-react";
// import { TopBar, Footer } from "../../components/Web";
import "./WebLayout.scss";
import { TopBar, Footer, MenuAnchor } from "../../components/Web";

export function WebLayout(props) {
  const { children } = props;

  return (
    <div className="web-layout">
      <div className="web-layout__header">
      <MenuAnchor/>
      </div>

      {children}

      <div className="web-layout__footer">
        <Container>
          <Footer.Follow/>
          <Footer.Info />
        </Container>
        <Container>
          
        </Container>
      </div>
    </div>
  );
}