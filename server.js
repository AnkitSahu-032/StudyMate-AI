const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.get('/api/health',(_req,res)=>res.json({status:'ok',app:'StudyMate AI'}));
// For production, configure a valid HTTPS endpoint and Alexa request verification.
// The recommended Alexa deployment is the separately supplied Lambda handler.
app.listen(process.env.PORT||3000,()=>console.log('StudyMate running at http://localhost:'+(process.env.PORT||3000)));
