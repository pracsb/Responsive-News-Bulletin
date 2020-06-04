import React, { Component } from 'react'
import SearchCards from './SearchCards'
import Moment from 'moment';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import HeaderDetailed from './HeaderNav_Detailed'
import {BrowserRouter, Switch, Route,Link} from 'react-router-dom';
import DetailedArticle from './DetailedArticle';

import HeaderNavDetailed from './HeaderNav_Detailed';

class SearchResults extends Component {
    constructor(props)
    {
       
        super(props)
        this.state={
            checked:props.checkedState,
            response:props.propsFromHN,
            ClickedArticle:null
        }
       
        let keyword = window.location.href.split("=")[1]
        
    }

    componentDidUpdate()
    {
        
    }
    handleChildClick(ClickedNews)
    {
       
        this.setState({
            ClickedArticle:ClickedNews
        })
    }

    get_image_SR(arr)
    {
        if(arr===undefined || arr===null)
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].width>=2000)
            return "https://www.nytimes.com/"+arr[i].url;
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }

    render() {
        
        var search_cards=(this.state.response) ? (this.state.checked===true) ?
            this.state.response.map(r =>{
                return <Col key={r.id} lg={{span:3}} md={{span:6}}>
                    <Link style={{textDecoration:"none"}} key={r.id} to={"/article?" + r.id}> <SearchCards newsFromApp={r} onChildClick={this.handleChildClick.bind(this)} key={r.id} keyToStore={r.id} title={r.webTitle} description={r.blocks.body[0].bodyTextSummary} image={r.blocks===undefined || r.blocks.main.elements[0].assets.length === 0 ? 
                    "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : r.blocks.main.elements[0].assets.slice(-1)[0].file} date={Moment(r.webPublicationDate).format('YYYY-MM-DD')} tag={r.sectionId} shareUrl={r.webUrl}></SearchCards></Link></Col>
            })
            :
            this.state.response.map(r =>{
                return <Col key={r.url} lg={{span:3}} md={{span:6}}>
                    <Link style={{textDecoration:"none"}} key={r.url} to={"/article?" + r.url}><SearchCards newsFromApp={r} key={r.url} onChildClick={this.handleChildClick.bind(this)} title={r.headline.main} description={r.abstract} image={this.get_image_SR(r.multimedia)} date={Moment(r.published_date).format('YYYY-MM-DD')} tag={r.news_desk} shareUrl={r.web_url}></SearchCards>
                    </Link></Col>
            }):
            "No Results"



            var Clicked = (this.state.ClickedArticle!=null)? (this.state.checked===false) ?
            <DetailedArticle keyToStore={this.state.ClickedArticle.url} newsFromApp={this.state.ClickedArticle} key={this.state.ClickedArticle.url} image={this.get_image_SR(this.state.ClickedArticle.multimedia)} title={this.state.ClickedArticle.title} description={this.state.ClickedArticle.abstract} date={Moment(this.state.ClickedArticle.published_date).format('YYYY-MM-DD')} tag={this.state.ClickedArticle.section} shareURL={this.state.ClickedArticle.url} source={this.state.checked}></DetailedArticle>
            :
              <DetailedArticle keyToStore={this.state.ClickedArticle.id} newsFromApp={this.state.ClickedArticle} key={this.state.ClickedArticle.id} image={this.state.ClickedArticle.blocks===undefined || this.state.ClickedArticle.blocks.main.elements[0].assets.length === 0 ? 
                "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : this.state.ClickedArticle.blocks.main.elements[0].assets.slice(-1)[0].file} 
                title={this.state.ClickedArticle.webTitle} description={this.state.ClickedArticle.blocks.body[0].bodyTextSummary} date={Moment(this.state.ClickedArticle.webPublicationDate).format('YYYY-MM-DD')} tag={this.state.ClickedArticle.sectionId} shareURL={this.state.ClickedArticle.webUrl} source={this.state.checked}></DetailedArticle>
              :"No Results"
        
        return (
            <div>
                {/* <HeaderDetailed></HeaderDetailed> */}
                <h4 style={{marginLeft:"2.25rem", marginTop:"0.75rem"}}>Results</h4>
                <Container style={{margin:"auto"}}>
                    <Row sm={1} md={2} lg={4}>
                        {search_cards}
                
                    </Row>
               </Container>
               <Route path="/article">
                <HeaderNavDetailed selectedValue={this.state.searchValue} checked={this.state.checked}></HeaderNavDetailed>
                {Clicked}
          </Route>
            </div>
        )
    }
}
export default SearchResults;