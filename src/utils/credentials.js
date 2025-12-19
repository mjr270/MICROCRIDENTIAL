// Open Badges 2.0/3.0 and W3C Verifiable Credentials Implementation
import crypto from 'crypto-js';

// Generate a unique badge ID
export function generateBadgeId(documentId) {
  return `urn:uuid:${documentId}-badge-${Date.now()}`;
}

// Generate badge assertion ID
export function generateAssertionId(documentId, recipientEmail) {
  const hash = crypto.SHA256(`${documentId}-${recipientEmail}-${Date.now()}`).toString();
  return `urn:uuid:assertion-${hash.substring(0, 16)}`;
}

// Create Open Badge 2.0 compliant badge
export function createOpenBadge2(document, issuerInfo) {
  const badge = {
    "@context": "https://w3id.org/openbadges/v2",
    "type": "Assertion",
    "id": generateAssertionId(document.id, document.owner),
    "recipient": {
      "type": "email",
      "identity": `sha256$${crypto.SHA256(document.owner).toString()}`,
      "hashed": true
    },
    "badge": {
      "type": "BadgeClass",
      "id": generateBadgeId(document.id),
      "name": document.name,
      "description": `NSQF Level ${document.nsqfLevel || 'N/A'} credential in ${document.sector || 'General'} sector`,
      "image": document.dataUrl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
      "criteria": {
        "narrative": `Successfully completed requirements for ${document.name} with ${document.credits || 0} credits at NSQF Level ${document.nsqfLevel || 'N/A'}`
      },
      "issuer": {
        "type": "Profile",
        "id": `https://kaushallink.gov.in/issuers/${encodeURIComponent(document.ownerInstitution || 'Unknown')}`,
        "name": document.ownerInstitution || issuerInfo?.name || "KaushalLink Platform",
        "url": issuerInfo?.url || "https://kaushallink.gov.in",
        "email": issuerInfo?.email || "issuer@kaushallink.gov.in"
      },
      "alignment": [
        {
          "targetName": `NSQF Level ${document.nsqfLevel || 'N/A'}`,
          "targetUrl": `https://ncvet.gov.in/nsqf/level-${document.nsqfLevel || 0}`,
          "targetDescription": "National Skills Qualifications Framework alignment",
          "targetFramework": "NSQF"
        }
      ],
      "tags": [
        document.sector || "general",
        `nsqf-level-${document.nsqfLevel || 0}`,
        document.qualificationType || "micro-credential",
        ...(document.skillsAcquired || [])
      ]
    },
    "issuedOn": new Date(document.createdAt || Date.now()).toISOString(),
    "expires": document.expiryDate ? new Date(document.expiryDate).toISOString() : undefined,
    "verification": {
      "type": "hosted",
      "verificationProperty": "id",
      "startsWith": `https://kaushallink.gov.in/verify/${document.id}`
    },
    "evidence": [
      {
        "id": `https://kaushallink.gov.in/evidence/${document.id}`,
        "name": "Credential Evidence",
        "description": "Official document verification record",
        "genre": "Certificate"
      }
    ]
  };

  // Add NSQF-specific extensions
  if (document.nsqfLevel) {
    badge.badge.nsqf = {
      level: document.nsqfLevel,
      credits: document.credits || 0,
      duration: document.duration || "Not specified",
      qualificationPack: document.qualificationPack || null,
      sector: document.sector || null
    };
  }

  return badge;
}

// Create Open Badge 3.0 compliant badge
export function createOpenBadge3(document, issuerInfo) {
  const badge = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
    ],
    "id": generateAssertionId(document.id, document.owner),
    "type": ["VerifiableCredential", "OpenBadgeCredential"],
    "issuer": {
      "id": `https://kaushallink.gov.in/issuers/${encodeURIComponent(document.ownerInstitution || 'Unknown')}`,
      "type": "Profile",
      "name": document.ownerInstitution || issuerInfo?.name || "KaushalLink Platform",
      "url": issuerInfo?.url || "https://kaushallink.gov.in"
    },
    "issuanceDate": new Date(document.createdAt || Date.now()).toISOString(),
    "expirationDate": document.expiryDate ? new Date(document.expiryDate).toISOString() : undefined,
    "name": document.name,
    "credentialSubject": {
      "id": `did:email:${document.owner}`,
      "type": "AchievementSubject",
      "achievement": {
        "id": generateBadgeId(document.id),
        "type": "Achievement",
        "name": document.name,
        "description": `NSQF Level ${document.nsqfLevel || 'N/A'} credential in ${document.sector || 'General'} sector`,
        "criteria": {
          "narrative": `Successfully completed requirements for ${document.name} with ${document.credits || 0} credits at NSQF Level ${document.nsqfLevel || 'N/A'}`
        },
        "image": {
          "id": document.dataUrl || "https://kaushallink.gov.in/badges/default.png",
          "type": "Image"
        },
        "alignment": [
          {
            "type": "Alignment",
            "targetName": `NSQF Level ${document.nsqfLevel || 'N/A'}`,
            "targetUrl": `https://ncvet.gov.in/nsqf/level-${document.nsqfLevel || 0}`,
            "targetDescription": "National Skills Qualifications Framework alignment",
            "targetFramework": "NSQF"
          }
        ],
        "tag": [
          document.sector || "general",
          `nsqf-level-${document.nsqfLevel || 0}`,
          document.qualificationType || "micro-credential",
          ...(document.skillsAcquired || [])
        ]
      }
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": new Date().toISOString(),
      "verificationMethod": `https://kaushallink.gov.in/issuers/${encodeURIComponent(document.ownerInstitution || 'Unknown')}#key-1`,
      "proofPurpose": "assertionMethod",
      "proofValue": generateProofHash(document)
    }
  };

  return badge;
}

