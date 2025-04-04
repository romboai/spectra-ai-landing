import { Client } from '@hubspot/api-client';

export const createContact = async (name: string, email: string): Promise<void> => {
  const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
  
  if (!hubspotApiKey) {
    throw new Error('HubSpot API key is not configured');
  }
  
  const hubspotClient = new Client({ accessToken: hubspotApiKey });
  
  try {
    // Create a contact in HubSpot
    const contactProperties = {
      firstname: name.split(' ')[0],
      lastname: name.split(' ').slice(1).join(' ') || '',
      email: email,
    };
    
    await hubspotClient.crm.contacts.basicApi.create({ 
      properties: contactProperties,
      associations: [] // Required by the API type
    });
    
    // Note: Adding to lists would require additional API calls
    // that may vary based on the HubSpot API version
    // For simplicity, we're just creating the contact
    
  } catch (error) {
    console.error('HubSpot API error:', error);
    throw new Error('Failed to create contact. Please try again later.');
  }
}; 