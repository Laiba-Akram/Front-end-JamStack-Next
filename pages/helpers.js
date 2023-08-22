import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const isClientSide = () => typeof window !== "undefined";

export const Storeuser = (data) => {
  if (isClientSide()) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: data.user.username,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        homeAddress: data.user.homeAddress,
        jwt: data.jwt,
      })
    );
  }
};

export const Userdata = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isClientSide()) {
      const stringifiedUser = localStorage.getItem("user") || "{}";
      setUser(JSON.parse(stringifiedUser));
    }
  }, []);

  return user;
};

export const Protector = ({ Component }) => {
  const router = useRouter();
  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    }
  }, [router, jwt]);

  return <Component />;
};
