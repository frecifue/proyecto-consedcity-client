import React from "react";
import { Card, Icon } from "semantic-ui-react";
import "./DocumentItem.scss";
import { ENV } from "../../../../utils";


export function DocumentItem({ document }) {
  const { doc_titulo, doc_descripcion, doc_documento } = document;
  const documentUrl = `${ENV.BASE_PATH}/${doc_documento}`;

  return (
    <Card fluid className="document-item">
      <Card.Content>
        <Card.Header>
          <a
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="document-title-link"
          >
            <Icon name="file pdf outline" color="red" />
            {doc_titulo}
          </a>
        </Card.Header>
        <hr/>
        <Card.Description className="description">{doc_descripcion}</Card.Description>
      </Card.Content>
    </Card>
  );
}
