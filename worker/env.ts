export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  OCI_S3_ENDPOINT?: string;
  OCI_REGION?: string;
  OCI_BUCKET?: string;
  OCI_ACCESS_KEY_ID?: string;
  OCI_SECRET_ACCESS_KEY?: string;
}
