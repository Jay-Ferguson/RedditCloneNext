import { getAuthSession } from "@/lib/auth";
import { UserNameValidator } from "@/lib/validators/username";
import { db } from "@/lib/db";
import {z} from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = UserNameValidator.parse(body);

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    });

    if (username) {
      return new Response("Username is already used", { status: 409 });
    }

    await db.user.update({
     where: {
          id:session.user.id,
     },
     data:{
          username:name
     }
    })

    return new Response('OK', {status:200})
  } catch (error) {}
}
