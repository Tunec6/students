"use client";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [user, setUser] = useState({});
    const router = useRouter();
    const supabase = createClient();
    supabase.auth.getUser();
    console.log(user);

    useEffect(() => {
        async function fetchStudents() {
            const { data, error } = await supabase.from("Admin").select("*");
            console.log(data);
        }

        fetchStudents();
    }, [])

    return (
        <>
        <button onClick={async () => {
            const res = await supabase.auth.signInWithPassword({
                email: 'test@test.com',
                password: '123123',
            })
        }}>Login</button>
        <button onClick={async () => {
            const user = await supabase.auth.getUser();
            setUser(user.data.user);
        }}>Show my user data</button>
        <button onClick={async () => {
            const myStudent = await supabase.from("Student").select("*").eq("user_id", user.id);
        }}>Get my student</button>
        </>);
}
