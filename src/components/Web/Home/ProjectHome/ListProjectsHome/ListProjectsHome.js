import React, { useEffect, useState } from "react";
import "./ListProjectsHome.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "../../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { ListProjects } from "../../../Project/ListProjects/ListProjects";

const projectController = new Project();

export function ListProjectsHome() {
    const [projects, setProjects] = useState(null);
    const [paginationData, setPaginationData] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);

    useEffect(() => {
        (async () => {
        try {
            const { data } = await projectController.getProjects(page, 4);
            setProjects(data.projects);
            setPaginationData({
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
        navigate(`?page=${newPage}`, { replace: true });
    };

    if (!projects) return <Loader active inline="centered" />;

    return (
        <ListProjects
            projects={projects}
            pagination={
                <Pagination
                    totalPages={paginationData.pages}
                    defaultActivePage={paginationData.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    secondary
                    pointing
                    onPageChange={changePage}
                />
            }
        />
    );
}
