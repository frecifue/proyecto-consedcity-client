import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
// import { PostForm } from "../PostForm";
import "./PostItem.scss";
import { PostForm } from "../PostForm";

const postController = new Post();

export function PostItem(props) {
  const { post, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await postController.deletePost(accessToken, post.pos_id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{post.pos_titulo}</span>
          <span className="post-item__info-path">{post.pos_path}</span>
        </div>

        <div>
          <Button as={Link} primary icon to={`/blog/${post.pos_path}`} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon color="yellow" onClick={onOpenCloseModal}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Editar Noticia"
        size="large"
      >
        <PostForm onClose={onOpenCloseModal} onReload={onReload} post={post} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Eliminar Noticia: ${post.pos_titulo}?`}
        size="mini"
      />
    </>
  );
}