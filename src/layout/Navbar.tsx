import { getUser } from "@/app/signin/utils/function";
import { useUserContext } from "@/hooks/useUser";
import { googleLogout } from "@react-oauth/google";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export function Navbar() {
  let { user, setUser } = useUserContext();
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        googleLogout();
        setUser(null);
        router.push("/signin");
        return res;
      } else {
        return res;
      }
    } catch (err) {}
  };

  return (
    <nav className="backdrop-blur-md max-lg:fixed sticky top-0 z-30 right-0 left-0">
      <div className="drawer max-w-screen-2xl mx-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar flex justify-between">
            <Link href="/" className="px-2 mx-2 cursor-pointer">
              <Image
                className="sm:h-[17px] justify-center self-center"
                src="/logo.svg"
                height={20}
                width={120}
                alt="logo"
              />
            </Link>
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-9 h-9 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu items-center menu-horizontal">
                <li>
                  <Link href="/events">Explore events</Link>
                </li>
                <li>
                  <Link href="/qr-scanner">Scan Ticket</Link>
                </li>
                <li>
                  <Link href={user ? "/create-event" : "/signin"}>
                    Create events
                  </Link>
                </li>
                <div>
                  {user ? (
                    <div className="dropdown dropdown-bottom dropdown-left text-gray-600">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <Image
                            width={40}
                            alt="image"
                            height={40}
                            src={user.image}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52"
                      >
                        <li>
                          <Link href="/dashboard" className="justify-between">
                            Profile
                          </Link>
                        </li>

                        <li>
                          <button onClick={logout}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link href="/signin">Sign In</Link>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="bg-zinc-900 z-30 menu p-4 w-80 h-full gap-y-4 text-gray-500">
            <div className="px-2 cursor-pointer my-5">
              <Image
                className="sm:h-[17px] justify-center self-center"
                src="/logo.svg"
                height={20}
                width={120}
                alt="logo"
              />
            </div>
            <li>
              <Link href="/events">Explore events</Link>
            </li>
            <li>
              <Link href="/qr-scanner">Scan Ticket</Link>
            </li>
            <li>
              <Link href={user ? "/create-event" : "/signin"}>
                Create events
              </Link>
            </li>
            <div>
              {user ? (
                <div className="dropdown dropdown-bottom text-gray-600">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <Image
                        width={40}
                        alt="image"
                        height={40}
                        src={user.image}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href="/dashboard" className="justify-between">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li>
                  <Link href="/signin">Sign In</Link>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}