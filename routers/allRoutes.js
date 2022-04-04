
const router = require('express').Router()

const todolist = require('../model/todolist')



// get all items request

router.get('/', async(req, res)=>{
try {
    const items = await todolist.find()
    res.json(items)
} catch (err) {
    res.send('Error '+ err)}
})


//Post request
router.post('/post',async (req, res)=>{

    const post = new todolist ({
        item : req.body.item
    })

try{
 const postreq = await post.save()
 res.json(postreq)
}catch(err){
    res.send('Error '+ err)
}
})


//delete request

router.delete('/post/:id', async(req, res)=>{
    try{

        const removedList = await todolist.remove({ _id: req.params.id})
        res.json(removedList)
    }catch(err){

        res.send('Error '+ err)

    }
})



module.exports = router