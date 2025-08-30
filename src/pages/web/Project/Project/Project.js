import React, { useEffect, useState } from 'react'
import { Banner, ImageGallery, ListDocuments, ListTeam } from '../../../../components/Web'
import { Description } from '../../../../components/Web/Project/Description/Description'
import { Project as ProjectApi } from "../../../../api";
import { useParams } from 'react-router-dom';
import { ListPosts } from '../../../../components/Web/Blog/ListPosts/ListPosts';

const projectController = new ProjectApi();

export function Project() {

    const [project, setProject] = useState(null);
    const { path } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await projectController.getProject(path);
                setProject(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
            })();
    }, [path]);


    return (
        <div>    
            <Banner/>
            <Description name={project?.pro_nombre} description={project?.pro_descripcion}/>
            <ListPosts posts={project?.posts}/>
            <ListTeam team={project?.equipos}/>
            <ImageGallery images={project?.imagenes}/>
            <ListDocuments documents={project?.documentos}/>
        </div>
    )
}
