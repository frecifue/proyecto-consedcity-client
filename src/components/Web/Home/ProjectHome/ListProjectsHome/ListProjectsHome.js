import React, { useEffect, useState } from "react";
import "./ListProjectsHome.scss";
import { Project } from "../../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { ListProjects } from "../../../Project/ListProjects/ListProjects";

const projectController = new Project();

export function ListProjectsHome() {
    const [projects, setProjects] = useState(null);
    const [paginationData, setPaginationData] = useState();
    const [page, setPage] = useState(1); // 👈 solo estado interno

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
        setPage(data.activePage);
    };

    if (!projects) return <Loader active inline="centered" />;

    return (
        <ListProjects
            projects={projects}
            pagination={
                <Pagination
                    totalPages={paginationData.pages}
                    activePage={page} // 👈 usamos el estado interno
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
