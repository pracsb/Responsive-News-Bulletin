import React, { Component } from 'react'
import Card_def from 'react-bootstrap/Card';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import DetailedArticle from './DetailedArticle';
import {IoMdShare} from 'react-icons/io'
import {EmailShareButton,FacebookShareButton,TwitterShareButton, FacebookIcon,  TwitterIcon, EmailIcon} from 'react-share'
import {MdDelete} from 'react-icons/md';
import { unbookmarkItems } from './BookmarkFunctions';

class favouriteCards extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            curr_article:props.newsFromApp,
            shareOpen:false
        }
        
    }
    handleShare(event){
        this.setState({shareOpen:true})
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopPropagation()
    }
    shareClose(e)
  {
    this.setState({
      shareOpen:false
    });
  }
  
  favCardClick(event){
        if(event.target.tagName.toLowerCase() === 'span')
         { event.stopPropagation();
            event.preventDefault();
        }
        this.props.onChildClick(this.props.newsFromApp)
      }

    handleDelete(event){
        if(event.target.tagName.toLowerCase() === 'path')
        { 
            event.stopPropagation();
            event.preventDefault();
        }
        this.props.onCardDelete(this.props.newsFromApp);
    }
    render() {
        return (
            <div onClick={this.favCardClick.bind(this)}>
                <Card_def style={{margin:"5px", padding:"1.5rem", marginBottom:"1.5rem"}}>
                    <h5 className="title"> {this.props.title}<IoMdShare className="share" onClickCapture={this.handleShare.bind(this)}></IoMdShare><MdDelete className="delete" onClickCapture={this.handleDelete.bind(this)}></MdDelete></h5>
                    <Card_def.Img className="s_card_img" src={this.props.image} alt="No Image">
                    </Card_def.Img>
                    <div className="date_tag s_dateTag">
                        <div className="date">{this.props.date}</div>
                        <div style={{display:"inline-flex"}}>
                        <div className="tag fav_tag" id={this.props.tag}>{this.props.tag}</div>
                        <div className="newsSource tag" id={this.props.source}>{this.props.source}</div> 
                        </div>  
                    </div>
                </Card_def>
                <Modal show={this.state.shareOpen} onHide={this.shareClose.bind(this)}>
                <Modal.Header className="fav_modal" style={{display:"block"}} closeButton>
                <Modal.Title style={{textTransform:"uppercase"}}>{this.props.source}</Modal.Title>
               <Modal.Title style={{fontSize:"1.25rem"}}>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Title style={{textAlign:"center", fontSize:"1.25rem"}}>Share via</Modal.Title>
                <p style={{display:"inline-flex", justifyContent:"space-evenly", marginLeft:"-105px"}}><FacebookShareButton hashtag={"#CSCI_571_NewsApp"} windowHeight={window.innerHeight} windowWidth={window.innerWidth} children={<FacebookIcon round={true} size={52}></FacebookIcon>} url={this.props.shareURL}/><TwitterShareButton  hashtags={["CSCI_571_NewsApp"]} children={<TwitterIcon round={true} size={52}></TwitterIcon>} url={this.props.shareURL}/><EmailShareButton subject={"#CSCI_571_NewsApp"} children={<EmailIcon round={true} size={52}></EmailIcon>} url={this.props.shareURL}/></p>
                </Modal>
                
            </div>
        )
    }
}
export default favouriteCards;