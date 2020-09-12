import { getSession } from 'next-auth/client'

export default async (req, res) => {
  res.statusCode = 200
  let result = req.headers
  //let result = await getSession({req});
  res.json(result);
}
