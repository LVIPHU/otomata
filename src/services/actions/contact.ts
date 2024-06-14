'use server'

import { ContactBodyType } from '@/libs/utils'

export async function send(body: ContactBodyType) {
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

const ContactActions = {
  send
}

export default ContactActions

