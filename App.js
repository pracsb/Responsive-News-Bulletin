import React, {Component} from 'react';
import './App.css';
import './HeaderNavigation';
import HeaderNavigation from './HeaderNavigation';
import Card from './NewsCards';
import Moment from 'moment';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import DetailedArticle from './DetailedArticle';
import World from './world';
import Tech from './Tech';
import Business from './Business';
import Sports from './Sports';
import Politics from './Politics';
import HeaderNavDetailed from './HeaderNav_Detailed';
import Favorite from './Favorite';
import SearchResults from './SearchResults'


class App extends Component {
  _isMounted = false;
  apiResponse = [];
  
  
constructor(props){
  super(props);
  this.state = {
    apiResponse: [],
    api : 'https://hw8webtech.wl.r.appspot.com/guardian_home',
    checked : localStorage.getItem('source')===null?true:(localStorage.getItem('source')==='true'?true:false),
    section:'home',
    ClickedArticle: null,
    searchValue: "",
    res_SC:[]
    
  };
  
}


switchChange(checked)
{

  this.setState({
      checked
      })
  if(checked=== true)
  {
    this.populateCard_Guardian();
  }
  if(checked=== false)
  {
    this.populateCard_NY();
  }

}


getSectionFromNav(newSection){
  this.setState({
    section:newSection
  })
 
}


get_image(arr)
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

async populateCard_NY(sec)
{
  var url_to_fetch_ny = 'https://hw8webtech.wl.r.appspot.com/NY_home'
  this.setState({apiResponse: []})
  await fetch(url_to_fetch_ny)
    .then(res=>res.json())
    .then(res => {
      if(this._isMounted)
      {
      this.setState({apiResponse:res.results})
      }
    })
    .catch(console.log)
}


async populateCard_Guardian()
{
  var url_to_fetch_g = 'https://hw8webtech.wl.r.appspot.com/guardian_home'
  this.setState({apiResponse: []})

  await fetch(url_to_fetch_g)
    .then(res=>res.json())
    .then(res => {
      if(this._isMounted)
      {
  
        this.setState({apiResponse:res.results})
      }
     
    })
    .catch(console.log)

}

componentWillMount = ()=>{
  this._isMounted = true;
  if(this.state.checked=== true)
  {
    this.populateCard_Guardian();
  }
  if(this.state.checked=== false)
  {
    this.populateCard_NY();
  }
 
}

componentWillUnmount =()=>{
  this._isMounted = false;
}


renderDetailed(newsFromApp)
{
  this.setState({
    curr_news:newsFromApp
  })
 
}

handleChildClick(ClickedNews)
{
 
  this.setState({
    ClickedArticle:ClickedNews
  })
}

handleSearchClick(selectedValue, responseSearchCards){
  this.setState({
    searchValue:selectedValue,
    res_SC:responseSearchCards
  })
 
}

