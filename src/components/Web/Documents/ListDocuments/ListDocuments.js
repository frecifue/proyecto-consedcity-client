import React, { useState, useEffect } from "react";
import { Container, Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { Documents } from "../../../../api";
import { DocumentItem } from "../DocumentItem/DocumentItem";
import "./ListDocuments.scss";

const documentController = new Documents();

export function ListDocuments() {
    const [documents, setDocuments] = useState(null);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
        try {
            const {data} = await documentController.getDocuments(page, 4);
            setDocuments(data.documents);
            setPagination({
            limit: data.limit,
            page: data.page,
            pages: data.totalPages,
            total: data.total,
            });
        } catch (error) {
            console.error(error);
        }
        })();
    }, [page]);

    const changePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage);
    };

    if (!documents) return <Loader active inline="centered" />;

    return (
        <div className="list-documents-container">
        <Container className="list-documents-section" id="list-documents-section">
        
            <h2 className="list-documents__title">ESTUDIOS E INVESTIGACIONES</h2>
            <div className="list">
            {map(documents, (item) => (
                <div key={item.doc_id} className="item">
                <DocumentItem document={item}/>
                </div>
            ))}
            </div>

            <div className="pagination">
            <Pagination
                totalPages={pagination.pages}
                defaultActivePage={pagination.page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                secondary
                pointing
                onPageChange={changePage}
            />
            </div>
        </Container>
        </div>
    );
}