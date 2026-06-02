import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 4000;

//Middleware 
app.use(cors());


//DB




//routes
app.get('/', (req, res) => {
    res.send("API working properly");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})