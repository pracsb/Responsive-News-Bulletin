
import _ from 'lodash';


export const bookmarkItems=(article)=>
{

    var keyArray = [];
    keyArray = JSON.parse(localStorage.getItem('bookmarkKeys')) || [];
    
    keyArray.push(article.keyToStore);
  
    localStorage.setItem('bookmarkKeys', JSON.stringify(keyArray));


    var oldArray = [];
    oldArray = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
  
    const newObj = {'keyToStore':article.keyToStore, 'title':article.title, 'date':article.date, 'shareURL': article.shareURL, 'image':article.image, 'description':article.description, 'tag':article.tag, 'source':(article.source===true)?"guardian":"ny times"};
    oldArray.push(newObj);

    localStorage.setItem('bookmarkedItems', JSON.stringify(oldArray));
    
}


export const unbookmarkItems=(article)=>
{
    
    var keyArray = [];
    keyArray = JSON.parse(localStorage.getItem('bookmarkKeys')) || [];
    
    const newKeys = keyArray.filter(k => k!= article.keyToStore)
    localStorage.setItem('bookmarkKeys', JSON.stringify(newKeys));
   
    const newObj = {'keyToStore':article.keyToStore, 'title':article.title, 'date':article.date, 'shareURL': article.shareURL, 'image':article.image, 'description':article.description, 'tag':article.tag, 'source':article.source};
    var itemArray = [];
    itemArray = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
   
    var newItemArray = []
    for(var j=0;j<itemArray.length;j++)
    {
        if(itemArray[j].keyToStore===article.keyToStore)
        {
            continue;

        }
        else
        {
            newItemArray.push(itemArray[j])
        }
    }
   
    localStorage.setItem('bookmarkedItems', JSON.stringify(newItemArray));
  
}