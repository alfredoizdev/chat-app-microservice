"use server";
import axios from "axios";
import { AuthValues, RegisterValues } from "@/types/auth";
import { cookies } from "next/headers";
import { User } from "@/types/user";
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

export const registerAction = async (
  data: FormData | RegisterValues
): Promise<{ newUser: User | null; error: string | null }> => {
  let email: FormDataEntryValue | null | string = null;
  let password: FormDataEntryValue | null | string = null;
  let username: FormDataEntryValue | null | string = null;

  if (data instanceof FormData) {
    email = data.get("email");
    password = data.get("password");
    username = data.get("username");
  } else {
    email = data?.email;
    password = data?.password;
    username = data?.username;
  }

  try {
    const response = await axios.post(
      "http://auth-service.chat-app.svc.cluster.local:4003/api/register",
      {
        email,
        password,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        newUser: response.data,
        error: null,
      };
    } else {
      return {
        newUser: null,
        error: "Invalid email or password",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error ====>", error.response?.data);
      return {
        newUser: null,
        error: error.response?.data.msg || "Unexpected error",
      };
    }

    return {
      newUser: null,
      error: "Unexpected status code",
    };
  }
};
