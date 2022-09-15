import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs/promises";
import { Note } from "../../utils/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, title } = req.query;
  const data: Note[] = await axios
    .get(`https://fastapi-mongo-azka.up.railway.app/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  res.send(data);
  //   console.log(res);
  //   res.send(data);
}
