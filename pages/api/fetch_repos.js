import {connectToDatabase} from '../../lib/db';
import { getSession } from 'next-auth/client'
import axios from 'axios';

export default async(req, res) => {
  const db = await connectToDatabase(process.env.MONGO_URI);
  const {user} = await getSession({ req });

  console.log('user >> ' + user.email);
  
  const userRecord = await db.collection('users').findOne({email:user.email});
  
  const {accessToken} = await db.collection('accounts').findOne({userId:userRecord._id});
  console.log('accessToken >> '+accessToken);
 
  try{
    const {data} = await axios.get('https://api.github.com/user/repos?per_page=100',{headers:{Authorization:`token ${accessToken}`}});
    let result = data.map((o)=>{
      return {
        name: o.name,
        url: o.html_url,
        private: o.private,
        description: o.description,
  
      }
    })
  
  
    res.json(result);
  } catch(e){
    //console.log(e);
    res.json([]);
  }
  
}
  