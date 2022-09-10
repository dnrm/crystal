import React, { useEffect, useState } from "react";
import Link from "next/link";
import TimeAgo from "react-timeago";
import ReactTooltip from "react-tooltip";

const Users = () => {
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    const get = async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      setUsers(users);
    };
    get();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
      {users.map((i) => {
        return (
          <div
            className="user-container p-4 shadow-sm rounded-md border-gray-200 border-2 hover:bg-gray-100 flex justify-between items-center"
            key={i._id}
          >
            <Link href={`/users/${i.content}`}>
              <a>
                <div className="name cursor-pointer">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tighter hover:underline">
                    {i.content}
                  </h1>
                  <h2 className="text-sm sm:text-md" data-tip data-for={i._id}>
                    Joined <TimeAgo date={i.date}></TimeAgo>
                  </h2>
                  <ReactToolip
                    getContent={() => new Date(i.date).toDateString()}
                    id={i._id}
                    type="info"
                  />
                </div>
              </a>
            </Link>
            <a
              href={`https://instagram.com/${i.content}`}
              rel="noreferrer"
              target="_blank"
            >
              <div className="link bg-blue-500 p-4 rounded-lg text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <span className="hidden">{i.content}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
