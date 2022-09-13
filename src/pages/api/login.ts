import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useCurrentUser } from "../../context/CurrentUserContext";
import FormData from "form-data";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userName, userPassword } = req.query;
  const body = new FormData();
  body.append("username", userName);
  body.append("password", userPassword);
  res.send(
    await axios
      .post("https://fastapi-mongo-azka.up.railway.app/login", body)
      .then((res) => res.data)
  );
}
