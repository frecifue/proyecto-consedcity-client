import React, { useEffect, useState } from 'react'
import { map, size } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import { Project } from '../../../../api';
import "./ListProjects.scss"
import { ProjectItem } from '../ProjectItem';

const projectController = new Project();

export function ListProjects(props) {
    const {active, reload,  onReload} = props;
    const [projects, setProjects] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                setProjects(null);
                const {data} = await projectController.getProjects(page, 10);
                setProjects(data.projects);
                setPagination({
                    limit : data.limit,
                    page: data.page,
                    pages: data.totalPages,
                    total: data.total,
                });
                
            } catch (error) {
                console.error(error);
            }
        })();
    }, [active, reload, page]);

    const changePage = (_, data) =>{
        setPage(data.activePage)
    }

    if(!projects) return <Loader active inline="centered"/>
    if(size(projects) === 0) return "No se han encontrado proyectos"


    return (
        <div className='list-project'>
            {map(projects, (project)=> <ProjectItem key={project.pos_id} project={project} onReload={onReload}/>)}

            <div className='list-project__pagination'>
                <Pagination
                totalPages={pagination.pages}
                defaultActivePage={pagination.page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                onPageChange={changePage}
                />
            </div>

        </div>
    )
}
