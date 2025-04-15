import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ENV } from "../../../../utils";
import "./ListPostItem.scss";

export function ListPostItem(props) {
  const { post } = props;
  const date = new Date(post.pos_created_at);

  return (
    <Link className="list-post-item" to={`/blog/${post.pos_path}`}>
      <Image className="ui image" src={`${ENV.BASE_PATH}/${post.pos_img_principal}`} fluid />
      <div className="list-post-encabezado">
        <h2 className="titulo_noticia">{post.pos_titulo}</h2>
        <span className="creacion_noticia">
          {DateTime.fromISO(date.toISOString())
            .setLocale("es")
            .toFormat("dd 'de' LLLL 'del' yyyy")}
        </span>
      </div>
      
    </Link>
  );
}