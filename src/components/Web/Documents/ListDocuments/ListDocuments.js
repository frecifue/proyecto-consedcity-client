import React, { useState, useEffect } from "react";
import { Container, Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
// import { useNavigate, useSearchParams } from "react-router-dom";
import { Documents } from "../../../../api";
import { DocumentItem } from "../DocumentItem/DocumentItem";
// import { ListPostItem } from "../ListPostItem";
import "./ListDocuments.scss";

const documentController = new Documents();

export function ListDocuments() {
    const [documents, setDocuments] = useState(null);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
        try {
            const response = await documentController.getDocuments(page, 4);
            setDocuments(response.documents);
            setPagination({
            limit: response.limit,
            page: response.page,
            pages: response.totalPages,
            total: response.total,
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
        <Container className="list-documents-section" id="list-documents-section">
        {/* <section > */}
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
        {/* </section> */}
        </Container>
    );
}