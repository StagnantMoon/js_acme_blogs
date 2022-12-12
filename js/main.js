// Alex Basden
//22/11/2022
//Final Project INF 651
// Make sure to add or else so many errors - I am so dumb...
const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
// -----------------------------------------------------------

//Function 1
function createElemWithText(element = "p", textContent = "", className) 
{
    let elem = document.createElement(element);
    elem.textContent = textContent;
    if (className) elem.setAttribute("class", className);
    return elem;
}
  
  // Function 2
  function createSelectOptions(users) 
  {
    if (users == undefined || users == null) return undefined;
    let options = [];
    users.forEach((user) => {
      let option = document.createElement("option");
      option.setAttribute("value", user.id);
      option.textContent = user.name;
      options.push(option);
    });
    return options;
  }
  
  //Function 3
  function toggleCommentSection(postId) 
  {
    if (postId == undefined || postId == null) return undefined;
    let element = document.querySelector(`section[data-post-id="${postId}"]`);
    if (element) element.classList.toggle("hide");
    return element;
  }
  
  //Function 4
  function toggleCommentButton(postId)
  {
    if (postId == undefined || postId == null) return undefined;
    let element = document.querySelector(`button[data-post-id="${postId}"]`);
    if (element) {
      element.textContent =
        element.textContent == "Show Comments"
          ? "Hide Comments"
          : "Show Comments";
    }
    return element;
  }
  
  //Function 5
  function deleteChildElements(parentElement) 
  {
    if (!parentElement?.tagName) return undefined;
  
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }
  
  //Function 6
  function addButtonListeners() 
  {
    let buttons = document.querySelector("main").querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        function (e) {
          toggleComments(e, button.dataset.postId);
        },
        false
      );
      //console.log(button);
    });
    return buttons;
  }
  
  //Function 7
  function removeButtonListeners() 
  {
    let buttons = document.querySelector("main").querySelectorAll("button");
    buttons.forEach((button) => {
      button.removeEventListener(
        "click",
        function (e) {
          toggleComments(e, button.dataset.postId);
        },
        false
      );
      //console.log(button);
    });
    return buttons;
  }
  
  //Function 8
  function createComments(comments) 
  {
    if (comments == undefined || comments == null) return undefined;
  
    let fragment = document.createDocumentFragment();
    comments.forEach((comment) => {
      let article = document.createElement("article");
      article.append(createElemWithText("h3", comment.name));
      article.append(createElemWithText("p", comment.body));
      article.append(createElemWithText("p", `From: ${comment.email}`));
      fragment.append(article);
    });
    return fragment;
  }
  
  // Function 9
  function populateSelectMenu(users) 
  {
    if (users == undefined || users == null) return undefined;
    let menu = document.getElementById("selectMenu");
    let options = createSelectOptions(users);
    options.forEach((option) => menu.append(option));
    return menu;
  }
  

  //function 10
  async function getUsers() {
    const url = BASE_API_URL + "users";
    try {
      return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
    }
  }
  
  //function 11
  async function getUserPosts(userId) 
  {
    if (userId == undefined || userId == null) return undefined;
    const url = BASE_API_URL + `users/${userId}/posts`;
    try {
      return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function 12
  async function getUser(userId) 
  {
    if (userId == undefined || userId == null) return undefined;
    const url = BASE_API_URL + `users/${userId}`;
    try {
      return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
    }
  }// Function 10-14 errors double check(11/30/2022) turned from 33 passed to 0 passed...
  // Make sure to include top line... remember always like in Java/Python etc
  
  // Function 13

  async function getPostComments(postId) 
  {
      if (postId == undefined || postId == null) return undefined;
      const url = BASE_API_URL + `posts/${postId}/comments`;
      try {
        return fetch(url).then((response) => response.json());
      } catch (error) {
        console.error(error);
      }
  }// end function 13
  
  // Function 14
  async function displayComments(postId) 
  {
      if (postId == undefined || postId == null) return undefined;
      let section = document.createElement('section');
      section.dataset.postId = postId;
      section.classList.add('comments', 'hide');
      let comments = await getPostComments(postId);
      let fragment = await createComments(comments);
      section.append(fragment);
      return section;
  }
  
  //function 15
  async function createPosts(posts) 
  {
      if (posts == undefined || posts == null) return undefined;
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < posts.length; i++) 
      {
          let post = posts[i];
          let article = document.createElement("article");
          
          article.append(createElemWithText("h2", post.title));
          article.append(createElemWithText("p", post.body));
          article.append(createElemWithText("p", `Post ID: ${post.id}`));
          
          let author = await getUser(post.userId);
          article.append(createElemWithText("p", 
          
          `Author: ${author.name} with ${author.company.name}`));
          article.append(createElemWithText("p", author.company.catchPhrase));
          
          let button = createElemWithText("button", "Show Comments")
          button.dataset.postId = post.id;
          article.append(button);
          
          let section = await displayComments(post.id);
          article.append(section);
          fragment.append(article);
        } // end for loop
      return fragment;
  }// end createPosts
  

  //Function 16
  async function displayPosts(posts)
   {
      let main = document.querySelector('main');
      let element;
      if (posts!= undefined && posts != null) 
      { 
          element = await createPosts(posts);
         
      }
      else 
      {
      element = createElemWithText('p', "Select an Employee to display their posts."); // Make sure to spell correctly
      element.classList.add('default-text');
      }// else
      main.append(element);
      return element;
  }// 16
  
  // Function 17
  function toggleComments(event, postId)
   {
      if (event == undefined || event == null || postId == undefined || postId == null) return undefined;
  
      let result = [];
      event.target.listener = true;
      result.push(toggleCommentSection(postId));
      result.push(toggleCommentButton(postId));
      return result;
  }
  
  //Function 18
  async function refreshPosts(posts) 
  {
      if (posts == undefined || posts == null) return undefined;
      let result = [];
      let main = document.querySelector('main');
      //Result Pushing
      result.push(removeButtonListeners());
      result.push(deleteChildElements(main));
      result.push(await displayPosts(posts));
      result.push(addButtonListeners());
      //return reulsts
      return result;
  }

  //Function 19
  const selectMenuChangeEventHandler = async (e) => 
  {
    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
} 
// had 0 zeros and now 1, whatever...   
// The function selectMenuChangeEventHandler returns undefined if it does not receive the event parameter. (Error)

  // Function 20
  async function initPage() 
  {
      let users = await getUsers();
      let select = populateSelectMenu(users);
      return [users, select]
  }
 
  //Function 21
  async function initApp()
   {
      initPage();
      let menu = document.getElementById('selectMenu');
      menu.addEventListener('change', selectMenuChangeEventHandler);
  }

/*   NOTE: There is one last step to get your app to function correctly. I cannot test for this, but you
  must apply it to call the script into action.
  *** This must be underneath the definition of initApp in your file.
  1. Add an event listener to the document.
  2. Listen for the “DOMContentLoaded” event.
  3. Put initApp in the listener as the event handler function.
  4. This will call initApp after the DOM content has loaded and your app will be started. */
  document.addEventListener('DOMContentLoaded', initApp);






