// ListPostsContainer.jsx
import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { Post } from "../../../../../api";
import { ListPosts } from "../../../Blog/ListPosts/ListPosts";

const postController = new Post();

export function ListPostsHome() {
    const [posts, setPosts] = useState(null);
    const [paginationData, setPaginationData] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await postController.getPosts(page, 4);
                setPosts(data.posts);
                setPaginationData({
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
        setPage(data.activePage);
    };

    if (!posts) return <Loader active inline="centered" />;

    return (
        <ListPosts
            posts={posts}
            pagination={
                <Pagination
                    totalPages={paginationData.pages}
                    activePage={page} 
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    secondary
                    pointing
                    onPageChange={changePage}
                />
            }
        />
    );
}
