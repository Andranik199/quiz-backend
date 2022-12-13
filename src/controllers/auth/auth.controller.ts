import { Controller, Post, Query } from "@nestjs/common";
import { Buffer } from "buffer";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(private readonly configService: ConfigService) {
  }

  @Post("/login")
  async login(@Query() query: { zoomCode: string }) {
    try {
      const basicAuthToken = Buffer.from(this.configService.get("auth.zoom.client_id") + ":" + this.configService.get("auth.zoom.api_secret"));
      const zoomTokenData = await axios.post(
        `https://zoom.us/oauth/token?grant_type=authorization_code&code=${query.zoomCode}&redirect_uri=http://localhost:3000`,
        {},
        {
          headers: {
            Authorization: `Basic ${basicAuthToken.toString("base64")}`
          }

        });

      const userData = await axios.get("https://api.zoom.us/v2/users/me", {
        headers: {
          Authorization: `Bearer ${zoomTokenData.data.access_token}`
        }
      });


      return {
        user: {
          id: userData.data.id,
          first_name: userData.data.first_name,
          last_name: userData.data.last_name,
          email: userData.data.email,
          pic_url: userData.data.pic_url
        }, token: zoomTokenData.data.access_token
      };
    } catch (err) {
      throw err;
    }
  }

}
