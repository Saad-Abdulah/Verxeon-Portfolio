export const getPublicFileView = (fileId: string) => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''
  const bucket = process.env.NEXT_PUBLIC_BUCKET_ALL_IMAGES || 'codexiv-images'
  // Handles regional endpoints like https://fra.cloud.appwrite.io/v1
  return `${endpoint}/storage/buckets/${bucket}/files/${fileId}/view?project=${project}`
} 