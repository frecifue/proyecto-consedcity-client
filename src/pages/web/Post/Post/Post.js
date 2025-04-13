import React, { useState, useEffect } from "react";
import { Container, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Post as PostController } from "../../../../api";
import { ENV } from '../../../../utils'
import "./Post.scss";
import DocumentsPost from "../DocumentsPost/DocumentsPost";
import { ImagesPost } from "../ImagesPost/ImagesPost";

const postController = new PostController();

export function Post() {
    const [post, setPost] = useState(null);
    const { path } = useParams();

    useEffect(() => {
        (async () => {
        try {
            const response = await postController.getPost(path);
            setPost(response);
        } catch (error) {
            console.error(error);
        }
        })();
    }, [path]);

    if (!post) return <Loader active inline="centered" />;

    return (
        <>
        <div className="post-container">
            <Container className="post">
                <h1 className="title">{post.pos_titulo}</h1>
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