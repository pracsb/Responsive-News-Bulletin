import React, { Component } from 'react';
import Card from './NewsCards';
import {Link, Route} from 'react-router-dom';
import Moment from 'moment';
import DetailedArticle from './DetailedArticle';

class world extends Component {
    constructor(props)
    {
        
        super(props);
        this.state={
            checked:localStorage.getItem('source')===null?true:(localStorage.getItem('source')==='true'?true:false),
            get_image_NY: props.imageNY,
            apiResponse: [],
            redirect : false,
            ClickedArticle: null
        }
        this.get_api_response(localStorage.getItem('source')===null?true:(localStorage.getItem('source')==='true'?true:false));
    }



    get_image_World(arr)
    {
        
        if(arr===undefined || arr===null)
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].width>=2000)
            return arr[i].url;
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }

    async get_api_response(checkedState){
        
        if(checkedState==true)
        {
            this.setState({apiResponse: []})
            await fetch('https://hw8webtech.wl.r.appspot.com/guardian_world')
            .then(res=>res.json())
            .then(res => {
                if(this._isMounted)
                {
            
            this.setState({ apiResponse: res.results})
            }})
            .catch(console.log)
        }
        if(checkedState==false)
        {
            
            this.setState({apiResponse: []})
            await fetch('https://hw8webtech.wl.r.appspot.com/NY_world')
            .then(res=>res.json())
            .then(res => {
                if(this._isMounted)
                {
            this.setState({apiResponse:res.results})
            }})
            .catch(console.log)
        }
    }


    handleChildClick(ClickedNews)
    {
        this.props.onChildClick(ClickedNews)
       
   
    }

    componentWillMount = ()=>{
        this._isMounted = true;}

    componentWillUnmount =()=>{
        this._isMounted = false;
      }

    componentWillReceiveProps(newProps){
        this.setState({
            checked: newProps.checkedState
        })
        localStorage.setItem('source', newProps.checkedState)
        
        this.get_api_response(newProps.checkedState);

    }

    render() {
        var default_cards = (this.state.apiResponse && this.state.checked==true) ?
        (this.state.apiResponse.map((news) => 
            {
            return <Link style={{textDecoration:"none"}} key={news.id} to={"/article?"+ news.id}><Card onChildClick={this.handleChildClick.bind(this)} newsFromApp={news} key={news.id} image={news.blocks===undefined || news.blocks.main===undefined || news.blocks.main.elements[0].assets.length === 0 ? 
                "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : news.blocks.main.elements[0].assets.slice(-1)[0].file} 
                title={news.webTitle} description={news.blocks.body[0].bodyTextSummary} date={Moment(news.webPublicationDate).format('YYYY-MM-DD')} tag={news.sectionId} shareURL={news.webUrl}/></Link>;
            }))
        :
            (this.state.apiResponse.map((news) => 
            {
            return  <Link style={{textDecoration:"none"}} key={news.url} to={"/article?"+ news.url}><Card onChildClick={this.handleChildClick.bind(this)}  newsFromApp={news} key={news.url} image={this.get_image_World(news.multimedia)} title={news.title} description={news.abstract} date={Moment(news.published_date).format('YYYY-MM-DD')} tag={news.section} shareURL={news.shareUrl}/></Link>;
            }))


        return (
            <div>
               {default_cards}
              
            </div>
        )
    }
}
export default world;