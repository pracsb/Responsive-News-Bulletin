import React, { Component, lazy, Suspense } from 'react';
import Card_def from 'react-bootstrap/Card';
import {Button, Accordion, Container, Row, Col, Modal, ToastBody} from 'react-bootstrap';
import HeaderNav from './HeaderNav_Detailed';
import {FaBookmark, FaRegBookmark, FaAngleDown, FaAngleUp} from 'react-icons/fa';
import Moment from 'moment';
import LinesEllipsis from 'react-lines-ellipsis';
import Truncate from 'react-truncate';
import truncatise from 'truncatise';
import {IoMdShare} from 'react-icons/io'
import {EmailShareButton,FacebookShareButton,TwitterShareButton, FacebookIcon,  TwitterIcon, EmailIcon} from 'react-share';
import ReactTooltip from 'react-tooltip'
import commentBox from 'commentbox.io';
import {bookmarkItems, unbookmarkItems} from './BookmarkFunctions';
import {toast, Zoom, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DetailedArticle extends Component {
    constructor(props)
    {
        
        super(props);
        this.state={
            active:false,
            bookmark: false,
            modalOpen: false,
            falseModal:false,showTruncateText:true
        }
        this.forceUpdate();
    }
        

    initialBookmark()
    {
        
        const bookmarkKeys = JSON.parse(localStorage.getItem('bookmarkKeys')) || [];
        if(bookmarkKeys.length===0)
        {
            this.setState({
                bookmark:false
            })
            console.log("SETTING BKMRK FALSE ")
        }
        else{
            for(var i=0;i<bookmarkKeys.length;i++)
            {
                if(this.props.keyToStore===bookmarkKeys[i])
                {
                    this.setState({
                        bookmark:true
                    })
                    console.log("SETTING BKMRK TRUE ")

                }
            }
        }
    }


    shareClose()
    {
      this.setState({
        shareOpen:false
      })
    }
  
    handleShare(){
      this.setState({shareOpen:true})
    }
  

    handleClick()
    {
        this.setState({active:(this.state.active===true?false:true),
                            showTruncateText:!this.state.showTruncateText
        })
        console.log("ACTIVE: "+this.state.active)
        
        
    }

    handleBookmark()
    {
        this.setState({bookmark:(this.state.bookmark===true?false:true)})
        console.log("BOOKMARK: "+this.state.bookmark)
        if(this.state.bookmark===false)
        {
            this.setState({
                modalOpen: true});
                console.log("SENDING TO BOOKMARK FUNCTIONS")
                // localStorage.clear();
                console.log(this.props)
                bookmarkItems(this.props)
                toast("Saving " + this.props.title,{position: toast.POSITION.TOP_CENTER, autoClose:2000, transition:Zoom, hideProgressBar:true})
        }
        if(this.state.bookmark===true)
        {
            this.setState({
                falseModal:true}
                , () => {setTimeout(this.handleClose.bind(this), 3000)});
                unbookmarkItems(this.props)
                toast("Removing " + this.props.title,{position: toast.POSITION.TOP_CENTER, autoClose:2000, transition:Zoom, hideProgressBar:true})
        
           
        }

    }

    handleClose()
    {
        this.setState({
            modalOpen:false,
            falseModal:false
        });
    }
 
    componentDidMount()
    {   
        console.log("Inside DetailedArticle")
        this.initialBookmark();
        this.forceUpdate();
    }
    render() {
        console.log("IN DETAILED: ")
        console.log(this.state.bookmark)
        if(this.props.keyToStore)
        {commentBox('5712068678254592-proj', {defaultBoxId: this.props.keyToStore});
        }
        return (
        
            <div >
                <ToastContainer></ToastContainer>
                <ReactTooltip />
                <Accordion>
                <Card_def className="detailed">
                    <Card_def.Title>{this.props.title} </Card_def.Title>
                    <div className="date_tags">
                        <div className="detailed_date">{this.props.date}</div>
                        <div className="share_bkmrk"><div style={{display:"inline-flex", justifyContent:"space-evenly"}}><FacebookShareButton data-tip="Facebook" hashtag={"#CSCI_571_NewsApp"} windowHeight={window.innerHeight} windowWidth={window.innerWidth} children={<FacebookIcon className="shareIcons" round={true} size={22}></FacebookIcon>} url={this.props.shareURL}/><TwitterShareButton data-tip="Twitter" hashtags={["CSCI_571_NewsApp"]} children={<TwitterIcon className="shareIcons" round={true} size={22}></TwitterIcon>} url={this.props.shareURL}/><EmailShareButton data-tip="Email" subject={"#CSCI_571_NewsApp"} children={<EmailIcon className="shareIcons" round={true} size={22}></EmailIcon>} url={this.props.shareURL}/></div>
                        {
                           
                        (this.state.bookmark===true)?
                        <FaBookmark data-tip="Bookmark" className="bkmrk" onClick={this.handleBookmark.bind(this)}></FaBookmark>:<FaRegBookmark data-tip="Bookmark" className="bkmrk" onClick={this.handleBookmark.bind(this)}></FaRegBookmark>
                        }
                        
                        </div>
                        
                    </div>
                    
                    <Card_def.Img className="detailedImg" src={this.props.image}>
                    </Card_def.Img>
                    
                   
                   {(this.state.showTruncateText===true)?
                    <Card_def.Body className="detailed_body" > <Truncate lines={4} ellipsis="...">{this.props.description}</Truncate></Card_def.Body>:null}
                     
                    <Accordion.Collapse eventKey="0">
                        
                    <p>{this.props.description}</p>                 
                                                    
                    </Accordion.Collapse>
                    <Accordion.Toggle onClick={this.handleClick.bind(this)} as={this.state.active===true?FaAngleUp:FaAngleDown} variant="link" eventKey="0">
                    
                    </Accordion.Toggle>
                    
                </Card_def>
                </Accordion>
                <div className="commentbox" />
                
            </div>
        )
    }
}
export default DetailedArticle;