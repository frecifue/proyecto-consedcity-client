import React, { useEffect, useState } from 'react'
import { Banner, ImageGallery, ListDocuments, ListTeam } from '../../../../components/Web'
import { Description } from '../../../../components/Web/Project/Description/Description'
import { Project as ProjectApi } from "../../../../api";
import { useParams } from 'react-router-dom';
import { ListPosts } from '../../../../components/Web/Blog/ListPosts/ListPosts';
import { ResourceNotFound } from '../../../../components/Shared/';
import { Loader } from 'semantic-ui-react';

const projectController = new ProjectApi();

export function Project() {
    const [project, setProject] = useState(undefined); 
    const [loading, setLoading] = useState(true);

    const { path } = useParams();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data, status } = await projectController.getProject(path);

                if (status >= 400) {
                    setProject(null);
                } else {
                    setProject(data);
                }
            } catch (error) {
                console.error(error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [path]);

    if (loading) {
        return <Loader active inline="centered" />;
    }

    if (project === null) {
        return (
            <ResourceNotFound
                title="Proyecto no encontrado"
                message="El proyecto que buscas no existe o fue eliminado."
                linkText="Volver al Inicio"
                linkTo="/"
            />
        );
    }

    return (
        <div>    
            <Banner/>
            <Description name={project?.pro_nombre} description={project?.pro_descripcion}/>
            <ListPosts posts={project?.posts}/>
            <ListTeam team={project?.equipos}/>
            <ListDocuments documents={project?.documentos}/>
            <ImageGallery images={project?.imagenes}/>
        </div>
    )
}
