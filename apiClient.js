// Get app settings from your config file
const { appId, token, functionsVersion, appBaseUrl } = appParams;


// Create a simple API client object
export const apiClient = {

  // Store basic app info
  appId: appId,
  token: token,
  version: functionsVersion,
  baseUrl: appBaseUrl,

  // Example: function to get current user
  async getCurrentUser() {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return response.json();
  },

  // Example: function to get listings
  async getListings() {
    const response = await fetch(`${this.baseUrl}/listings`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return response.json();
  }

};
