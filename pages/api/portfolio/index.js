import { getPortfolio } from "../../../lib/formio";

export default async function handler (req, res) {
  let {
    headers: {host}
  } = req;
  const paths = host.split('.');
  if(paths[0] === 'www') {
    res.status(404).json('username not found')
  }
  const username = paths[0]
  const portfolio = await getPortfolio(username) 
  res.status(200).json(portfolio)
}