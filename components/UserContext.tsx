"use client";

import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export type Role = "admin" | "team-worker" | "emtedad-team" | "community";
export type UserContext = "org" | "community";

export interface User {
	name: string;
	role: Role;
	org: string;
	context: UserContext;
}

interface UserContextValue {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function useUser(): UserContextValue {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	// ponytail: mock fetch — replace with real endpoint later
	useEffect(() => {
		const timer = setTimeout(() => {
			setUser({
				name: "John Doe",
				role: "community",
				org: "Acme Corp",
			});
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
