import React, { Component } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import {BrowserRouter, Switch, Route, Redirect, Link, withRouter} from 'react-router-dom';
import HeaderNavDetailed from './HeaderNav_Detailed';
import DetailedArticle from './DetailedArticle';
import FavCards from './favouriteCards';
import { unbookmarkItems } from './BookmarkFunctions';
import {toast, Zoom, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 


class Favorite extends Component {
    constructor(props){
       
        super(props)
        this.state={
            clicked:null,
            FavArray:[]
        }
    }
    
    handleClick(ClickedNews)
    {
       this.setState({
           clicked:ClickedNews
       });

    }

    cardDelete(Card){
        
        unbookmarkItems(Card);
        toast("Removing " + Card.title,{position: toast.POSITION.TOP_CENTER, autoClose:2000, transition:Zoom, hideProgressBar:true})
        this.setState({
            FavArray:JSON.parse(localStorage.getItem('bookmarkedItems')) || []
        })
    }


    render() {
      
        const items = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
       
        const cards = 
            
            (
                items.map((i)=>{
                       return <Col key={i.keyToStore} lg={{span:3}} md={{span:6}}>
                                <Link style={{textDecoration:"none"}} key={i.keyToStore} to={"/article?" + i.keyToStore}>
                                    <FavCards onChildClick={this.handleClick.bind(this)} onCardDelete={this.cardDelete.bind(this)} keyToStore={i.keyToStore} key={i.keyToStore} newsFromApp={i} image={i.image} title={i.title} description={i.description} date={i.date} tag={i.tag} source={i.source} shareURL={i.shareURL}>
                                    </FavCards>
                                </Link>
                            </Col>
                    }
                )
            )

        const article = (this.state.clicked===null)? <div>"NOT CLICKED"</div>:
            <DetailedArticle keyToStore={this.state.clicked.keyToStore} newsFromApp={this.state.clicked} key={this.state.clicked.keyToStore} image={this.state.clicked.image} title={this.state.clicked.title} description={this.state.clicked.description} date={this.state.clicked.date} tag={this.state.clicked.tag} source={this.state.clicked.source} shareURL={this.state.clicked.shareURL}></DetailedArticle>
     
        return (
            <div style={{backgroundColor:"white"}}>
                {
                    (items.length===0)?
                    <div style={{textAlign:"center"}}><h3>You have no saved articles</h3></div>
                    :
                    <h5 style={{marginLeft:"2.25rem", marginTop:"0.75rem"}}>Favorites</h5>

                }
                <ToastContainer></ToastContainer>
                <Container style={{margin:"auto"}}>
                    <Row sm={1} md={2} lg={4}>
               {cards}
               </Row>
               </Container>
                {/* <FavCards></FavCards> */}


            <Route path="/article">
                <HeaderNavDetailed response={this.state.res_SC} checked={this.state.checked}></HeaderNavDetailed>
                {article}
            </Route>
            </div>
            
        )
    }
}
export default Favorite;