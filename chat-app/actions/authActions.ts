"use server";
import { redirect } from "next/navigation";
import axios from "axios";
// import { revalidatePath } from "next/cache";

export async function loginAction(prevState: any, data: FormData) {
  console.log("data", data);
  const email = data.get("email");
  const password = data.get("password");

  try {
    const response = await axios.post(
      "http://server-app.com/api/login",
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

    // redirect("/chat");

    // if (response.status === 200) {
    //   //localStorage.setItem("token", response.data.token);
    //   redirect("/chat");
    // }
    // const response = await fetch("http://server-app.com/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // console.log(response.ok);

    // if (response.ok) {
    //   const data = await response.json();
    //   localStorage.setItem("token", data.token);
    //   redirect("/chat");
    // }

    return {
      token: null,
      error: "Invalid email or password",
    };
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("error", error);
      return {
        token: null,
        error: error.message,
      };
    }
  }
}
