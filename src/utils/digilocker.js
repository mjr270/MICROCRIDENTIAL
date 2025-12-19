// DigiLocker Integration for KaushalLink
// Government of India's DigiLocker API Integration

/**
 * DigiLocker Configuration
 */
export const DIGILOCKER_CONFIG = {
  clientId: process.env.DIGILOCKER_CLIENT_ID || 'KAUSHALLINK_CLIENT_ID',
  clientSecret: process.env.DIGILOCKER_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
  redirectUri: process.env.DIGILOCKER_REDIRECT_URI || 'https://kaushallink.gov.in/digilocker/callback',
  apiBaseUrl: 'https://api.digitallocker.gov.in/public/oauth2/1',
  scope: 'read write'
};

/**
 * Generate DigiLocker OAuth URL
 */
export function getDigiLockerAuthURL() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: DIGILOCKER_CONFIG.clientId,
    redirect_uri: DIGILOCKER_CONFIG.redirectUri,
    state: generateState(),
    scope: DIGILOCKER_CONFIG.scope
  });
  
  return `${DIGILOCKER_CONFIG.apiBaseUrl}/authorize?${params.toString()}`;
}

/**
 * Generate random state for OAuth
 */
function generateState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code) {
  // Mock implementation - replace with actual API call
  try {
    const response = await fetch(`${DIGILOCKER_CONFIG.apiBaseUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: DIGILOCKER_CONFIG.clientId,
        client_secret: DIGILOCKER_CONFIG.clientSecret,
        redirect_uri: DIGILOCKER_CONFIG.redirectUri
      })
    });
    
    // Mock response
    return {
      access_token: 'mock_access_token_' + Date.now(),
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'mock_refresh_token_' + Date.now()
    };
  } catch (error) {
    throw new Error(`Token exchange failed: ${error.message}`);
  }
}

/**
 * Get user's DigiLocker documents
 */
export async function getDigiLockerDocuments(accessToken) {
  // Mock implementation
  return {
    success: true,
    documents: [
      {
        id: 'DL_DOC_001',
        name: 'Aadhaar Card',
        type: 'AADHAAR',
        issuer: 'UIDAI',
        issuedDate: '2020-01-15',
        size: 245632
      },
      {
        id: 'DL_DOC_002',
        name: 'PAN Card',
        type: 'PAN',
        issuer: 'Income Tax Department',
        issuedDate: '2019-06-20',
        size: 125456
      },
      {
        id: 'DL_DOC_003',
        name: 'Educational Certificate',
        type: 'EDUCATIONAL',
        issuer: 'Board of Education',
        issuedDate: '2021-05-30',
        size: 512000
      }
    ]
  };
}

/**
 * Pull document from DigiLocker
 */
export async function pullDocumentFromDigiLocker(accessToken, documentId) {
  // Mock implementation
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      document: {
        id: documentId,
        name: 'Educational Certificate',
        type: 'application/pdf',
        dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9MZW5ndGg...',
        metadata: {
          issuer: 'Board of Education',
          issuedDate: '2021-05-30',
          validUntil: '2099-12-31'
        }
      }
    };
  } catch (error) {
    throw new Error(`Pull document failed: ${error.message}`);
  }
}

/**
 * Push credential to DigiLocker
 */
export async function pushCredentialToDigiLocker(accessToken, credential) {
  // Mock implementation
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      documentId: 'DL_KAUSHAL_' + Date.now(),
      message: 'Credential successfully uploaded to DigiLocker',
      digiLockerUrl: `https://digilocker.gov.in/documents/${credential.id}`
    };
  } catch (error) {
    throw new Error(`Push credential failed: ${error.message}`);
  }
}

/**
 * Verify document authenticity via DigiLocker
 */
export async function verifyDocumentViaDigiLocker(documentId, issuerCode) {
  // Mock implementation
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      verified: true,
      documentId,
      issuer: issuerCode,
      issuedDate: '2021-05-30',
      verificationTimestamp: new Date().toISOString(),
      authenticity: 'GENUINE',
      message: 'Document verified successfully via DigiLocker'
    };
  } catch (error) {
    throw new Error(`Verification failed: ${error.message}`);
  }
}

/**
 * React Hook for DigiLocker Integration
 */
export function useDigiLocker() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);

  const login = () => {
    const authUrl = getDigiLockerAuthURL();
    window.location.href = authUrl;
  };

  const handleCallback = async (code) => {
    try {
      const tokens = await exchangeCodeForToken(code);
      setAccessToken(tokens.access_token);
      setIsAuthenticated(true);
      return tokens;
    } catch (error) {
      console.error('DigiLocker authentication failed:', error);
      throw error;
    }
  };

  const getDocuments = async () => {
    if (!accessToken) throw new Error('Not authenticated');
    return await getDigiLockerDocuments(accessToken);
  };

  const pullDocument = async (documentId) => {
    if (!accessToken) throw new Error('Not authenticated');
    return await pullDocumentFromDigiLocker(accessToken, documentId);
  };

  const pushCredential = async (credential) => {
    if (!accessToken) throw new Error('Not authenticated');
    return await pushCredentialToDigiLocker(accessToken, credential);
  };

  return {
    isAuthenticated,
    login,
    handleCallback,
    getDocuments,
    pullDocument,
    pushCredential
  };
}

/**
 * DigiLocker Issuer Codes (Sample)
 */
export const DIGILOCKER_ISSUERS = {
  'UIDAI': 'Unique Identification Authority of India',
  'CBSE': 'Central Board of Secondary Education',
  'MHRD': 'Ministry of Human Resource Development',
  'NCVET': 'National Council for Vocational Education and Training',
  'DGT': 'Directorate General of Training',
  'NSDC': 'National Skill Development Corporation'
};

/**
 * Convert KaushalLink credential to DigiLocker format
 */
export function convertToDigiLockerFormat(credential) {
  return {
    documentType: 'SKILL_CREDENTIAL',
    documentName: credential.name,
    issuer: credential.ownerInstitution,
    issuerCode: 'NCVET',
    issuedDate: new Date(credential.createdAt).toISOString().split('T')[0],
    validUntil: credential.expiryDate || '2099-12-31',
    metadata: {
      nsqfLevel: credential.nsqfLevel,
      sector: credential.sector,
      credits: credential.credits,
      qualificationPack: credential.qualificationPack
    },
    documentContent: credential.dataUrl
  };
}

export default {
  getDigiLockerAuthURL,
  exchangeCodeForToken,
  getDigiLockerDocuments,
  pullDocumentFromDigiLocker,
  pushCredentialToDigiLocker,
  verifyDocumentViaDigiLocker,
  useDigiLocker,
  convertToDigiLockerFormat,
  DIGILOCKER_CONFIG,
  DIGILOCKER_ISSUERS
};
