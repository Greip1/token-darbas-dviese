export const BASE_URL = 'http://localhost:3000';

export async function getFetch(endpoint, token) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        authorization: `Bearer ${token} `,
      },
    });
    const dataInJs = await res.json();
    return dataInJs;
  } catch (error) {
    console.warn('error ir getFetch', error);
  }
}
