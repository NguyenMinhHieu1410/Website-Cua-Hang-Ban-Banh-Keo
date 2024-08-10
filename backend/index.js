const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { default: Stripe } = require("stripe");

const dotenv = require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
//mongodb connect
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));


//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api sign up
app.get("/", (req, res) => {
  res.send("Server is running");
})
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body

  try {
    const result = await userModel.findOne({ email: email }).exec();
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      await data.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", alert: false });
  }

});

//api login
app.post("/login", (req, res) => {
  //console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email })
      .then(result => {
          if (result) {
              console.log(result);
              const dataSend = {
                  _id: result._id,
                  firstName: result.firstName,
                  lastName: result.lastName,
                  email: result.email,
                  image: result.image,
              };
              console.log(dataSend);
              res.send({ message: " Login is successful", alert: true, data: dataSend });
          } else {
              res.send({ message: "Email id is not registered", alert: false });
          }
      })
      .catch(err => {
          // Xử lý lỗi nếu có
          console.error(err);
          res.status(500).send({ message: "Internal server error", alert: false });
      });
    });


    //product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1P7ZBQCkPF9sMU8vkzWmJCer"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "vnd",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 1,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})
// update product
app.post("/product/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    res.send({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
});


// API xóa sản phẩm
app.delete("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    // Thực hiện xóa sản phẩm từ cơ sở dữ liệu bằng id
    await productModel.findByIdAndDelete(productId);
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
// API tìm kiếm sản phẩm theo tên
app.get("/search", async (req, res) => {
  const { query } = req.query;
  
  try {
    const results = await productModel.find({ 
      name: { $regex: query, $options: "i" }  // $regex và $options: "i" để tìm kiếm không phân biệt chữ hoa/thường
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.listen(PORT, () => console.log("server is running at port : " + PORT));

