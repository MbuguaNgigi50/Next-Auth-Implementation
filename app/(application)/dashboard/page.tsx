import { LogoutButton } from "../../auth";

export default function Dashboard() {
	return (
		<main>
			<div>This is the Dashboard. It is a PROTECTED ROUTE</div>
			<LogoutButton />
		</main>
	);
}
