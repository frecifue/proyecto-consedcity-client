import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Post as PostController } from "../../../../api";
import { ENV } from '../../../../utils'
import "./Post.scss";
import DocumentsPost from "../DocumentsPost/DocumentsPost";
import { ImagesPost } from "../ImagesPost/ImagesPost";
import { ResourceNotFound } from "../../../../components/Shared";

const postController = new PostController();

export function Post() {
    const [post, setPost] = useState(null);
    const { path } = useParams();

    useEffect(() => {
        (async () => {
        try {
            const {data, status} = await postController.getPost(path);
            // setPost(data);
            if (status >= 400) {
                    setPost(null);
                } else {
                    setPost(data);
                }
        } catch (error) {
            console.error(error);
            setPost(null);
        }
        })();
    }, [path]);

    if (!post) {
        return (
            <ResourceNotFound
                title="Noticia no encontrada"
                message="La noticia que buscas no existe o fue eliminada."
                linkText="Volver al Inicio"
                linkTo="/"
            />
        );
    }

    return (
        <>
        <div className="post-container">
            <Container className="post">
                <h1 className="title">{post.pos_titulo}</h1>
                <div className="post-date">
                Publicado el:{" "}
                {new Date(post.pos_created_at).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
                </div>
                <img src={`${ENV.BASE_PATH}/${post.pos_img_principal}`} alt="Logo" className="img" />
                <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.pos_contenido }}
                />

                
                {post.documentos && post.documentos.length > 0 && (
                <DocumentsPost post={post}/>  
                )}

                {post.imagenes && post.imagenes.length > 0 && (
                <ImagesPost post={post}/>  
                )}
                
            </Container>
        </div>
        </>
    );
}