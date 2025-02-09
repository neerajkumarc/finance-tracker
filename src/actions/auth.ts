"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { user: null, status: error?.message };
  }
  return { user: data?.user, status: "success" };
}

export async function signup(formdata: FormData) {
  const supabase = await createClient();
  const credentials = {
    username: formdata.get("username") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    return { user: null, status: error?.message };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "User with this email already exists, please login",
      user: null,
    };
  }
  revalidatePath("/", "layout");
  return {
    status: "success",
    user: data?.user,
  };
}

export async function signin(formdata: FormData) {
  const supabase = await createClient();
  const credentials = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { user: null, status: error?.message };
  }

  //todo: create a user instance in user_profiles table
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { data: user, error: insertError } = await supabase
      .from("user_profiles")
      .insert({
        email: data?.user?.email,
        username: data?.user?.user_metadata?.username,
      });
    if (insertError) {
      return { user: null, status: insertError?.message };
    }
  }
  revalidatePath("/", "layout");
  return { status: "success", user: data?.user };
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signInWithGoogle() {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    redirect("/error");
  }
  redirect(data?.url);
}

export async function forgotPassword(formdata: FormData) {
  const origin = (await headers()).get("origin");

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    formdata.get("email") as string,
    {
      redirectTo: `${origin}/reset-password`,
    }
  );
  if (error) {
    return { status: error?.message };
  }
  return { status: "success" };
}

export async function resetPassword(formdata: FormData, code: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return { status: error?.message };
  }

  const { error: passwordError } = await supabase.auth.updateUser({
    password: formdata.get("password") as string,
  });
  if (passwordError) return { status: passwordError?.message };
  return { status: "success" };
}
