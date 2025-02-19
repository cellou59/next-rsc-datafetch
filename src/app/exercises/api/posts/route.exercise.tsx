export async function GET() {
  // 🐶 Appelle la fonction `getPosts` pour récupérer les posts en BDD
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  // 🐶 Retourne les données en json dans la réponse http

  return Response.json(posts)
  // 🐶 Constate la présence des données ici:  http://localhost:3000/exercises/api/posts
}
