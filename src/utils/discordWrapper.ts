export interface IUserDataResponse {
  id: string
  username: string
  discriminator: string
  avatar: string
  verified: boolean
  email: string
  flags: number
  banner: string | null
  accent_color: number
  premium_type: number
  public_flags: number
}

/**
 * @description fetch and returns user data from discord using accessToken
 * */
export const getUserDataFromToken = async (accessToken: string): Promise<IUserDataResponse> => {
  const res = await fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Cat't get userData from discord code:  + ${res.status}`);
  }
  return res.json() as PromiseLike<IUserDataResponse>
}

