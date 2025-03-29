import React, { useState, useEffect } from "react";
import { Container, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Post as PostController } from "../../../api";
import { ENV } from "../../../utils";
import "./Post.scss";

const postController = new PostController();

export function Post() {
  const [post, setPost] = useState(null);
  const { path } = useParams();
console.log(post);

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
    <Container className="post">
      <h1 className="title">{post.pos_titulo}</h1>
      <img src={`${ENV.BASE_PATH}/${post.pos_img_principal}`} alt="Logo" className="img" />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.pos_contenido }}
      />
    </Container>
  );
}