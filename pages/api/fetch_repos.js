import {connectToDatabase} from '../../lib/db';
import { getSession } from 'next-auth/client'
import axios from 'axios';

export default async(req, res) => {
  const db = connectToDatabase('');
  //const {user} = await getSession({ req });
  console.log(getSession({req}));/*
  const userRecord = await db.collection('users').findOne({email:user.email});
  const access_token = await db.collection('accounts').findOne({userId:userRecord._id});

  const result = await axios.get('https://api.github.com/user',{headers:{Authorization:`token ${access_token}`}});
 
  res.json(result);
*/
res.end();
  
}
  