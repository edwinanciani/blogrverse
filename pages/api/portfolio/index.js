export default async function handler(req, res) {
  const request = await fetch('https://github-pnmbstpsfwdvnhy.form.io/portfolio/submission', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    const portfolio = await request.json();
    if (request.status === 200 && portfolio) {
      res.status(200).send(portfolio[0]);
    }
    res.status(request.status);

}
