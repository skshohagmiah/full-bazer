import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes

export const ourFileRouter = {
  categoryImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {

      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 
      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
      return { uploadedBy: metadata.email, url:file.url };
    }),

    billboardImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),

    logoImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),

    feviconImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),

    productImages: f({ image: { maxFileSize: "4MB",maxFileCount:6, } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),

    blogImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),

    profileImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 

      return { email: session && session?.user?.email as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.email, url:file.url };
    }),
    
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;