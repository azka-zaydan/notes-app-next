import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios
    .get("https://fastapi-mongo-azka.up.railway.app/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  res.send(data);
}
