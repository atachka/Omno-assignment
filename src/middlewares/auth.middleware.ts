import axios from 'axios';

export async function AuthMiddleware(req) {
  try {
    const body = {
      client_id: process.env.OMNO_CLIENT_ID,
      client_secret: process.env.OMNO_CLIENT_SECRET,
      grant_type: 'client_credentials',
    };
    const response = await axios.post(
      'https://sso.omno.com/realms/omno/protocol/openid-connect/token',
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    req.access_token = response.data.access_token;
  } catch (error) {
    throw new Error('Failed to obtain token');
  }
}
