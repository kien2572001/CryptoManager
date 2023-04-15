// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function hello(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


import connectDB from "../../databases/connectDB";
import Portfolio from "../../databases/models/portfolio";

connectDB();

export default async function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
