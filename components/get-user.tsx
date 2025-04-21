import { headers } from "next/headers"
import { auth } from "@/lib/auth";

const getUser = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
      });

      const data = session?.user;

  return (
    data
  )
}

export default getUser
