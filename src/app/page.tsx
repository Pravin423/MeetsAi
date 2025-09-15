"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const {
    data: session,
  } = authClient.useSession()


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
          // Clear the input fields
          setEmail("");
          setName("");
          setPassword("");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
          // Clear the input fields
          setEmail("");
          setName("");
          setPassword("");
        },
      }
    );
  };
  if (session) {
    return <div className="p-4 flex flex-col gap-5 max-w-md mx-auto">
      <p>
        Logged in as {session.user.email}</p>
      <Button onClick={() => authClient.signOut()}>signOut</Button>
    </div>
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="p-4 flex flex-col gap-5 max-w-md mx-auto">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p-4 flex flex-col gap-5 max-w-md mx-auto">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login </Button>
      </div>
    </div>

  );
}
