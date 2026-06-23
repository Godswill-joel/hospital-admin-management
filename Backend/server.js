import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";


const app = express();
const port = process.env.PORT || 4000;

//Middleware 
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send("API working properly");
});

// //DB
// mongoose
//     .connect(process.env.MONGO_URI as string)
//     .then(() => {
//         console.log("Mongodb is connected");


//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch((err) => {
//         console.log("Failed to connect to Mongo", err);
//     });
// export default app;






