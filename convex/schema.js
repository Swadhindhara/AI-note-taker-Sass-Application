import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    user: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }),
    pdfFiles: defineTable({
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        fileUrl: v.string(),
        createdBy: v.string(),
    })
})