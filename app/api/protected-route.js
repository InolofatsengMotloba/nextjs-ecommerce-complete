import { getAuth } from "firebase-admin/auth";

export default async function handler(req, res) {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return res
      .status(200)
      .json({ message: "Authorized", uid: decodedToken.uid });
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
}
