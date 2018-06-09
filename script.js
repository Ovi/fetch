// <!-- Property of iOwais.com -->
// <!-- All rights reserved -->
$('#postID').on("focus", () => { $('#postID').val('') });
$('#postID').on("input", () => { $('.msg').html('').css({"background-color": "transparent"}) });
$('.clear-all').on("click", () => { $('.post-group').html('')});

$('.form').submit( e => {
    e.preventDefault();
    var postID = $('#postID').val();
    postID = postID.replace(/^(0+)/g, '');
    
    if(postID == null || postID == undefined || postID == '') {
        $('.msg')
            .html('Please Write Any ID!')
            .css({"background-color": "#FFD2D2", "color": "#D8000C"});
        return;
    }
    if(postID < 1 || postID > 100) {
        $('.msg')
            .html('Range Must be b/w 1 - 100')
            .css({"background-color": "#FFD2D2", "color": "#D8000C"});
        return;
    }
    if(postID > 0 && postID < 101) {
        $("input, button").prop('disabled', true);
        startFetch(postID);
        $('.msg').html('Fetching...');
        $('.msg').css({"background-color": "#DFF2BF", "color": "#4F8A10"});
    } else {
        $('.msg').html('Something Went Wrong');
        $('.msg').css({"background-color": "#FEEFB3", "color": "#9F6000"});
    }
});

function startFetch(postID) {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    var newUrl = url + postID;
    fetch(newUrl)
        .then(response => response.json())
        .then(post => {
            $("input, button").prop('disabled', false);
            $('#postID').val('')
            $('.msg').html('').css({"background-color": "transparent"})
            displayPost(post);
        })
        .catch(err => {
            $("input, button").prop('disabled', false);            
            $('.msg').html('Error in Fetching...<br>' + err);
            $('.msg').css({"background-color": "#FFD2D2", "color": "#D8000C"});
        })
}

function displayPost(post) {
    $('.post-group').prepend(`
    <div class="post">
        <div class="post-title">${post.title}</div>
        <p class="post-body">${post.body}</p>
        <br>
        <p>User ID: <b>${post.userId}</b></p>
        <p>POST ID: <b>${post.id}</b></p>
    </div>
    `);
    $('.posts').fadeIn();
    $( "div .post:first-child" ).delay(700).effect("highlight", {color: '#E4F6FF'}, 2000);
}

// $('button.btn-primary').click( () => {
//         const url = 'https://jsonplaceholder.typicode.com/posts/';
//         var postID = $('#postID').val();
//         console.log(postID)
//         // var customData = url + postID;
//         // fetch(customData)
//         //     .then(response => response.json())
//         //     .then(post => printData(post))
//         //     .catch(err => {
//         //         alert('Something Went Wrong... Please Try Later!');
//         //         console.log(err)
//         //     })
//     }
// )


function printData(post) {
    console.log(post)
    parent.innerHTML = '';
    const title = document.createElement('h3');
    const titleText = document.createTextNode(post.title);
    const newPara = document.createElement('p');
    const t = document.createTextNode(post.body);
    title.appendChild(titleText);
    newPara.appendChild(t);
    parent.appendChild(title);
    parent.appendChild(newPara);
}

$('.close').click(function(){
    $('.posts').fadeOut();
});
