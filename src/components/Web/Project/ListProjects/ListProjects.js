import React from "react";
import { map } from "lodash";
import "./ListProjects.scss";
import { ListProjectItem } from "../ListProjectItem";

export function ListProjects({ projects, pagination, onPageChange }) {
    if (!projects) return null;
    if (projects.length === 0) return <p>No hay proyectos disponibles</p>;

    return (
        <section className="list-projects-web" id="list-projects-section">
            <h2 className="project-title">PROYECTOS ADJUDICADOS</h2>
            <div className="list">
                {map(projects, (project) => (
                <div key={project.pro_id} className="item">
                    <ListProjectItem project={project} />
                </div>
                ))}
            </div>

            {pagination && (
                <div className="pagination">
                {pagination}
                </div>
            )}
        </section>
    );
}
