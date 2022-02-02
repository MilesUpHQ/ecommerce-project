import { useNavigate } from "react-router-dom";
export default function Home(props) {
	const navigate = useNavigate();
	return (
		<div>
			<h1>Home</h1>
			<p>Welcome </p>
			{/* Logout button  to go to logout route*/}
			<button onClick={() => navigate("/logout")}>Logout</button>
		</div>
	);
}
