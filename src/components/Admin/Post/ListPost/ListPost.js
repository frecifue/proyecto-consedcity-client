import React, { useEffect, useState } from 'react'
import "./ListPost.scss"
import { map, size } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import { Post } from '../../../../api';
import { PostItem } from '../PostItem';

const postController = new Post();

export function ListPost(props) {
    const {active, reload,  onReload} = props;
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
      (async () => {
        try {
            setPosts(null);
            const {data} = await postController.getPosts(page, 10);
            setPosts(data.posts);
            setPagination({
              limit : data.limit,
              page: data.page,
              pages: data.totalPages,
              total: data.total,
            });
         
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [active, reload, page]);

    const changePage = (_, data) =>{
      setPage(data.activePage)
    }

    if(!posts) return <Loader active inline="centered"/>
    if(size(posts) === 0) return "No se han encontrado noticias"


  return (
    <div className='list-post'>
      {map(posts, (post)=> <PostItem key={post.pos_id} post={post} onReload={onReload}/>)}

      <div className='list-post__pagination'>
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
          />
      </div>

    </div>)
}
