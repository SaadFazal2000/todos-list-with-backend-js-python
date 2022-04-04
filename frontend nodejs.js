
console.log('Wellcome to my todos app')


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

        // var idOfItem = e._id; 

        // console.log(idOfItem)

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



// DELETE REQUEST


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
        

}






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

               

                getAllItems()

                // showNotes()
            }).catch((err) => {
                console.log(err)
            })



        // console.log(saveInputValue)
    }
})
