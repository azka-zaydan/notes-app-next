import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, title } = req.query;

  const data = await axios
    .get(`https://fastapi-mongo-azka.up.railway.app/notes?title=` + title, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
  console.log(res);
  res.send(data);
}
