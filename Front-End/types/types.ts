// Interface for a description paragraph
interface DescriptionParagraph {
  type: "paragraph";
  children: Array<{ type: "text"; text: string }>;
}

// Interface for a product image with details
interface ProductImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        url: string;
        width: number;
        height: number;
        size: number;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string; // Date string in ISO 8601 format
    updatedAt: string; // Date string in ISO 8601 format
  };
}

// Interface for the product data
export interface Product {
  id: number;
  attributes: {
    title: string;
    description: DescriptionParagraph[]; // Array of description paragraphs
    price: number;
    createdAt: string; // Date string in ISO 8601 format
    updatedAt: string; // Date string in ISO 8601 format
    publishedAt: string; // Date string in ISO 8601 format
    instantDeliverey: boolean;
    category: string;
    whatsIncluded: DescriptionParagraph[] | null;
    panner: {
      data: ProductImage;
    };
    files: {
      data: ProductImage[];
    };
  };
}


interface Verification {
  // Define the properties of the verification object based on its structure in your data.
  // This could include things like verification status, method used, timestamp, etc.
  // Example:
  // verified: boolean;
  // method: string; // e.g., "email", "sms"
  // verifiedAt: number; // Timestamp in milliseconds
}

interface LinkedTo {
  // Define the properties of the linkedTo object if there's any relevant data.
  // You might not need this interface if linkedTo doesn't contain meaningful information.
  // Example:
  // userId: string; // ID of the linked user
  // reason: string; // Reason for linking (optional)
}

interface EmailAddress {
  id: string;
  emailAddress: string;
  verification: Verification;
  linkedTo?: LinkedTo[];
}

interface ExternalAccount {
  id: string;
  approvedScopes: string;
  emailAddress: string;
  username: string | null;
  publicMetadata: { [key: string]: any };
  label: string | null;
  verification: Verification;
}

export interface User {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string | null;
  primaryWeb3WalletId: string | null;
  lastSignInAt: number;
  externalId: string | null;
  username: string | null;
  firstName: string;
  lastName: string;
  publicMetadata: { [key: string]: any };
  privateMetadata: { [key: string]: any };
  unsafeMetadata: { [key: string]: any };
  emailAddresses: EmailAddress[];
  phoneNumbers: any[]; 
  web3Wallets: any[];
  externalAccounts: ExternalAccount[];
  createOrganizationEnabled: boolean;
}
export interface UserProduct {
  id: number;
  attributes: {
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    products: {
      data: Product[];
    };
  };
}




export interface StrapiUser {
  id: number,
  username: string,
  email: string,
  provider: "local" | "google",
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string
}