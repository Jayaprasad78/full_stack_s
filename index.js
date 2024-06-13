require('./db/connection')
const model_cons = require('./schema/schema')


const cors=require('cors')


app.use(cors(
    {
        origin: ["https://full-stack-s.vercel.app"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow DELETE method
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));
const E = require('express')
const app = E();
const bp = require('body-parser')
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json())


const path=require('path')

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))


 app.use('/public', E.static('public'));



app.get('/', (req, res) => {
   res.render('home')
})

app.get('/signin', (req, res) => {
   res.render('signin')
})
app.get('/signup', (req, res) => {
   res.render('signup')
})

app.get('/forgot',(req,res)=>{
   res.render('forgot')
})

app.post('/re',async(req,res)=>{
   console.log("requested")
   const emailexist =  await model_cons.findOne({ email: req.body.email})
   if(!emailexist)
      {
         return res.send("user not exist")
      }
      else
      {
         emailexist.password=req.body.password
         emailexist.cpassword=req.body.password
         emailexist.save()
         
      }

})




app.post('/reg', async (req, res) => {
   try {
      
      if (!req.body.name || !req.body.email || !req.body.job || !req.body.password || !req.body.cpassword) {
         return res.status(400).json({ error: "Please fill in all fields" });
      }

     
      const emailexist = await model_cons.findOne({ email: req.body.email });
      if (emailexist) {
         return res.status(409).json({ error: "Email already exists, please use a different email" });
      }

     
      if (req.body.password !== req.body.cpassword) {
         return res.status(400).json({ error: "Password and confirm password do not match" });
      }

     
      const newUser = new model_cons({
         name: req.body.name,
         email: req.body.email,
         job: req.body.job,
         password: req.body.password,
         cpassword: req.body.cpassword
      });

      await newUser.save();
      return res.status(201).json({ message: "Registration successful" });
   } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).json({ error: "Internal server error" });
   }
});



app.post('/login', async(req,res) => {
   const emailexist=  await model_cons.findOne({email:req.body.email})
   // const password_match= bp.compare(req.body.password,emailexist.password)
   if(!emailexist)
      {
         return res.send("user not exist ,kindly register first")
      }
   else if (req.body.password!=emailexist.password)
      {
         return res.send("password incorrect")
      }
      else
      {
         return res.send("singed in ")
      } 
})

app.get('*',(req,res)=>{
   res.send(" sorry this page is not found")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log("my server is running on 3000 port")
})



