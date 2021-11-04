const handler = async (req, res) => {
  const request = await fetch('https://github-pnmbstpsfwdvnhy.form.io/profiles/submission', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
  const portfolio = await request.json();
  if (request.status === 200 && portfolio.length > 0) {
    res.status(200).send(portfolio[0]);
  }
  res.status(request.status);
}

export default handler
