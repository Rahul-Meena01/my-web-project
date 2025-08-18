const port=4000;
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const e = require("express");
const { log } = require("console");

app.use(express.json());
app.use(cors());

//database connection
mongoose.connect("mongodb+srv://harshkaswan420:kaswankaswan@cluster0.ple3rvi.mongodb.net/my?retryWrites=true&w=majority&appName=Cluster0")

//api creation

app.get("/", (req, res) => {
    res.send("Express app is working");
})

 // image storage engine
const storage=multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname }_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload=multer({storage: storage})
// create upload endpoint for images
app.use('/images', express.static('uploads/images'));
app.post("/upload",upload.single('product'),(req, res) => {
    res.json({
        success: 1,
         image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for product
const Product = mongoose.model("product",{
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number, 
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    avilable: {
        type: Boolean,
        default: true
    },


})

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_Product_array = products.slice(-1);
        let last_Product = last_Product_array[0];
        id = last_Product.id + 1;
    } else {
        id = 1;
    }
    const newProduct = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        // avilable: req.body.avilable
    });
    console.log(newProduct);
    await newProduct.save();
    console.log("Product added successfully");
    res.json({
        success: true,
        name: req.body.name,
       
    })
})
// creating api for deleting product

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product deleted successfully");
    res.json({
        success: true,
        name: req.body.name
    })
})
// creating api for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched successfully");
    res.send(products);

})

//schema for user
const User = mongoose.model("users", {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
       
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


// creating api for user registration
app.post("/signup", async (req, res) => {
    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Create an empty cart
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user INSTANCE with a different name ('newUser')
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        // Save the new user to the database
        await newUser.save();
        console.log("User registered successfully");

        // Create JWT token
        const data = {
            user: {
                id: newUser._id
            }
        };
        const token = jwt.sign(data, 'harsh'); // 'harsh' ko ek secret key se badalna behtar hai

        // Send a SINGLE response with success and the token
        res.json({
            success: true,
            token: token
        });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// creating endpoint for user login
app.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user._id } };
            // This correctly creates the token
            const token = jwt.sign(data, 'harsh');
            res.json({ success: true, token });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});

// creating endpoint for newcollection
app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New collection fetched successfully");
    res.send(newCollection);
})

// creating endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find ({ category: "women"});
    let popular_in_women= products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// creating middleware for fatching user data

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
     }
     else {
        try {
            const data = jwt.verify(token, 'harsh'); // 'harsh' ko ek secret key se badalna behtar hai 
            req.user = data.user; // Set the user data in the request object
            next(); // Call the next middleware or route handler
    }catch (error) {
           res.status(401).json({ error: "Please authenticate using a valid token" });
        }
    }
}      


//creating endpoint for adding product in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);

    const updatePath = `cartData.${req.body.itemId}`;

    await User.findOneAndUpdate(
        { _id: req.user.id },
        { $inc: { [updatePath]: 1 } }
    );

    // Send a JSON response instead of a plain string
    res.json({ success: true, message: "Added to cart" });
});

// creating endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);

    const updatePath = `cartData.${req.body.itemId}`;

    // Use $inc with a negative value to decrement
    // Also, add a condition to ensure the item count is greater than 0 before decrementing
    await User.findOneAndUpdate(
        { _id: req.user.id, [updatePath]: { $gt: 0 } }, // Only update if item count > 0
        { $inc: { [updatePath]: -1 } } // $inc with -1 decreases the value
    );

    res.send("Removed");
});

// creating endpoint to get cart data
app.get("/getcart", fetchUser, async (req, res) => {
    console.log("get cart data");
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
}
)

app.listen(port,'0.0.0.0', (error) => {
    if (!error) {
        console.log("server running on port " + port);
    } else {
        console.log("error occurred " + error);
    }
})