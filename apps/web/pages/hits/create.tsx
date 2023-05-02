import { useAuth } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/router";

export default async function() {
  const router = useRouter()
  const { isLoggedIn } = useAuth();
  if(!isLoggedIn) {
    await router.push('/')
  }
  return <>Pass protected</>
}
