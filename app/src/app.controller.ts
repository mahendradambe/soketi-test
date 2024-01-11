import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Request } from "@nestjs/common"
import Pusher from "pusher"
import { AppService } from "./app.service"

@Controller()
export class AppController {
	public client: Pusher
	constructor(private readonly appService: AppService) {
		this.client = new Pusher({
			host: "127.0.0.1",
			port: "6001",
			appId: "123456",
			secret: "app-secret",
			key: "app-key",
		})

		setInterval(() => {
			this.client.trigger("private-channel", "email-event", { message: "email-test-event" })
		}, 3000)
	}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Post("process-chat")
	public processChat(@Request() request) {
		const processed = this.client.webhook({
			headers: request.headers,
			rawBody: request.rawBody
		})
		console.log(processed.getData())
		return "okay"
	}

	@Post("/socket/authn")
	public socketAuthn(@Body() body: { socket_id: string }, @Headers() headers) {
		return this.client.authenticateUser(body.socket_id, { id: "1" })
	}

	@Post("/socket/authz")
	@HttpCode(HttpStatus.OK)
	public socketAuthz(
		@Body() body: { socket_id: string; channel_name: string },
		@Headers() headers,
	) {
		return this.client.authorizeChannel(body.socket_id, body.channel_name)
	}
}
