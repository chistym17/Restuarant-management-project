const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const port = process.env.PORT || 8000
const stripe = require("stripe")(process.env.Payment_Key)
// middleware
const corsOptions = {
  origin: 'https://restaurant-management-e7db6.firebaseapp.com',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

 

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.dqsrrse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

  const RestaurantDB = client.db("RestaurantDB").collection("MenuDB");
  const CartDB = client.db("CartDB").collection("CartDB");
  const AllUsersDB = client.db("AllUserDB").collection("AllUserDB");
  const paymentDB = client.db("paymentDB").collection("paymentDB");
  try {

///////token related///////////////////////

const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.Access_Token, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
       console.log(decoded)
        next();
      })
    }

   const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await AllUsersDB.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }



  app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.Access_Token, {
        expiresIn: '1h',
      })
      res.send({token})
    })



 app.get('/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
       console.log(email)
       console.log(req.decoded.user)
      if (email !== req.decoded.user) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await AllUsersDB.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
     console.log(admin)
      res.send({ admin });
    })



app.post("/create-payment-intent", async (req, res) => {
  const {price} = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(price*100),
    currency: "usd",
    payment_method_types:['card']
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

 app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentDB.insertOne(payment);

      console.log('payment info', payment);
      const query = {
        _id: {
          $in: payment.cartIds.map(id => new ObjectId(id))
        }
      };

      const deleteResult = await CartDB.deleteMany(query);

      res.send({ paymentResult, deleteResult });
    })

    app.get('/payments/:email', verifyToken, async (req, res) => {
      const query = { email: req.params.email }
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await paymentDB.find(query).toArray();
      res.send(result);
    })


///////////////////////////////////////////////////////////////////


app.get('/menu',async(req,res)=>{
const menuitems= await RestaurantDB.find().toArray()
res.send(menuitems)

})



app.get('/menu/:category', async (req, res) => {
  const category = req.params.category;
  const query={category:category}
  try {
    const menuItems = await RestaurantDB.find(query).toArray();

    if (menuItems.length > 0) {
      res.send(menuItems);
    } else {
      res.status(404).json({ message: 'No menu items found for the specified category.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/cartitems',async(req,res)=>{
const result= await CartDB.find().toArray()
res.send(result)

})

app.get('/AllUser',async(req,res)=>{
console.log(req.headers)
const result= await AllUsersDB.find().toArray()
res.send(result)

})







app.post('/menu',async(req,res)=>{
const item=req.body
const result= await RestaurantDB.insertOne(item)
res.send(result)

})





app.post('/cart',async(req,res)=>{
const item=req.body
const result= await CartDB.insertOne(item)
res.send(result)

})

app.post('/users',async(req,res)=>{
const user=req.body
const query={email:user.email}
const addedUser=await AllUsersDB.findOne(query)
if(addedUser){
return res.send({message:'user already added'})
}

const result= await AllUsersDB.insertOne(user)
res.send(result)

})

 app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options={upsert:true}
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc,options);
      res.send(result);
    })






app.delete('/delete/:id',async(req,res)=>{
const id=req.params.id
const query={_id:new ObjectId(id)}
const result= await CartDB.deleteOne(query)
res.send(result)

})



app.delete('/users/:id',async(req,res)=>{
const id=req.params.id
const query={_id:new ObjectId(id)}
const result= await AllUsersDB.deleteOne(query)
res.send(result)

})
























    // auth related api
    // app.post('/jwt', async (req, res) => {
    //   const user = req.body
    //   console.log('I need a new jwt', user)
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: '365d',
    //   })
    //   res
    //     .cookie('token', token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === 'production',
    //       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    //     })
    //     .send({ success: true })
    // })

    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })

    // Save or modify user email, status in DB
    app.put('/users/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const options = { upsert: true }
      const isExist = await usersCollection.findOne(query)
      console.log('User found?----->', isExist)
      if (isExist) return res.send(isExist)
      const result = await usersCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      )
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from StayVista Server..')
})

app.listen(port, () => {
  console.log(`StayVista is running on port ${port}`)
})
