import React from "react";
import { map } from "lodash";
import { Container } from "semantic-ui-react";
import { DocumentItem } from "../DocumentItem/DocumentItem";
import "./ListDocuments.scss";

export function ListDocuments({ documents, paginationComponent }) {
    if (!documents || documents.length === 0) {
        return null;
    }

    return (
        <div className="list-documents-container">
            <Container className="list-documents-section" id="list-documents-section">
                <h2 className="list-documents__title">DOCUMENTOS DEL PROYECTO</h2>
                <div className="list">
                    {map(documents, (item) => (
                        <div key={item.doc_id} className="item">
                            <DocumentItem document={item} />
                        </div>
                    ))}
                </div>

                {paginationComponent && <div className="pagination">{paginationComponent}</div>}
            </Container>
        </div>
    );
}
