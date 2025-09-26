import React from "react";
import { map } from "lodash";
import { ListPostItem } from "../ListPostItem";
import "./ListPosts.scss";

export function ListPosts({ posts, pagination, onPageChange }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="list-posts-web" id="list-posts-section">
        <h2 className="post-title">NOTICIAS</h2>
        <div className="list">
            {map(posts, (post) => (
            <div key={post.pos_id} className="item">
                <ListPostItem post={post} />
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
