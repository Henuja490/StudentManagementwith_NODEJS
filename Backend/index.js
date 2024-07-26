const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
let db;

app.use(express.json())
app.use(cors())

app.get("/admin",async (req,res)=>{
    const allStudents =  await db.collection("Students").find().toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
})

app.get("/admin/students/sid/:sid",async(req,res)=>{
        const allStudents =  await db.collection("Students").find({"SID":parseInt(req.params.sid)}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200);
            
        }else{
            res.status(404).json("Not found");
        }
    
})


app.get('/admin/students/firstname/:firstName', async (req, res) => {
    
    const allStudents =  await db.collection("Students").find({"FirstName":req.params.firstName}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
});


app.get('/admin/students/lastname/:lastName', async (req, res) => {
    const allStudents =  await db.collection("Students").find({"LastName":req.params.lastName}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
            
        }else{
            res.status(404).json("Not found");
        }
});

app.get('/admin/students/email/:email', async (req, res) => {
    const allStudents =  await db.collection("Students").find({"Email":req.params.email}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200);
            
        }else{
            res.status(404).json("Not found");
        }
});

app.get('/admin/students/city/:city', async (req, res) => {
    const allStudents =  await db.collection("Students").find({"NearCity":req.params.city}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200);
        }else{
            res.status(404).json("Not found");
        }
});

app.get('/admin/students/course/:course', async (req, res) => {
    const allStudents =  await db.collection("Students").find({"Course":req.params.course}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
});


app.get('/admin/students/guardian/:guardian', async (req, res) => {
    const allStudents =  await db.collection("Students").find({"Guardian":req.params.guardian}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
});

app.post('/admin/students', async (req, res) => {
    const student = req.body;
    try {
        const result = await db.collection('Students').insertOne(student);
        res.status(201).send(result.ops[0]);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/admin/students/:sid', async (req, res) => {
    const  sid  = parseInt(req.params.sid);
    const updatedStudent = req.body;

    try {
        await db.collection('Students').updateOne({ "SID":sid }, { $set: updatedStudent });
        res.send(updatedStudent);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.put('/admin/students/firstname/:firstName', async (req, res) => {
    const firstName = req.params.firstName;
    const update = req.body;
    try {
        const result = await db.collection('Students').findOneAndUpdate({ firstName }, { $set: update }, { returnOriginal: false });
        if (result.value) {
            res.send(result.value);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/admin/deletestudents/:sid', async (req, res) => {
    const allStudents =  await db.collection("Students").deleteOne({"SID":parseInt(req.params.sid)});
        if (allStudents) {
            res.status(200).json("You have deletd correctly");
            console.log(allStudents);
        }else{
            res.status(404).json("Not found");
        }
});

async function start(){
    const client = new MongoClient("mongodb://Henuja:Dulneth123@localhost:27017/StudentManagementSystem?&authSource=admin")
    await client.connect()
    db = client.db()
    app.listen(3000,(req,res)=>{
        console.log("Connected to the server")
    })
}
start()
