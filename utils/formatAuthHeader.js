export const getTokenFrom = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    const formatedAuth = auth.replace("Bearer ", "");
    if (formatedAuth === "") {
      return null;
    }
    return formatedAuth;
  }
  return null;
}
