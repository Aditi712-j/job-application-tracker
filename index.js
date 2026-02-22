import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";

dotenv.config();

const app=express();
const port=3000;
const saltround=10;

app.use(session({
secret:process.env.secret,
resave:false,
saveUninitialized:false,
cookie:{
   maxAge:1000*60*60*24,
   secure:false,
   httpOnly:true
}
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const db=new pg.Client({
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password:process.env.DB_PASSWORD,
   database:process.env.DB_NAME,
   port:process.env.DB_PORT,
});

db.connect()

const isAuthenticated=(req,res,next)=>{
   if(req.session.userId){
      return next();
   }
   res.status(401).send("unauthorized:please log in first.");
};
  
const formatStatus=(str)=>{
   if(!str) return null;
   return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();

}
app.post('/register',async(req,res)=>{
   const email=req.body.username;
   const password=req.body.password;

   try{
     const checkresult=await db.query("select * from users where email=$1",[email]);
     if(checkresult.rows.length>0) {
     res.send("email already exists.try logging in.");
   }else{
    
      bcrypt.hash(password,saltround,async(err,hash)=>{
        if(err){
         console.error("error hashing password:",err);
        }else{
         console.log("hashed password:",hash);
         const result=await db.query(
      "insert into users(email,password) values ($1,$2) RETURNING user_id",[email,hash]
         );

         req.session.userId=result.rows[0].user_id;
         res.status(201).send("User registered and logged in.");
        }
      });
   }
 }catch(err){
   console.log(err);
 }


});
app.post('/login',async(req,res)=>{
   const email=req.body.username;
   const loginpassword=req.body.password;

   try{
   const result=await db.query("select * from users where email=$1",[email
   ]);
   if(result.rows.length>0){
      const user=result.rows[0];
      const storedhashedpassword=user.password;

      bcrypt.compare(loginpassword,storedhashedpassword,(err,result)=>{
         if(err){return res.status(500).send("Error comparing")}
            if(result){
               req.session.userId=user.user_id;
               res.send("login successful");
            }else{
               res.status(401).send("Incorrect password");
            }
         });
      }
   else{
      res.status(404).send("user not found");
   }

   }catch(err){
      console.log(err);
   }

});

const allowedstatus=['Applied','Selected','Interviewing','Rejected','Offer'];

app.get('/application/getstatus',(req,res)=>{
 res.json({allowedstatuses:allowedstatus})
});

app.post('/applications',isAuthenticated,async(req,res)=>{
const userId=req.session.userId;
const{job_title,company,status}=req.body;

const formattedstatus=formatStatus(status);

if(!allowedstatus.includes(formattedstatus)){
   return res.status(400).json({
      error:"Invalid status"
   });
}

try{
 await db.query("INSERT into application(user_id, job_title, company, status) VALUES ($1, $2, $3, $4)",
   [userId, job_title, company, formattedstatus]);
 res.status(201).send("Job added successfully!");
}catch(err){
   res.status(500).send("Database error");
}
});

app.put('/applications/:id',isAuthenticated,async(req,res)=>{
const userId=req.session.userId;
const jobId=req.params.id;

const{status}=req.body;

const formattedstatus=formatStatus(status);

if(!allowedstatus.includes(formattedstatus)){
   return res.status(400).send("Invalid status update.");
}
try {
        await db.query(
            "UPDATE application SET status = $1 WHERE id = $2 AND user_id = $3",
            [formattedstatus, jobId, userId]
        );
        res.send("Status successfully updated!");
    } catch (err) {
        res.status(500).send("Update failed.");
    }

});

app.get('/stats',isAuthenticated,async(req,res)=>{
 const userId=req.session.userId;
  
 try{
   const result=await db.query(
      "select status,count(*) as count From application WHERE user_id=$1 GROUP BY status",[
         userId
      ]
   )
   res.json(result.rows);
 }catch (err) {
        res.status(500).send("Stats error");
    }
});


app.delete('/delete/:id',isAuthenticated,async(req,res)=>{
   const userId=req.session.userId;
   const jobId=req.params.id
   
   try{
    const result=await db.query("DELETE FROM application WHERE id=$1 AND user_id=$2",[
      jobId,userId
    ]);

    if(result.rowCount===0){
      return res.status(404).send("application not found.");
    }
    res.send("Application deleted.");
   }catch(err){
      res.status(500).send("error");
   }
});

app.get('/logout',(req,res)=>{
req.session.destroy();
res.send("logged out successfully.");
});


app.listen(port,()=>{
   console.log(`app is running on ${port}`)
});