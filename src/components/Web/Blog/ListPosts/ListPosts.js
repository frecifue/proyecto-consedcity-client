import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "../../../../api";
import { ListPostItem } from "../ListPostItem";
import "./ListPosts.scss";

const postController = new Post();

export function ListPosts() {
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);

    useEffect(() => {
        (async () => {
        try {
            const {data} = await postController.getPosts(page, 4);
            setPosts(data.posts);
            setPagination({
            limit: data.limit,
            page: data.page,
            pages: data.totalPages,
            total: data.total,
            });
        } catch (error) {
            console.error(error);
        }
        })();
    }, [page]);

    const changePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage);
        navigate(`?page=${newPage}`, { replace: true });
    };

    if (!posts) return <Loader active inline="centered" />;

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

            <div className="pagination">
            <Pagination
                totalPages={pagination.pages}
                defaultActivePage={pagination.page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                secondary
                pointing
                onPageChange={changePage}
            />
            </div>
        </section>
    );
}