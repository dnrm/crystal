import React, { useEffect, useState } from "react";
import Link from "next/link";

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
                    <Link href={`/users/${i.content}`}>
                        <a>
                            <div
                                className="user-container p-4 shadow-sm rounded-md border-gray-200 border-2 cursor-pointer"
                                key={i._id}
                            >
                                <div className="name">
                                    <h1 className="text-2xl font-bold tracking-tighter">
                                        {i.content}
                                    </h1>
                                </div>
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

export default Users;
