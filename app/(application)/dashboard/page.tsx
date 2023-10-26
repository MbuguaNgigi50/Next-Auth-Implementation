import { LogoutButton } from "@/components/auth";

export default async function Dashboard() {
	return (
		<main>
			<div>
				This is the Dashboard. This is a PROTECTED ROUTE
			</div>
			<LogoutButton />
		</main>
	);
}
