import './styles.css';

import {Component} from 'react';


import {loadPosts} from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextImput';


export class Home extends Component{
  
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsParPage: 10,
    searchValeu: ''
  };
  //Executa uma ação quando o componente é montado
  async componentDidMount(){
   await this.loadPosts();
 
  };

  loadPosts = async () => {
    const {page, postsParPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsParPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const{
      page,
      postsParPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsParPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsParPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})
  }

  //Executa uma ação quando o componente é atualizado
  componentDidUpdate(){
  
  };
  //Executa uma ação quando o componente é desmontado
  componentWillUnmount(){
  
  };


  handleChange = (event) => {
    const {value} = event.target;
    this.setState({searchValeu: value});

  }

  render(){
    const {posts, page, postsParPage, allPosts, searchValeu} = this.state;
    const noMorePost = page + postsParPage >= allPosts.length;

    const filteredPosts = !!searchValeu ? 
      allPosts.filter(post =>{
        return post.title.toLocaleLowerCase().includes(
          searchValeu.toLocaleLowerCase()
        );
      }) : posts;
   
    return(
      <section className='container'>

        <div className='search-container'> 

          {!!searchValeu && (
            <h1>Search value: {searchValeu}</h1>
          )}

          <TextInput
            searchValeu={searchValeu}
            handleChange={this.handleChange}
          />
        </div>
       

        {filteredPosts.length > 0 &&(
            <Posts posts={filteredPosts}/>
        )}
        {filteredPosts.length === 0 &&(
          <p>Não existem posts</p>
        )}
    
        <div className='button-container'>
          {!searchValeu &&(
            <Button
              onClick = {this.loadMorePosts}
              text="Load more Posts"
              disabled={noMorePost}
            />
          )}
          
        </div>
      </section>
     
     
    ) ;
  }
}


