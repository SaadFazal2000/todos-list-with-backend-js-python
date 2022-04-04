
console.log('hello')


// function loadData(){
// let xhr = new XMLHttpRequest();


// xhr.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200){
//         console.log(this.responseText)
//     }
// }

// xhr.open('GET','http://localhost:3000/func',true)
// xhr.send();

// }







// function loadData(){
//     fetch('http://localhost:3000/func')
//     .then((response)=>{

//         return (response.json())

//     }).then((data)=>{

//         // console.log(data)
//         data.forEach(e => {

//             console.log(e.item)

//         });


//     }).catch((err)=>{
//         console.log(err)
//     })
// }




// snipits


// let a = 'This is an trail version';


// fetch('http://localhost:3000/func', {

//     method: 'GET',

//     body: JSON.stringify(a)

// }).then((res) => {

//     return res.text;

// }).then((text) => {

//     console.log(text)

// })









// working code 



// post functionality




// let addNote = document.getElementById('addNote')

// addNote.addEventListener('click', function(){

//     let inputArea = document.getElementById('inputArea');

//     let saveInputValue = inputArea.value;

//     if(saveInputValue === ""){
//         alert('please enter some value')
//     }else{


//             fetch('http://localhost:3000/func')
//             .then((response)=>{

//                 return (response.json())

//             }).then((data)=>{

//                 // console.log(data)
//                 data.forEach(e => {

//                     console.log(e.item)

//                 });


//             }).catch((err)=>{
//                 console.log(err)
//             })

//         // console.log(saveInputValue)
//     }
// })










// /GET all the post and show all post (refresh)

getAllItems()

function getAllItems() {

    
    let html = "";


    fetch('http://localhost:3000/func')
        .then((res) => {

            return res.json();

        })
        .then((text) => {

            console.log(text)
                text.forEach(function(e, index){

                    console.log(e.item)
                    // console.log(e._id)

                html += `
                <div  class="card my-3">
                <div class="card-body ">
                <h5>Note ${index + 1}</h5>
                <p class="text-success">${e.item}</p>
                <h6 class="text-info"> ID of the item is ${e._id}</h6>
                </div>
                <button id="${e._id}" onclick="deleteNote(this.id)" type="button" class="btn btn-danger">Delete</button>
                </div>
                `
                    // document.write(e.item)

        var idOfItem = e._id; 

        console.log(idOfItem)

                });

                console.log(text)
                

     let showItems = document.getElementById('listOfitem')
   
     if(text.length != 0){

         showItems.innerHTML =html;
     }else{
        showItems.innerHTML ='Nothing to show! Use Addtodo button to add items'
     }



        })

};

//just checking 1


function deleteNote(id){
    // alert(id)
    fetch(`http://localhost:3000/func/post/${id}`,{
            method:'DELETE'
        }).then((res)=>{
           return res.json()
        }).then((data)=>{
            console.warn(data)
            getAllItems()
            alert(`Seccessfully Deleted item ${id}`)
        })
        // getAllItems()
        

}



//just checking 2


// function deleteNote(index){




//     // let obj = 

//     let url = 'http://localhost:3000/func/post'

//     console.log('i am deleting', index)

//     fetch(` url + ${e._id}`,{

//         method:'DELETE'

//     })
//     getAllItems();
// }







// DELETE REQUEST WORKING

// function deleteNote(e){
// console.log(e)

    // fetch('http://localhost:3000/func')
    // .then((res)=>{
        
    //     return res.json();

    // })
    // .then((text) => {

    //     text.forEach(e =>{
    //         console.log(e._id)
    //     })
    //     // console.log(text)
    // })


    
    // fetch('http://localhost:3000/func/post/:id',{
    //     method:'DELETE'
    // }).then((res)=>{

    //     console.log(res);

    //     return res.json()

    // }).then((data)=>{

    //     console.log(data)

    // }).catch((err) => {

    //     console.log(err)
    // })
    


// }






// POST REQUEST WORKING


let addNote = document.getElementById('addNote')

addNote.addEventListener('click', function () {

    let inputArea = document.getElementById('inputArea');

    let saveInputValue = inputArea.value;

    if (saveInputValue === "") {

        alert('please enter some value')

    } else {


        const obj = {
            item: saveInputValue
        };

        fetch('http://localhost:3000/func/post', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((response) => {

                return response.json()

            }).then((json) => {



                console.log(json)

                // data.forEach(e => {

                //     console.log(e.item)

                // });

                getAllItems()

                showNotes()
            }).catch((err) => {
                console.log(err)
            })



        // console.log(saveInputValue)
    }
})








