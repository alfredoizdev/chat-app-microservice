"use server";
import axios from "axios";
import { AuthValues } from "@/types/auth";
import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";

export async function loginAction(
  data: FormData | AuthValues
): Promise<{ token: string | null; error: string | null }> {
  let email: FormDataEntryValue | null | string = null;
  let password: FormDataEntryValue | null | string = null;

  const cookieStore = cookies();

  if (data instanceof FormData) {
    email = data.get("email");
    password = data.get("password");
  } else {
    email = data?.email;
    password = data?.password;
  }

  console.log("email", email);
  console.log("password", password);

  try {
    const response = await axios.post(
      "http://auth-service.chat-app.svc.cluster.local:4003/api/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);

    if (response.status === 200) {
      cookieStore.set("token", response.data.token);

      return {
        token: response.data.token,
        error: null,
      };
    } else {
      return {
        token: null,
        error: "Invalid email or password",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error ====>", error.response?.data);
      return {
        token: null,
        error: error.response?.data.msg || "Unexpected error",
      };
    }

    return {
      token: null,
      error: "Unexpected status code",
    };
  }
}
