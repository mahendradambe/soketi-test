import React from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Pusher from "pusher-js"

const App = () => {
	React.useEffect( () => {
		const pusher = new Pusher( "app-key", {
			wsHost: "127.0.0.1",
			wsPort: 6001,
			httpPort: 6001,
			forceTLS: false,
			disableStats: true,
			enabledTransports: [ "ws" ],
			httpHost: "127.0.0.1",
			userAuthentication: {
				endpoint: "http://localhost:3000/socket/authn",
				transport: "ajax",
				headers: {
					Authorization: "Token",
				},
			},
			channelAuthorization: {
				endpoint: "http://localhost:3000/socket/authz",
				transport: "ajax",
				headers: {
					Authorization: "Token",
				},
			},
		} )

		pusher.signin()

		pusher.user.signinDonePromise.then( ( user: any ) => {
			console.log( { user } )
			const channel = pusher.subscribe( "private-channel" )
			channel.bind_global( ( ...args: any[] ) => console.log( 'global', args ) )
			channel.bind( "pusher:subscription_succeeded", () => {
				const triggered = channel.trigger( "client-event", {
					your: "data",
				} )

				console.log( triggered )
			} )

			setTimeout( () => {
				channel.trigger( "client-event", { message: "test" } )
			}, 3000 )
		} )


	}, [] )

	return (
		<>
			<div>
				<img src={viteLogo} className="logo" alt="Vite logo" />
				<img src={reactLogo} className="logo react" alt="React logo" />
			</div>
			<h1>Vite + React</h1>
		</>
	)
}

export default App
