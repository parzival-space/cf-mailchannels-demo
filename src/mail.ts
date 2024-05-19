export const BASE = "https://api.mailchannels.net"

export interface IMailContent {
  type: string,
  value: string
}

export interface IMailUser {
  email: string,
  name: string
}

export async function sendMail(from: IMailUser, to: IMailUser, subject: string, content: IMailContent[]) {
  const mailRequest = new Request(`${BASE}/tx/v1/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [
        {
          from: from,
          to: [to]
        }
      ],
      from: from,
      subject,
      content
    })
  });

  return await fetch(mailRequest);
}
