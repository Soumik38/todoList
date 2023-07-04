const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose")
const app=express();
const defArr=[]
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Soumik:1234@cluster0.yxlayai.mongodb.net/todolist")
const itemsSchema={
  name:{
    type:String,
    required:true
  }
}

const Item=mongoose.model("Item",itemsSchema)

app.get("/", function(req, res) {
  Item.find({}).then(function(foundItems){
    const day = date.getDate()
    res.render("list", {listTitle:day,newListItems:foundItems})
  })
  .catch(function(err){
    console.log(err)
  })
})

app.post("/", function(req, res){
  const listItem=new Item({name:req.body.newItem})
  listItem.save()
  defArr.push(listItem)
  res.redirect("/")
})

app.post("/delete",function(req,res) {
  Item.deleteOne({name:req.body.checkbox}).then(function(){
    console.log("Data deleted")
  }).catch(function(error){
    console.log(error)
  })
  res.redirect("/")
})
const port=process.env.PORT || 3000
app.listen(3000, function() {
  console.log(`Server started on port ${port}`);
});