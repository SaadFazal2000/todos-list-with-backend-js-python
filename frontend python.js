
console.log('Wellcome to my todos app')


// /GET all the post and show all post (refresh)

getAllItems()

function getAllItems() {


    let html = "";
    // let html2 = "";


    fetch('http://127.0.0.1:5000/users')
        .then((res) => {

            return res.json();

        })
        .then((text) => {

            console.log(text)
            text.forEach(function (e, index) {

                // console.log(e.item)
                console.log(e._id.$oid)

                html += `
                <div  class="card my-3">
                <div class="card-body ">
                <h5>Note ${index + 1}</h5>
                <p class="text-success">${e.todos}</p>
                <h6 class="text-info"> ID of the item is ${e._id.$oid}</h6>
                </div>
                <button id="${e._id.$oid}" onclick="deleteNote(this.id)" type="button" class="btn btn-danger">Delete</button>

                <button type="button" id="${e._id.$oid}" class="btn btn-warning my-1" data-toggle="modal" data-target="#exampleModal"
                data-whatever="@mdo">Change your todos</button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New todos</h5>
    
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
    
                        <div class="modal-body">
                            <form>
    
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">TOODS:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                    // /////////////////////////////////////////
                                    <h6 class="text-info"> ID of the item is ${e._id.$oid}</h6>
                                    // /////////////////////////////////////////
                                </div>
                            </form>
                        </div>
    
                        <div class="modal-footer" id="uptadeListParent">
                            
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" id="${e._id.$oid}" onclick="updateNote(this.id)" data-dismiss="modal" class="btn btn-primary">Update</button>
                        </div>
                        
    
                    </div>
                </div>
            </div>

                
                </div>
                
               
                `

                // var idOfItem = e._id; 

                // console.log(idOfItem)

            });

            console.log(text)


            let showItems = document.getElementById('listOfitem')
            // let updateItems = document.getElementById('uptadeListParent')

            if (text.length != 0) {

                showItems.innerHTML = html;
                // updateItems.innerHTML = html2
            } else {
                showItems.innerHTML = 'Nothing to show! Use Addtodo button to add items'
            }



        })

};



// DELETE REQUEST


function deleteNote(id) {
    // alert(id)
    fetch(`http://127.0.0.1:5000/delete/${id}`, {
        method: 'DELETE'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.warn(data)
        getAllItems()
        alert(`Seccessfully Deleted item ${id}`)
    })


}



//  UPDATE POST REQUEST


function updateNote(id_1) {

    
    innerValue = document.getElementById('message-text')
    savedInnerValue = innerValue.value;

    // console.log(id_1)

    if (savedInnerValue === "") {

        alert('please enter some value')

    } else {

        console.log(savedInnerValue)
        console.log(id_1)

        const obj2 = {
            todos: savedInnerValue
        };

        fetch(`http://127.0.0.1:5000/update/${id_1}`, {

            method: 'PUT',
            body: JSON.stringify(obj2),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {

            return response.json()

        }).then((json) => {

            console.log(json)

            alert('Updated successfully.....')

            getAllItems()

        }).catch((err) => {
            console.log(err)
        })

    }
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
            todos: saveInputValue
        };

        fetch('http://127.0.0.1:5000/add', {
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