  render() {

    var default_cards = (this.state.apiResponse && this.state.checked===true) ?
    (this.state.apiResponse.map((news) => 
    {
      return <Link style={{textDecoration:"none"}} key={news.id} to={"/article?" + news.id}><Card onChildClick={this.handleChildClick.bind(this)} newsFromApp={news} key={news.id} image={news.blocks===undefined || news.blocks.main===undefined || news.blocks.main.elements[0].assets.length === 0 ? 
        "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : news.blocks.main.elements[0].assets.slice(-1)[0].file} 
        title={news.webTitle} description={news.blocks.body[0].bodyTextSummary} date={Moment(news.webPublicationDate).format('YYYY-MM-DD')} tag={news.sectionId} shareURL={news.webUrl}/></Link>;
    }))
    :
    (this.state.apiResponse.map((news1) => 
    {
      return <Link style={{textDecoration:"none"}} key={news1.url} to={"/article?" + news1.url}><Card onChildClick={this.handleChildClick.bind(this)} key={news1.url} newsFromApp={news1} image={this.get_image(news1.multimedia)} title={news1.title} description={news1.abstract} date={Moment(news1.published_date).format('YYYY-MM-DD')} tag={news1.section} shareURL={news1.url}/></Link>;
    }))

    var Clicked = (this.state.ClickedArticle!=null)?
      (this.state.checked===false) ?
      <DetailedArticle keyToStore={this.state.ClickedArticle.url} newsFromApp={this.state.ClickedArticle} key={this.state.ClickedArticle.url} image={this.get_image(this.state.ClickedArticle.multimedia)} title={this.state.ClickedArticle.title} description={this.state.ClickedArticle.abstract} date={Moment(this.state.ClickedArticle.published_date).format('YYYY-MM-DD')} tag={this.state.ClickedArticle.section} shareURL={this.state.ClickedArticle.url} source={this.state.checked}></DetailedArticle>
      :
        <DetailedArticle keyToStore={this.state.ClickedArticle.id} newsFromApp={this.state.ClickedArticle} key={this.state.ClickedArticle.id} image={this.state.ClickedArticle.blocks===undefined || this.state.ClickedArticle.blocks.main.elements[0].assets.length === 0 ? 
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : this.state.ClickedArticle.blocks.main.elements[0].assets.slice(-1)[0].file} 
          title={this.state.ClickedArticle.webTitle} description={this.state.ClickedArticle.blocks.body[0].bodyTextSummary} date={Moment(this.state.ClickedArticle.webPublicationDate).format('YYYY-MM-DD')} tag={this.state.ClickedArticle.sectionId} shareURL={this.state.ClickedArticle.webUrl} source={this.state.checked}></DetailedArticle>
        
        :"null"

    
    return (
      <div className="App">
      
        <Switch>
          <Route exact path="/">
        <HeaderNavigation {...this.props} default="home" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
        
         {default_cards}
         </Route>

        <Route path="/world">
            <HeaderNavigation {...this.props} default="world" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
            <World checkedState={this.state.checked} imageNY={this.get_image.bind(this)} onChildClick={this.handleChildClick.bind(this)}></World>
        </Route>

        <Route path="/politics">
            <HeaderNavigation {...this.props} default="politics" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
            <Politics checkedState={this.state.checked} imageNY={this.get_image.bind(this)} onChildClick={this.handleChildClick.bind(this)}>
            </Politics>
        </Route>

        <Route path="/sports">
            <HeaderNavigation {...this.props} default="sports" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
            <Sports checkedState={this.state.checked} imageNY={this.get_image.bind(this)} onChildClick={this.handleChildClick.bind(this)}></Sports>
        </Route>

        <Route path="/technology">   
            <HeaderNavigation {...this.props} default="technology" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
            <Tech checkedState={this.state.checked} imageNY={this.get_image.bind(this)} onChildClick={this.handleChildClick.bind(this)}></Tech>
        </Route>

        <Route path="/business">
            <HeaderNavigation {...this.props} default="business" searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} changeSource={this.switchChange.bind(this)} navSection={this.getSectionFromNav.bind(this)}></HeaderNavigation>
            <Business checkedState={this.state.checked} imageNY={this.get_image.bind(this)} onChildClick={this.handleChildClick.bind(this)}></Business>
        </Route>

        <Route path="/article">
          {<HeaderNavDetailed selectedValue={this.state.searchValue} response={this.state.res_SC} checked={this.state.checked}></HeaderNavDetailed>}
          {Clicked}
          </Route>

        <Route path="/favorites">
        {<HeaderNavDetailed selectedValue={this.state.searchValue} response={this.state.res_SC} checked={this.state.checked}></HeaderNavDetailed>}
          <Favorite></Favorite>
        </Route>

        <Route path="/search">
          <HeaderNavDetailed selectedValue={this.state.searchValue} response={this.state.res_SC} searchRes={this.state.res_SC} searchClick={this.handleSearchClick.bind(this)} propsFromApp={this.state.checked} checked={this.state.checked}></HeaderNavDetailed>
          <SearchResults propsFromHN={this.state.res_SC} checkedState={this.state.checked}></SearchResults>
          </Route>
        </Switch>
      
         
      </div>
    );
  }      

}
export default withRouter(App);
