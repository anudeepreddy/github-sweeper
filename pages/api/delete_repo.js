import {connectToDatabase} from '../../lib/db';
import { getSession } from 'next-auth/client'
import axios from 'axios';

export default async(req, res) => {
  const repo = req.body;
  console.log(req.body);
  const db = await connectToDatabase(process.env.MONGO_URI);
  const {user} = await getSession({ req });
  
  const userRecord = await db.collection('users').findOne({email:user.email});
  
  const {accessToken} = await db.collection('accounts').findOne({userId:userRecord._id});
 
  try{
    const {data} = await axios.delete(`https://api.github.com/repos/${repo.fullName}`,{headers:{Authorization:`token ${accessToken}`}});
    res.json({status:true});
  } catch(e){
    console.log(e.response.data);
    res.json({status:false});
  }
  
}