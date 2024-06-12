const M=require('mongoose')
M.connect('mongodb+srv://jayaprasadb718:1FegFVGI622NN4hw@cluster0.vwyhndh.mongodb.net/my_database?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( ()=>{
    console.log("database is not connected")
})
