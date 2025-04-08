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

  
  // console.log(page)
  // console.log(searchParams.get("page"));
  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(page, 4);
        setPosts(response.posts);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages,
          total: response.total,
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
      <h2 className="text-center post-title">NOTICIAS</h2>
      {/* <div > */}
        <div className="list">
          {map(posts, (post) => (
            <div key={post.post_id} className="item">
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
      {/* </div> */}
    </section>
  );
}