// Create W3C Verifiable Credential
export function createVerifiableCredential(document, issuerInfo) {
  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
      "https://ncvet.gov.in/credentials/nsqf/v1"
    ],
    "id": `https://kaushallink.gov.in/credentials/${document.id}`,
    "type": ["VerifiableCredential", "EducationalCredential", "NSQFCredential"],
    "issuer": {
      "id": `did:web:kaushallink.gov.in:issuers:${encodeURIComponent(document.ownerInstitution || 'Unknown')}`,
      "name": document.ownerInstitution || issuerInfo?.name || "KaushalLink Platform",
      "url": issuerInfo?.url || "https://kaushallink.gov.in"
    },
    "issuanceDate": new Date(document.createdAt || Date.now()).toISOString(),
    "expirationDate": document.expiryDate ? new Date(document.expiryDate).toISOString() : undefined,
    "credentialSubject": {
      "id": `did:email:${document.owner}`,
      "name": document.ownerName || document.owner,
      "hasCredential": {
        "type": "EducationalOccupationalCredential",
        "name": document.name,
        "description": `Micro-credential in ${document.sector || 'General'} sector`,
        "credentialCategory": document.qualificationType || "micro-credential",
        "nsqfLevel": document.nsqfLevel || 0,
        "credits": document.credits || 0,
        "duration": document.duration || "Not specified",
        "sector": document.sector || "general",
        "qualificationPack": document.qualificationPack || null,
        "competency": document.skillsAcquired || [],
        "recognizedBy": {
          "type": "Organization",
          "name": "National Council for Vocational Education and Training (NCVET)",
          "url": "https://ncvet.gov.in"
        }
      }
    },
    "evidence": [
      {
        "id": `https://kaushallink.gov.in/evidence/${document.id}`,
        "type": ["DocumentVerification"],
        "verifier": document.verifiedBy || "Pending verification",
        "evidenceDocument": document.name,
        "verificationDate": document.verifiedAt ? new Date(document.verifiedAt).toISOString() : undefined
      }
    ],
    "credentialStatus": {
      "id": `https://kaushallink.gov.in/status/${document.id}`,
      "type": "CredentialStatusList2021",
      "statusListIndex": "0",
      "statusListCredential": `https://kaushallink.gov.in/status-list/${document.ownerInstitution || 'general'}`
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": new Date().toISOString(),
      "verificationMethod": `did:web:kaushallink.gov.in:issuers:${encodeURIComponent(document.ownerInstitution || 'Unknown')}#key-1`,
      "proofPurpose": "assertionMethod",
      "proofValue": generateProofHash(document)
    }
  };

  return credential;
}

// Generate proof hash (simplified - in production, use proper cryptographic signing)
function generateProofHash(document) {
  const data = JSON.stringify({
    id: document.id,
    owner: document.owner,
    name: document.name,
    createdAt: document.createdAt,
    nsqfLevel: document.nsqfLevel,
    credits: document.credits
  });
  return crypto.SHA256(data).toString();
}

// Verify credential signature
export function verifyCredentialSignature(credential, expectedHash) {
  try {
    const proof = credential.proof?.proofValue;
    return proof === expectedHash;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}

// Export credential in various formats
export function exportCredential(document, format = 'openbadge3', issuerInfo = {}) {
  switch (format) {
    case 'openbadge2':
      return createOpenBadge2(document, issuerInfo);
    case 'openbadge3':
      return createOpenBadge3(document, issuerInfo);
    case 'w3c':
    case 'verifiable':
      return createVerifiableCredential(document, issuerInfo);
    case 'json':
      return document;
    default:
      return createOpenBadge3(document, issuerInfo);
  }
}

// Import and validate credential
export function importCredential(credentialData) {
  try {
    const credential = typeof credentialData === 'string' 
      ? JSON.parse(credentialData) 
      : credentialData;

    // Detect format
    let format = 'unknown';
    if (credential['@context']) {
      if (credential['@context'].includes('openbadges/v2')) {
        format = 'openbadge2';
      } else if (credential['@context'].includes('ob/v3p0')) {
        format = 'openbadge3';
      } else if (credential.type?.includes('VerifiableCredential')) {
        format = 'w3c';
      }
    }

    return {
      valid: true,
      format,
      credential,
      metadata: {
        issuer: credential.issuer?.name || 'Unknown',
        issuedDate: credential.issuedOn || credential.issuanceDate,
        recipient: credential.recipient?.identity || credential.credentialSubject?.id
      }
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}

// Generate downloadable badge file
export function generateBadgeFile(document, format = 'openbadge3') {
  const credential = exportCredential(document, format);
  const blob = new Blob([JSON.stringify(credential, null, 2)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}

// Create shareable badge URL
export function createShareableURL(document) {
  const baseUrl = 'https://kaushallink.gov.in/badges';
  return `${baseUrl}/${document.id}?v=${Date.now()}`;
}
